import { createClient, type SupabaseClient } from "@supabase/supabase-js";

export type ReviewSource = "sample" | "visitor" | "public";

export type ReviewItem = {
  id: string;
  name: string;
  text: string;
  stars: number;
  source: ReviewSource;
};

type ReviewRow = {
  id: string;
  name: string;
  text: string;
  stars: number;
  created_at?: string;
};

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const anon = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

let client: SupabaseClient | null = null;

function getClient(): SupabaseClient | null {
  if (!url || !anon || typeof url !== "string" || typeof anon !== "string") {
    return null;
  }
  if (!client) {
    client = createClient(url.trim(), anon.trim(), {
      auth: { persistSession: false, autoRefreshToken: false },
    });
  }
  return client;
}

export function hasReviewsBackend(): boolean {
  return getClient() !== null;
}

function rowToItem(row: ReviewRow): ReviewItem {
  return {
    id: row.id,
    name: String(row.name ?? "Anonymous").trim().slice(0, 80) || "Anonymous",
    text: String(row.text ?? "").trim().slice(0, 800),
    stars: Math.min(5, Math.max(1, Math.round(Number(row.stars) || 5))),
    source: "public",
  };
}

export async function fetchPublicReviews(): Promise<{ items: ReviewItem[]; error: string | null }> {
  const supabase = getClient();
  if (!supabase) return { items: [], error: null };

  const { data, error } = await supabase
    .from("reviews")
    .select("id, name, text, stars, created_at")
    .order("created_at", { ascending: false })
    .limit(200);

  if (error) {
    console.warn("[reviews] fetch failed:", error.message);
    return { items: [], error: error.message };
  }
  if (!data?.length) return { items: [], error: null };

  return {
    items: (data as ReviewRow[]).map(rowToItem).filter((r) => r.text.length >= 4),
    error: null,
  };
}

export async function insertPublicReview(input: {
  name: string;
  text: string;
  stars: number;
}): Promise<{ ok: true; item: ReviewItem } | { ok: false; message: string }> {
  const supabase = getClient();
  if (!supabase) {
    return { ok: false, message: "Reviews backend is not configured." };
  }

  const name = input.name.trim().slice(0, 80);
  const text = input.text.trim().slice(0, 800);
  const stars = Math.min(5, Math.max(1, Math.round(input.stars)));

  const { data, error } = await supabase
    .from("reviews")
    .insert({ name, text, stars })
    .select("id, name, text, stars, created_at")
    .single();

  if (error) {
    return { ok: false, message: error.message || "Could not save review." };
  }
  if (!data) {
    return { ok: false, message: "No row returned after insert." };
  }

  return { ok: true, item: rowToItem(data as ReviewRow) };
}
