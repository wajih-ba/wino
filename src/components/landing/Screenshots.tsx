import { withBase } from "@/lib/baseUrl";
import { Reveal } from "./Reveal";
import { GraduationCap, UserCog } from "lucide-react";

const shots = [
  {
    icon: GraduationCap,
    title: "Student Dashboard",
    tint: "var(--gradient-primary)",
    path: "student-dashboard" as const,
  },
  {
    icon: UserCog,
    title: "Instructor Dashboard",
    tint: "var(--gradient-warm)",
    path: "instructor-dashboard" as const,
  },
];

export function Screenshots() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-6xl px-4">
        <Reveal className="text-center max-w-2xl mx-auto">
          <div className="text-xs uppercase tracking-[0.2em] text-[var(--teal)] font-medium">
            Previews
          </div>
          <h2 className="mt-3 font-display text-3xl sm:text-5xl font-bold">
            Take a look <span className="text-gradient">inside</span>
          </h2>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-5">
          {shots.map((s, i) => (
            <Reveal key={s.title} delay={(i % 2) * 0.08}>
              <a
                href={withBase(s.path)}
                className="block glass-strong rounded-2xl overflow-hidden hover:-translate-y-1 transition-all"
              >
                <div className="relative aspect-[16/10] overflow-hidden" style={{ background: s.tint }}>
                  <div className="absolute inset-3 rounded-xl bg-background/85 backdrop-blur p-4 grid-bg">
                    <div className="flex gap-1.5 mb-3">
                      <span className="h-2 w-2 rounded-full bg-white/30" />
                      <span className="h-2 w-2 rounded-full bg-white/30" />
                      <span className="h-2 w-2 rounded-full bg-white/30" />
                    </div>
                    <div className="grid grid-cols-3 gap-2 h-[calc(100%-1.25rem)]">
                      <div className="col-span-1 glass rounded-lg p-2 flex flex-col gap-1.5">
                        {Array.from({ length: 5 }).map((_, j) => (
                          <div key={j} className="h-2 rounded bg-white/10" />
                        ))}
                      </div>
                      <div className="col-span-2 flex flex-col gap-2">
                        <div className="grid grid-cols-3 gap-2">
                          <div className="glass rounded-lg h-12" />
                          <div className="glass rounded-lg h-12" />
                          <div className="glass rounded-lg h-12" />
                        </div>
                        <div className="glass rounded-lg flex-1 p-2 flex items-end gap-1">
                          {[50, 70, 40, 80, 60, 90, 55].map((h, j) => (
                            <div key={j} className="flex-1 rounded-t" style={{ height: `${h}%`, background: s.tint }} />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="px-5 py-4 flex items-center gap-3">
                  <div className="h-9 w-9 rounded-lg grid place-items-center" style={{ background: s.tint }}>
                    <s.icon className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <div className="font-display font-semibold">{s.title}</div>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
