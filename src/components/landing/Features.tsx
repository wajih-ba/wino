import { withBase } from "@/lib/baseUrl";
import { Reveal } from "./Reveal";
import {
  GraduationCap,
  UserCog,
  Database,
  Car,
  CheckCircle2,
  Search,
} from "lucide-react";

// Bento-style asymmetric grid
export function Features() {
  return (
    <section id="features" className="py-24 relative">
      <div className="mx-auto max-w-6xl px-4">
        <Reveal className="max-w-3xl">
          <div className="text-xs uppercase tracking-[0.2em] text-[var(--orange)] font-medium">
            Everything you need
          </div>
          <h2 className="mt-3 font-display text-4xl sm:text-6xl font-bold tracking-tight">
            Features that <span className="text-gradient-warm">just work.</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-xl">
            Carefully crafted modules for every role in your driving school — designed to
            feel native, fast, and effortless.
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-6 auto-rows-[180px] gap-4">
          <Reveal>
            <a
              href={withBase("student-dashboard")}
              className="group block h-full glass rounded-3xl p-5 hover:-translate-y-1 transition-all"
            >
              <div className="h-10 w-10 rounded-xl glass-strong grid place-items-center">
                <GraduationCap className="h-5 w-5 text-[var(--teal)]" />
              </div>
              <div className="mt-3 font-display font-semibold">Student Dashboard</div>
              <p className="mt-1 text-xs text-muted-foreground">Lessons & progress at a glance.</p>
            </a>
          </Reveal>
          <Reveal delay={0.05}>
            <a
              href={withBase("instructor-dashboard")}
              className="group block h-full glass rounded-3xl p-5 hover:-translate-y-1 transition-all"
            >
              <div className="h-10 w-10 rounded-xl glass-strong grid place-items-center">
                <UserCog className="h-5 w-5 text-[var(--purple)]" />
              </div>
              <div className="mt-3 font-display font-semibold">Instructor Dashboard</div>
              <p className="mt-1 text-xs text-muted-foreground">Classes, notes, feedback.</p>
            </a>
          </Reveal>

          <Reveal>
            <div className="group h-full glass rounded-3xl p-5 hover:-translate-y-1 transition-all relative overflow-hidden">
              <div className="h-10 w-10 rounded-xl glass-strong grid place-items-center">
                <Database className="h-5 w-5 text-[var(--orange)]" />
              </div>
              <div className="mt-3 font-display font-semibold">Oracle Integration</div>
              <p className="mt-1 text-xs text-muted-foreground">Enterprise-grade data reliability.</p>
            </div>
          </Reveal>

          {/* Vehicle - wide */}
          <Reveal className="md:col-span-3">
            <div className="group h-full glass rounded-3xl p-6 hover:-translate-y-1 transition-all flex items-center gap-5 overflow-hidden relative">
              <div
                className="absolute right-0 top-0 h-full w-1/2 opacity-20"
                style={{ background: "var(--gradient-warm)" }}
              />
              <div className="relative h-12 w-12 rounded-2xl bg-[var(--gradient-warm)] grid place-items-center shrink-0">
                <Car className="h-6 w-6 text-primary-foreground" />
              </div>
              <div className="relative">
                <div className="font-display font-semibold text-lg">Vehicle Management</div>
                <p className="text-xs text-muted-foreground">Fleet records, service logs, availability.</p>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.05} className="md:col-span-3">
            <div className="group h-full glass rounded-3xl p-6 hover:-translate-y-1 transition-all flex items-center gap-5">
              <div className="h-12 w-12 rounded-2xl bg-[var(--gradient-primary)] grid place-items-center shrink-0">
                <CheckCircle2 className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <div className="font-display font-semibold text-lg">School Approval Flow</div>
                <p className="text-xs text-muted-foreground">Streamlined onboarding for new schools.</p>
              </div>
            </div>
          </Reveal>

          <Reveal className="md:col-span-6">
            <div className="group h-full glass-strong rounded-3xl p-6 hover:-translate-y-1 transition-all flex items-center justify-between gap-5">
              <div className="flex items-center gap-5">
                <div className="h-12 w-12 rounded-2xl grid place-items-center shrink-0"
                  style={{ background: "linear-gradient(135deg, var(--orange), var(--purple))" }}
                >
                  <Search className="h-6 w-6 text-primary-foreground" />
                </div>
                <div>
                  <div className="font-display font-semibold text-lg">Real-time Search</div>
                  <p className="text-xs text-muted-foreground">Instant filtering across students, lessons, and assets.</p>
                </div>
              </div>
              <div className="hidden sm:flex gap-1.5">
                {["Sarah", "Karim", "Lina"].map((n, i) => (
                  <span
                    key={n}
                    className="glass rounded-full px-3 py-1 text-xs"
                    style={{ opacity: 1 - i * 0.25 }}
                  >
                    {n}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
