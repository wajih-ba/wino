import { useEffect, useRef, useState } from "react";
import { Reveal } from "./Reveal";
import { X, ZoomIn, Camera, MonitorPlay } from "lucide-react";

// ── All photos in the project folder (19 total) ───────────────────────────────
import p01  from "@/assets/project/1.jpeg";
import p03  from "@/assets/project/3.jpg";
import p04  from "@/assets/project/4.jpg";
import p05  from "@/assets/project/5.jpg";
import p06  from "@/assets/project/6.jpg";
import p07  from "@/assets/project/7.jpg";
import p08  from "@/assets/project/8.jpg";
import p09  from "@/assets/project/9.jpg";
import p10  from "@/assets/project/10.jpg";
import p11  from "@/assets/project/11.jpg";
import pA   from "@/assets/project/2e341f60-fc66-4976-a585-ba956cfd7178.jpg";
import pB   from "@/assets/project/3005bf1c-81fd-4b78-ba73-91089a485dc7.jpg";
import pC   from "@/assets/project/324c071d-eb1c-42d0-b5bb-888aec365a25.jpg";
import pD   from "@/assets/project/3890f6ce-8850-4ceb-a59a-26057318fede.jpg";
import pE   from "@/assets/project/42a1c5e9-a18d-4663-9f1f-4c204ad74cdb.jpg";
import pF   from "@/assets/project/761cf10f-f56f-405d-a0ce-5e73521c42d4.jpg";
import pG   from "@/assets/project/bd1fdf5b-b20e-4d11-aa58-0d79a3a451a5.jpg";
import pH   from "@/assets/project/defa6301-960b-4f0a-85b7-0d5d2942a3c8.jpg";
import pWA  from "@/assets/project/WhatsApp Image 2026-05-12 at 3.41.37 PM.jpeg";

const ALL_PHOTOS = [
  p01, p03, p04, p05, p06, p07, p08, p09, p10, p11,
  pA,  pB,  pC,  pD,  pE,  pF,  pG,  pH,  pWA,
];

// Span configs cycling over 19 photos — mix of single and double spans
const SPAN_CONFIGS: { col: number; row: number }[] = [
  { col: 1, row: 1 }, { col: 2, row: 1 }, { col: 1, row: 2 }, { col: 1, row: 1 },
  { col: 1, row: 1 }, { col: 2, row: 1 }, { col: 1, row: 2 }, { col: 1, row: 1 },
  { col: 1, row: 1 }, { col: 2, row: 1 }, { col: 1, row: 1 }, { col: 1, row: 2 },
  { col: 2, row: 1 }, { col: 1, row: 1 }, { col: 1, row: 1 }, { col: 1, row: 2 },
  { col: 2, row: 1 }, { col: 1, row: 1 }, { col: 1, row: 1 },
];

const ROTATIONS = [
  -1.8,  1.2, -2.0,  2.5, -1.0,
   1.5, -2.5,  0.8, -1.5,  2.0,
  -0.7,  1.8, -2.2,  1.0, -1.2,
   2.3, -0.9,  1.6, -2.1,
];

export function ProjectProgress() {
  const [lightbox, setLightbox] = useState<string | null>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setLightbox(null); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <section id="progress" className="py-24 relative overflow-hidden">

      {/* ── Background blobs ── */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div style={{
          position: "absolute", top: "5%", left: "-6%",
          width: 520, height: 520,
          background: "radial-gradient(circle, oklch(0.6 0.22 295 / 0.13), transparent 70%)",
          filter: "blur(48px)",
        }} />
        <div style={{
          position: "absolute", bottom: "10%", right: "-5%",
          width: 460, height: 460,
          background: "radial-gradient(circle, oklch(0.78 0.14 185 / 0.1), transparent 70%)",
          filter: "blur(48px)",
        }} />
      </div>

      <div className="mx-auto max-w-6xl px-4">

        {/* ── Section header ── */}
        <Reveal>
          <div className="text-xs uppercase tracking-[0.2em] text-[var(--teal)] font-medium flex items-center gap-2">
            <Camera className="h-3.5 w-3.5" />
            Behind the build
          </div>
          <h2 className="mt-3 font-display text-4xl sm:text-5xl font-bold tracking-tight">
            Project <span className="text-gradient">Progress</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-xl">
            A glimpse into our journey — real moments captured as Wino evolved
            from whiteboard sketches to a full-fledged desktop management suite.
          </p>
        </Reveal>

        {/* ══════════════════════════════════════════════════
            MONITOR VIDEO — "Talk About Problems"
        ══════════════════════════════════════════════════ */}
        <Reveal delay={0.08}>
          <div className="mt-16">
            <div className="flex items-center gap-2 mb-5">
              <div style={{
                width: 36, height: 36, borderRadius: 10,
                background: "var(--gradient-primary)",
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0,
              }}>
                <MonitorPlay className="h-4 w-4 text-white" />
              </div>
              <div>
                <div className="text-xs uppercase tracking-[0.18em] text-[var(--purple)] font-semibold">
                  Demo &amp; Discussion
                </div>
                <div className="font-display font-bold text-xl mt-0.5">
                  Monitor Talk — Problems &amp; Solutions
                </div>
              </div>
            </div>

            <div
              className="glass rounded-3xl overflow-hidden"
              style={{
                boxShadow: "0 32px 80px -16px oklch(0 0 0 / 0.5), 0 0 0 1px oklch(1 0 0 / 0.08)",
              }}
            >
              <div style={{ height: 3, background: "var(--gradient-primary)" }} />
              <div style={{ position: "relative", paddingBottom: "56.25%", height: 0 }}>
                <iframe
                  id="monitor-talk-video"
                  src="https://www.youtube.com/embed/PldxWiFCSfE?rel=0&modestbranding=1"
                  title="Wino – Monitor Talk: Problems &amp; Solutions"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  style={{
                    position: "absolute", top: 0, left: 0,
                    width: "100%", height: "100%", border: "none",
                  }}
                />
              </div>
              <div style={{
                padding: "14px 20px",
                background: "oklch(1 0 0 / 0.03)",
                borderTop: "1px solid oklch(1 0 0 / 0.07)",
                display: "flex", alignItems: "center", justifyContent: "space-between",
              }}>
                <span className="text-sm text-muted-foreground">
                  🎥 Real talk — challenges we faced and how we solved them
                </span>
                <a
                  href="https://www.youtube.com/watch?v=PldxWiFCSfE"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-medium text-[var(--teal)] hover:underline"
                >
                  Watch on YouTube ↗
                </a>
              </div>
            </div>
          </div>
        </Reveal>

        {/* ══════════════════════════════════════════════════
            PHOTO GALLERY — All 19 photos
        ══════════════════════════════════════════════════ */}
        <Reveal delay={0.12}>
          <div className="mt-16 flex items-center gap-3 mb-6">
            <div style={{
              width: 36, height: 36, borderRadius: 10,
              background: "var(--gradient-warm)",
              display: "flex", alignItems: "center", justifyContent: "center",
              flexShrink: 0,
            }}>
              <Camera className="h-4 w-4 text-white" />
            </div>
            <div>
              <div className="text-xs uppercase tracking-[0.18em] text-[var(--orange)] font-semibold">
                Photo Gallery
              </div>
              <div className="font-display font-bold text-xl mt-0.5">
                Snapshots from the Build
                <span style={{
                  marginLeft: 10, fontSize: 13, fontWeight: 500,
                  color: "var(--muted-foreground)",
                }}>
                  ({ALL_PHOTOS.length} photos)
                </span>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Masonry grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gridAutoRows: "180px",
            gap: "12px",
          }}
        >
          {ALL_PHOTOS.map((src, i) => {
            const cfg = SPAN_CONFIGS[i % SPAN_CONFIGS.length];
            const rot = ROTATIONS[i % ROTATIONS.length];
            return (
              <div
                key={i}
                onClick={() => setLightbox(src)}
                style={{
                  gridColumn: `span ${cfg.col}`,
                  gridRow: `span ${cfg.row}`,
                  cursor: "pointer",
                  position: "relative",
                  borderRadius: "16px",
                  overflow: "hidden",
                  transform: `rotate(${rot}deg)`,
                  transition: "transform 0.35s cubic-bezier(.34,1.56,.64,1), box-shadow 0.3s ease",
                } as React.CSSProperties}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.transform = "rotate(0deg) scale(1.05)";
                  el.style.boxShadow = "0 24px 64px -10px oklch(0 0 0 / 0.6)";
                  el.style.zIndex = "10";
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.transform = `rotate(${rot}deg) scale(1)`;
                  el.style.boxShadow = "";
                  el.style.zIndex = "";
                }}
                className="group"
              >
                {/* Glass border */}
                <div style={{
                  position: "absolute", inset: 0, zIndex: 2, borderRadius: "16px",
                  border: "1px solid oklch(1 0 0 / 0.18)", pointerEvents: "none",
                }} />

                {/* Photo */}
                <img
                  src={src}
                  alt={`Project photo ${i + 1}`}
                  loading="lazy"
                  style={{
                    width: "100%", height: "100%",
                    objectFit: "cover", display: "block",
                    transition: "filter 0.3s ease",
                  }}
                  className="group-hover:brightness-90"
                />

                {/* Zoom overlay */}
                <div
                  style={{
                    position: "absolute", inset: 0, zIndex: 3,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    transition: "background 0.3s ease",
                  }}
                  className="group-hover:!bg-[oklch(0.1_0.03_260/0.32)]"
                >
                  <ZoomIn
                    className="h-7 w-7 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    style={{ filter: "drop-shadow(0 2px 8px oklch(0 0 0 / 0.6))" }}
                  />
                </div>

                {/* Number badge */}
                <div style={{
                  position: "absolute", top: 10, right: 10, zIndex: 4,
                  background: "oklch(0.12 0.03 260 / 0.75)",
                  backdropFilter: "blur(8px)",
                  border: "1px solid oklch(1 0 0 / 0.18)",
                  borderRadius: "999px",
                  padding: "2px 9px",
                  fontSize: "11px",
                  fontFamily: "var(--font-display)",
                  color: "oklch(0.92 0.01 260)",
                  fontWeight: 600,
                }}>
                  {String(i + 1).padStart(2, "0")}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Lightbox ── */}
      {lightbox && (
        <div
          ref={overlayRef}
          onClick={e => { if (e.target === overlayRef.current) setLightbox(null); }}
          style={{
            position: "fixed", inset: 0, zIndex: 9999,
            background: "oklch(0.07 0.02 260 / 0.93)",
            backdropFilter: "blur(20px)",
            display: "flex", alignItems: "center", justifyContent: "center",
            padding: "24px",
            animation: "ppFadeIn 0.22s ease",
          }}
        >
          <style>{`@keyframes ppFadeIn{from{opacity:0;transform:scale(.95)}to{opacity:1;transform:scale(1)}}`}</style>
          <div style={{ position: "relative", maxWidth: "90vw", maxHeight: "88vh" }}>
            <img
              src={lightbox}
              alt="Project photo – full view"
              style={{
                maxWidth: "90vw", maxHeight: "88vh",
                borderRadius: "20px",
                objectFit: "contain",
                boxShadow: "0 48px 120px -20px oklch(0 0 0 / 0.85)",
                border: "1px solid oklch(1 0 0 / 0.12)",
                display: "block",
              }}
            />
            <button
              id="lightbox-close"
              onClick={() => setLightbox(null)}
              aria-label="Close lightbox"
              style={{
                position: "absolute", top: -16, right: -16,
                width: 42, height: 42, borderRadius: "50%",
                background: "oklch(0.22 0.03 260)",
                border: "1px solid oklch(1 0 0 / 0.2)",
                display: "flex", alignItems: "center", justifyContent: "center",
                cursor: "pointer", color: "white",
                transition: "background 0.2s, transform 0.2s",
                boxShadow: "0 4px 16px oklch(0 0 0 / 0.4)",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.background = "oklch(0.34 0.06 260)";
                (e.currentTarget as HTMLElement).style.transform = "scale(1.1)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.background = "oklch(0.22 0.03 260)";
                (e.currentTarget as HTMLElement).style.transform = "scale(1)";
              }}
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
