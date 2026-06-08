import { motion } from "framer-motion";
import { ArrowRight, Download, Sparkles } from "lucide-react";

export function Hero() {
  return (
    <section id="top" className="relative pt-32 pb-20 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-40 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
      <div className="relative mx-auto max-w-6xl px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-medium"
        >
          <Sparkles className="h-3.5 w-3.5 text-[var(--orange)]" />
          <span>Now Free</span>
          <span className="text-muted-foreground">— for early users</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="mt-6 font-display text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight"
        >
          Modern Driving School
          <br />
          Management <span className="text-gradient">Made Simple</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-6 mx-auto max-w-2xl text-base sm:text-lg text-muted-foreground"
        >
          A complete responsive Qt C++ desktop application for managing driving schools,
          students, instructors, and vehicles — all in one elegant tool.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-3"
        >
          <a
            href="https://github.com/nesrinemil/wino.git"
            className="group inline-flex items-center gap-2 rounded-xl bg-[var(--teal)] px-6 py-3 font-medium text-white shadow-sm transition hover:brightness-110"
          >
            <Download className="h-4 w-4" />
            Download Now
          </a>
          <a
            href="#about"
            className="inline-flex items-center gap-2 rounded-xl glass px-6 py-3 font-medium hover:bg-white/10 transition"
          >
            Learn More
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
        </motion.div>

      </div>
    </section>
  );
}
