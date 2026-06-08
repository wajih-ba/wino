import { Reveal } from "./Reveal";
import { Code2, Database, Layout, Users2, Sparkles, ArrowRight } from "lucide-react";

const points = [
  { icon: Code2, title: "Built with Qt C++", desc: "Native performance with modern Qt Widgets framework." },
  { icon: Layout, title: "Responsive Desktop", desc: "Adapts beautifully across window sizes and screens." },
  { icon: Database, title: "Oracle Integration", desc: "Enterprise-grade data reliability with zero disruption." },
  { icon: Sparkles, title: "Modern UI Design", desc: "Clean, intuitive interface inspired by today's best apps." },
  { icon: Users2, title: "Multiple User Roles", desc: "Admins, instructors, and students — tailored views." },
];

export function About() {
  return (
    <section id="about" className="py-24 relative">
      <div className="mx-auto max-w-6xl px-4 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left sticky-feeling intro */}
        <Reveal className="lg:col-span-5 lg:sticky lg:top-28">
          <div className="text-xs uppercase tracking-[0.2em] text-[var(--teal)] font-medium">
            About the project
          </div>
          <h2 className="mt-3 font-display text-4xl sm:text-6xl font-bold tracking-tight">
            Engineered for <span className="text-gradient">driving schools</span>.
          </h2>
          <p className="mt-5 text-muted-foreground text-lg">
            Wino is a desktop-first management suite. Built natively in Qt C++,
            it turns daily school operations into a calm, focused workflow.
          </p>
          <a
            href="#features"
            className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-[var(--teal)] group"
          >
            See what's inside
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
        </Reveal>

        {/* Right list */}
        <div className="lg:col-span-7 space-y-3">
          {points.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.06}>
              <div className="group glass rounded-2xl p-5 flex gap-5 items-start hover:bg-white/[0.07] hover:-translate-y-0.5 transition-all">
                <div className="h-11 w-11 rounded-xl shrink-0 grid place-items-center"
                  style={{ background: "var(--gradient-primary)" }}
                >
                  <p.icon className="h-5 w-5 text-primary-foreground" />
                </div>
                <div>
                  <div className="font-display font-semibold text-lg">{p.title}</div>
                  <p className="mt-1 text-sm text-muted-foreground">{p.desc}</p>
                </div>
                <div className="ml-auto text-xs font-mono text-muted-foreground/40 hidden sm:block">
                  0{i + 1}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
