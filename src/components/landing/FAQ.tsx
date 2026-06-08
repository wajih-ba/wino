import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal } from "./Reveal";
import { Plus } from "lucide-react";

const faqs = [
  {
    q: "Is Wino really free?",
    a: "Yes — it's completely free for early users, including all future updates during the early access window.",
  },
  {
    q: "Which platforms does it run on?",
    a: "Wino is a Qt C++ desktop app and runs natively on Windows, macOS, and Linux distributions supported by Qt.",
  },
  {
    q: "Do I need internet access to use it?",
    a: "No. The app connects to Oracle and supports offline-friendly workflows. Internet is only needed for optional updates.",
  },
  {
    q: "Can I import existing student data?",
    a: "Yes. CSV import is supported for students, instructors, and vehicles, with mapping for custom fields.",
  },
  {
    q: "Is my data secure?",
    a: "Data is stored securely in Oracle. Backups and encryption follow your database and OS security policies.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="py-24">
      <div className="mx-auto max-w-3xl px-4">
        <Reveal className="text-center">
          <div className="text-xs uppercase tracking-[0.2em] text-[var(--purple)] font-medium">
            FAQ
          </div>
          <h2 className="mt-3 font-display text-4xl sm:text-5xl font-bold tracking-tight">
            Questions, answered.
          </h2>
        </Reveal>

        <div className="mt-12 space-y-2">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={f.q} delay={i * 0.04}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full text-left glass rounded-2xl px-5 py-4 hover:bg-white/[0.07] transition-all"
                >
                  <div className="flex items-center justify-between gap-4">
                    <span className="font-display font-medium">{f.q}</span>
                    <Plus
                      className={`h-4 w-4 shrink-0 transition-transform duration-300 ${
                        isOpen ? "rotate-45 text-[var(--teal)]" : "text-muted-foreground"
                      }`}
                    />
                  </div>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <p className="pt-3 text-sm text-muted-foreground">{f.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
