import { Reveal } from "./Reveal";
import { Download, Gift } from "lucide-react";

export function FreeBanner() {
  return (
    <section id="download" className="py-24">
      <div className="mx-auto max-w-5xl px-4">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl p-10 sm:p-16 text-center glass-strong">
            <div
              className="absolute inset-0 opacity-60"
              style={{ background: "var(--gradient-hero)" }}
            />
            <div className="relative">
              <div className="inline-flex items-center gap-2 rounded-full bg-[var(--orange)]/15 border border-[var(--orange)]/30 px-3 py-1 text-xs font-medium text-[var(--orange)]">
                <Gift className="h-3.5 w-3.5" />
                Limited-time promotion
              </div>
              <h2 className="mt-5 font-display text-3xl sm:text-5xl font-bold">
                Wino is currently <span className="text-gradient-warm">FREE</span>
                <br />for early users.
              </h2>
              <p className="mt-4 max-w-xl mx-auto text-muted-foreground">
                Download today and get every future update at no cost. No credit card required.
              </p>
              <a
                href="https://github.com/nesrinemil/wino.git"
                className="mt-8 inline-flex items-center gap-2 rounded-xl bg-[var(--teal)] px-7 py-3.5 font-medium text-white shadow-sm transition hover:brightness-110"
              >
                <Download className="h-4 w-4" />
                Download Free
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
