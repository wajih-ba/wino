import { motion } from "framer-motion";
import { Reveal } from "./Reveal";

const stack = [
  { label: "Qt Framework", color: "var(--teal)" },
  { label: "C++", color: "var(--purple)" },
  { label: "Oracle", color: "var(--orange)" },
  { label: "Qt Widgets", color: "var(--teal)" },
  { label: "Responsive UI", color: "var(--purple)" },
];

export function TechStack() {
  return (
    <section id="tech" className="py-24">
      <div className="mx-auto max-w-5xl px-4">
        <Reveal className="text-center">
          <div className="text-xs uppercase tracking-[0.2em] text-[var(--orange)] font-medium">
            Tech Stack
          </div>
          <h2 className="mt-3 font-display text-3xl sm:text-5xl font-bold">
            Built with <span className="text-gradient-warm">proven tools</span>
          </h2>
        </Reveal>

        <div className="mt-12 flex flex-wrap justify-center gap-3">
          {stack.map((t, i) => (
            <motion.div
              key={t.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ scale: 1.05, y: -3 }}
              className="glass-strong rounded-full px-5 py-2.5 flex items-center gap-2"
            >
              <span className="h-2 w-2 rounded-full" style={{ background: t.color, boxShadow: `0 0 12px ${t.color}` }} />
              <span className="font-medium text-sm">{t.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
