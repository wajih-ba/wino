import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { Reveal } from "./Reveal";

export function VideoDemo() {
  return (
    <section id="demo" className="py-24 relative">
      <div className="mx-auto max-w-5xl px-4">
        <Reveal>
          <div className="text-center mb-12">
            <div className="text-xs uppercase tracking-[0.2em] text-[var(--teal)] font-medium">
              See it in action
            </div>
            <h2 className="mt-3 font-display text-4xl sm:text-5xl font-bold tracking-tight">
              Watch the <span className="text-gradient">Demo</span>
            </h2>
            <p className="mt-4 mx-auto max-w-2xl text-muted-foreground text-lg">
              A quick walkthrough of how Wino simplifies driving school management.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <motion.div
            whileHover={{ scale: 1.01 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="relative glass-strong rounded-2xl overflow-hidden glow"
          >
            {/* Decorative play icon overlay (hidden once iframe loads) */}
            <div className="absolute inset-0 pointer-events-none z-10 flex items-center justify-center opacity-0">
              <div
                className="h-16 w-16 rounded-full grid place-items-center"
                style={{ background: "var(--gradient-primary)" }}
              >
                <Play className="h-7 w-7 text-primary-foreground ml-0.5" />
              </div>
            </div>

            {/* 16:9 responsive container */}
            <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
              <iframe
                className="absolute inset-0 w-full h-full rounded-2xl"
                src="https://www.youtube.com/embed/y19kXBo-f_k"
                title="Wino Demo Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                style={{ border: 0 }}
              />
            </div>
          </motion.div>
        </Reveal>
      </div>
    </section>
  );
}
