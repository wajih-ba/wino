import { useEffect, useRef, useState } from "react";
import { Reveal } from "./Reveal";
import { Mail, Check } from "lucide-react";

export function EmailSection() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [isDocked, setIsDocked] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const element = sectionRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsDocked(entry.isIntersecting);
      },
      {
        root: null,
        threshold: 0,
      },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 pb-36">
      <div className="mx-auto max-w-2xl px-4 text-center">
        <Reveal>
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl glass">
            <Mail className="h-5 w-5 text-[var(--teal)]" />
          </div>
          <h2 className="mt-5 font-display text-3xl sm:text-4xl font-bold">
            Stay in the loop
          </h2>
          <p className="mt-3 text-muted-foreground">
            Be the first to receive updates, new features, and releases.
          </p>
        </Reveal>
      </div>
      <div
        className={
          isDocked
            ? "mt-10 px-4"
            : "fixed bottom-4 left-0 right-0 z-50 px-4"
        }
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (email) setSent(true);
          }}
          className="mx-auto flex w-full max-w-2xl flex-col gap-2 rounded-2xl p-2 glass-strong sm:flex-row"
        >
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="flex-1 bg-transparent px-4 py-3 text-sm outline-none placeholder:text-muted-foreground"
          />
          <button
            type="submit"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--teal)] px-6 py-3 text-sm font-medium text-white shadow-sm transition hover:brightness-110"
          >
            {sent ? (
              <>
                <Check className="h-4 w-4" /> Subscribed
              </>
            ) : (
              "Get Updates"
            )}
          </button>
        </form>
      </div>
    </section>
  );
}
