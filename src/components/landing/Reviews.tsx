import { useCallback, useEffect, useMemo, useState, type FormEvent } from "react";
import { Reveal } from "./Reveal";
import { Star } from "lucide-react";
import {
  type ReviewItem,
  hasReviewsBackend,
  fetchPublicReviews,
  insertPublicReview,
} from "@/lib/reviewsApi";

const STORAGE_KEY = "wino.reviews.v1";

const SEED_REVIEWS: ReviewItem[] = [
  {
    id: "seed-hakim",
    name: "Hakim D.",
    text: "This system made managing our driving school much easier and more professional.",
    stars: 5,
    source: "sample",
  },
  {
    id: "seed-nora",
    name: "Nora K.",
    text: "Beautiful interface, fast on older machines, and zero setup pain. Love it.",
    stars: 5,
    source: "sample",
  },
  {
    id: "seed-yassine",
    name: "Yassine L.",
    text: "Switching from spreadsheets was instant ROI. The dashboards are perfect.",
    stars: 5,
    source: "sample",
  },
  {
    id: "seed-imane",
    name: "Imane T.",
    text: "Vehicle management alone is worth it. Our fleet tracking is finally sane.",
    stars: 4,
    source: "sample",
  },
  {
    id: "seed-omar",
    name: "Omar B.",
    text: "Best free desktop app we've adopted this year. Polished and reliable.",
    stars: 5,
    source: "sample",
  },
];

function newId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `r-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

function parseStored(raw: string): ReviewItem[] | null {
  try {
    const data = JSON.parse(raw) as unknown;
    if (!Array.isArray(data)) return null;
    const out: ReviewItem[] = [];
    for (let i = 0; i < data.length; i++) {
      const row = data[i];
      if (!row || typeof row !== "object") continue;
      const o = row as Record<string, unknown>;
      const text = String(o.text ?? "").trim();
      if (text.length < 4) continue;
      const name = String(o.name ?? "Anonymous").trim().slice(0, 80) || "Anonymous";
      const stars = Math.min(5, Math.max(1, Math.round(Number(o.stars) || 5)));
      const id = typeof o.id === "string" && o.id.length > 0 ? o.id : newId();
      const source =
        o.source === "sample" || o.source === "visitor" || o.source === "public" ? o.source : "visitor";
      out.push({ id, name, text: text.slice(0, 800), stars, source });
    }
    return out.length > 0 ? out : null;
  } catch {
    return null;
  }
}

function loadFromStorage(): ReviewItem[] | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return parseStored(raw);
  } catch {
    return null;
  }
}

function persist(list: ReviewItem[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  } catch {
    /* quota / private mode */
  }
}

function reviewStats(items: ReviewItem[]) {
  const n = items.length;
  if (n === 0) {
    return {
      count: 0,
      average: 0,
      displayAverage: "—",
      badgeStars: 0,
      badgeLabel: "No reviews yet",
    };
  }
  const sum = items.reduce((s, r) => s + r.stars, 0);
  const average = sum / n;
  const badgeLabel =
    average >= 4.75 ? "Rated excellent" : average >= 4.25 ? "Highly rated" : average >= 3.5 ? "Well rated" : "Rated";
  return {
    count: n,
    average,
    displayAverage: average.toFixed(1),
    badgeStars: Math.round(Math.min(5, Math.max(0, average))),
    badgeLabel,
  };
}

function initials(name: string) {
  return name
    .split(/\s+/)
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${i < count ? "fill-[var(--orange)] text-[var(--orange)]" : "text-muted-foreground/30"}`}
        />
      ))}
    </div>
  );
}

function StarPicker({
  value,
  onChange,
}: {
  value: number;
  onChange: (n: number) => void;
}) {
  const [hover, setHover] = useState(0);
  const shown = hover || value;
  return (
    <div className="flex flex-col gap-1">
      <span className="text-xs text-muted-foreground">Your rating</span>
      <div
        className="flex gap-0.5"
        role="radiogroup"
        aria-label="Star rating"
        onMouseLeave={() => setHover(0)}
      >
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            type="button"
            role="radio"
            aria-checked={value === n}
            aria-label={`${n} stars`}
            className="rounded-md p-1 transition hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--teal)]"
            onMouseEnter={() => setHover(n)}
            onFocus={() => setHover(n)}
            onBlur={() => setHover(0)}
            onClick={() => onChange(n)}
          >
            <Star
              className={`h-7 w-7 sm:h-8 sm:w-8 ${
                n <= shown ? "fill-[var(--orange)] text-[var(--orange)]" : "text-muted-foreground/35"
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  );
}

const liveBackend = hasReviewsBackend();

export function Reviews() {
  const [reviews, setReviews] = useState<ReviewItem[]>(() =>
    liveBackend ? [] : loadFromStorage() ?? SEED_REVIEWS,
  );
  const [remoteLoading, setRemoteLoading] = useState(liveBackend);
  const [remoteError, setRemoteError] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [stars, setStars] = useState(5);
  const [formError, setFormError] = useState<string | null>(null);
  const [justPosted, setJustPosted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!liveBackend) return;
    let cancelled = false;
    void (async () => {
      setRemoteLoading(true);
      setRemoteError(null);
      const { items, error } = await fetchPublicReviews();
      if (cancelled) return;
      setRemoteLoading(false);
      if (error) {
        setRemoteError(error);
        setReviews(SEED_REVIEWS);
        return;
      }
      setReviews(items.length > 0 ? items : []);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (liveBackend) return;
    persist(reviews);
  }, [reviews]);

  const stats = useMemo(() => reviewStats(reviews), [reviews]);

  const resetToSamples = useCallback(() => {
    if (liveBackend) return;
    if (typeof window !== "undefined") {
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch {
        /* ignore */
      }
    }
    setReviews(SEED_REVIEWS);
    setFormError(null);
    setJustPosted(false);
  }, []);

  const submitReview = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      setFormError(null);
      const trimmedName = name.trim().slice(0, 80);
      const trimmedText = text.trim();
      if (!trimmedName) {
        setFormError("Please enter your name or initials.");
        return;
      }
      if (trimmedText.length < 8) {
        setFormError("Please write at least a few words (8+ characters).");
        return;
      }
      if (trimmedText.length > 800) {
        setFormError("Review is too long (max 800 characters).");
        return;
      }

      if (liveBackend) {
        setSubmitting(true);
        const res = await insertPublicReview({ name: trimmedName, text: trimmedText, stars });
        setSubmitting(false);
        if (!res.ok) {
          setFormError(res.message);
          return;
        }
        setReviews((prev) => [res.item, ...prev]);
        setName("");
        setText("");
        setStars(5);
        setJustPosted(true);
        window.setTimeout(() => setJustPosted(false), 4000);
        return;
      }

      const entry: ReviewItem = {
        id: newId(),
        name: trimmedName,
        text: trimmedText,
        stars,
        source: "visitor",
      };
      setReviews((prev) => [entry, ...prev]);
      setName("");
      setText("");
      setStars(5);
      setJustPosted(true);
      window.setTimeout(() => setJustPosted(false), 4000);
    },
    [name, text, stars],
  );

  const sourceLabel = (s: ReviewItem["source"]) => {
    if (s === "public") return "Community review";
    if (s === "visitor") return "Saved on this device";
    return "Sample testimonial";
  };

  return (
    <section id="reviews" className="py-24">
      <div className="mx-auto max-w-6xl px-4">
        <Reveal className="text-center max-w-2xl mx-auto">
          <div className="inline-flex flex-wrap items-center justify-center gap-x-2 gap-y-1 rounded-full glass px-3 py-1 text-xs">
            <Stars count={stats.badgeStars} />
            <span className="font-medium">{stats.badgeLabel}</span>
            <span className="text-muted-foreground">
              · {stats.displayAverage}/5 avg
              {stats.count > 0 ? <span className="hidden sm:inline"> · {stats.count} reviews</span> : null}
            </span>
          </div>
          <h2 className="mt-4 font-display text-3xl sm:text-5xl font-bold">
            Loved by driving schools
          </h2>
          <p className="mt-3 text-muted-foreground">
            Honest feedback from real users running Wino every day
            {stats.count > 0 ? ` — ${stats.count} review${stats.count === 1 ? "" : "s"} below.` : "."}
          </p>
          {liveBackend ? (
            <p className="mt-2 text-xs text-[var(--teal)]">
              Live reviews: submissions are saved to the project database and visible to all visitors.
            </p>
          ) : null}
          {remoteError ? (
            <p className="mt-2 text-xs text-[var(--destructive)]">
              Could not load live reviews ({remoteError}). Showing sample quotes until the connection works.
            </p>
          ) : null}
        </Reveal>

        <Reveal className="mt-10 max-w-xl mx-auto" delay={0.05}>
          <form onSubmit={submitReview} className="glass-strong rounded-2xl p-6 sm:p-8 space-y-5">
            <div>
              <h3 className="font-display text-lg font-semibold">Add your rating</h3>
              <p className="mt-1 text-xs text-muted-foreground">
                {liveBackend
                  ? "Post a public review. It appears for everyone after a short save."
                  : "Reviews are stored in this browser only. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY (and run supabase/reviews.sql) to enable shared live reviews."}
              </p>
            </div>

            <StarPicker value={stars} onChange={setStars} />

            <div>
              <label htmlFor="review-name" className="text-xs font-medium text-muted-foreground">
                Name or initials
              </label>
              <input
                id="review-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                maxLength={80}
                autoComplete="name"
                placeholder="e.g. Sam R."
                className="mt-1.5 w-full rounded-xl border border-border bg-background/40 px-4 py-2.5 text-sm outline-none ring-offset-background placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-[var(--teal)]"
              />
            </div>

            <div>
              <label htmlFor="review-text" className="text-xs font-medium text-muted-foreground">
                Your experience
              </label>
              <textarea
                id="review-text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                maxLength={800}
                rows={4}
                placeholder="What worked well? What would you improve?"
                className="mt-1.5 w-full resize-y rounded-xl border border-border bg-background/40 px-4 py-2.5 text-sm outline-none ring-offset-background placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-[var(--teal)]"
              />
              <div className="mt-1 text-[10px] text-muted-foreground text-right">{text.length}/800</div>
            </div>

            {formError ? <p className="text-sm text-[var(--destructive)]">{formError}</p> : null}
            {justPosted ? (
              <p className="text-sm text-[var(--teal)]">Thanks — your review was added.</p>
            ) : null}

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="submit"
                disabled={submitting}
                className="inline-flex items-center justify-center rounded-xl bg-[var(--teal)] px-5 py-2.5 text-sm font-medium text-white transition hover:brightness-110 disabled:opacity-60"
              >
                {submitting ? "Posting…" : "Post review"}
              </button>
              {!liveBackend ? (
                <button
                  type="button"
                  onClick={resetToSamples}
                  className="text-xs text-muted-foreground underline-offset-2 hover:underline"
                >
                  Restore sample reviews
                </button>
              ) : null}
            </div>
          </form>
        </Reveal>

        {remoteLoading ? (
          <p className="mt-10 text-center text-sm text-muted-foreground">Loading reviews…</p>
        ) : reviews.length === 0 ? (
          <p className="mt-10 text-center text-sm text-muted-foreground">
            No reviews yet — be the first to post one above.
          </p>
        ) : (
          <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {reviews.map((r, i) => (
              <Reveal key={r.id} delay={(i % 3) * 0.07}>
                <div className="h-full glass rounded-2xl p-6 hover:-translate-y-1 transition-all">
                  <Stars count={r.stars} />
                  <p className="mt-4 text-sm leading-relaxed">"{r.text}"</p>
                  <div className="mt-5 flex items-center gap-3">
                    <div className="h-9 w-9 rounded-full bg-[var(--gradient-primary)] grid place-items-center text-[10px] font-bold text-primary-foreground leading-none">
                      {initials(r.name)}
                    </div>
                    <div>
                      <div className="text-sm font-medium">{r.name}</div>
                      <div className="text-xs text-muted-foreground">{sourceLabel(r.source)}</div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
