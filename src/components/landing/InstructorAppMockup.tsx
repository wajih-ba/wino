import { Fragment, useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  BarChart3,
  Calendar,
  Car,
  ChevronLeft,
  ChevronRight,
  CreditCard,
  FileText,
  GraduationCap,
  Lightbulb,
  Mail,
  Medal,
  Moon,
  ParkingCircle,
  Pencil,
  Phone,
  Plus,
  Search,
  Sparkles,
  Trash2,
  Trophy,
  User,
  Users,
  Zap,
} from "lucide-react";

type InstructorView = "sessions" | "students" | "vehicles" | "parking" | "circuit";

const navTargets: Record<string, InstructorView | null> = {
  requests: "sessions",
  students: "students",
  vehicles: "vehicles",
  circuit: "circuit",
  sessions: "sessions",
  parking: "parking",
};

/** Which sidebar key is highlighted for each main view (sessions page uses Sessions, not Requests). */
const viewToNavKey: Record<InstructorView, string> = {
  sessions: "sessions",
  students: "students",
  vehicles: "vehicles",
  parking: "parking",
  circuit: "circuit",
};

export function InstructorAppMockup() {
  const [activeView, setActiveView] = useState<InstructorView>("sessions");
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const isLight = theme === "light";

  useEffect(() => {
    const stored = window.localStorage.getItem("theme");
    if (stored === "dark" || stored === "light") {
      setTheme(stored);
      return;
    }
    const prefersLight = window.matchMedia?.("(prefers-color-scheme: light)").matches;
    setTheme(prefersLight ? "light" : "dark");
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "light") {
      root.classList.add("theme-light");
    } else {
      root.classList.remove("theme-light");
    }
    window.localStorage.setItem("theme", theme);
  }, [theme]);

  const setNav = (id: string) => {
    const v = navTargets[id];
    if (v) setActiveView(v);
  };

  const studentRows = [
    { name: "mimou chou", email: "mimou@mail.test", phone: "+216 12 345 678", initial: "M" },
    { name: "mohamed abidi", email: "m.abidi@mail.test", phone: "+216 98 765 432", initial: "M" },
    { name: "haninn bchiiiir", email: "haninn@mail.test", phone: "+216 55 000 111", initial: "H", photo: true },
  ];

  const hours = ["08:00", "09:00", "10:00", "11:00"];
  const days = ["Mon 11", "Tue 12", "Wed 13", "Thu 14"];

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, rotateX: 8 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ duration: 0.9, delay: 0.2 }}
      className="relative mx-auto w-full max-w-5xl [perspective:1500px]"
    >
      <div className="absolute -inset-10 bg-[var(--gradient-hero)] blur-3xl" />

      {/* overflow-x-auto ensures desktop layout is preserved on small screens */}
      <div className="relative overflow-x-auto rounded-2xl shadow-[var(--shadow-elegant)]">
      <div className="min-w-[700px] overflow-hidden rounded-2xl bg-[var(--mockup-bg)] text-[var(--mockup-text)]">
        <div className="grid grid-cols-12 min-h-[460px]">
          <aside className="col-span-3 bg-[var(--mockup-surface)] border-r border-[var(--mockup-border)] p-4 space-y-4">
            <div className="flex flex-col items-center gap-1.5 text-center">
              <div className="h-12 w-12 rounded-xl bg-[var(--mockup-accent-soft)] text-[var(--mockup-accent)] grid place-items-center text-lg font-bold">
                W
              </div>
              <div className="text-[11px] font-bold leading-tight">WINO SMART DRIVING SCHOOL</div>
              <div className="text-[10px] text-[var(--mockup-muted)]">Instructor Space</div>
            </div>

            <div className="space-y-3">
              {(
                [
                  ["MANAGEMENT", ["requests", "students", "vehicles"]],
                  ["TRAINING", ["circuit", "sessions", "parking"]],
                ] as const
              ).map(([section, keys]) => (
                <div key={section} className="space-y-1">
                  <div className="text-[10px] text-[var(--mockup-muted-strong)] uppercase tracking-wider">{section}</div>
                  {keys.map((key) => {
                    const labels: Record<string, { label: string; Icon: typeof FileText; extra?: string }> = {
                      requests: { label: "Requests", Icon: FileText, extra: "(0)" },
                      students: { label: "Students", Icon: Users, extra: "(3)" },
                      vehicles: { label: "Vehicles", Icon: Car, extra: "(1)" },
                      circuit: { label: "Circuit", Icon: Zap },
                      sessions: { label: "Sessions", Icon: Calendar },
                      parking: { label: "Parking", Icon: ParkingCircle },
                    };
                    const { label, Icon, extra } = labels[key];
                    const target = navTargets[key];
                    const isActive = key === viewToNavKey[activeView];
                    return (
                      <button
                        key={key}
                        type="button"
                        onClick={() => setNav(key)}
                        aria-current={isActive ? "page" : undefined}
                        className={`flex w-full items-center gap-2 rounded-lg px-2 py-2 text-left text-xs border-l-2 ${
                          isActive
                            ? "border-[var(--mockup-accent)] bg-[var(--mockup-accent-soft)] text-[var(--mockup-accent)] font-semibold"
                            : "border-transparent text-[var(--mockup-muted)] hover:bg-[var(--mockup-surface-soft)]"
                        }`}
                      >
                        <Icon className="h-3.5 w-3.5 shrink-0" />
                        <span className="flex-1 truncate">
                          {label} {extra}
                        </span>
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-[var(--mockup-border)] space-y-2 text-[10px] text-[var(--mockup-muted)]">
              <button
                type="button"
                onClick={() => setTheme((c) => (c === "dark" ? "light" : "dark"))}
                aria-pressed={isLight}
                className="flex w-full items-center justify-between gap-2 rounded-md px-2 py-1.5 text-[10px] transition hover:bg-[var(--mockup-surface-soft)]"
              >
                <span className="flex items-center gap-2">
                  <Moon className="h-3 w-3" />
                  {isLight ? "Light mode" : "Dark mode"}
                </span>
                <span
                  className={`relative inline-flex h-4 w-8 items-center rounded-full border transition ${
                    isLight
                      ? "border-[var(--mockup-border)] bg-[var(--mockup-surface)]"
                      : "border-[var(--mockup-border)] bg-[var(--mockup-progress-bg)]"
                  }`}
                >
                  <span
                    className={`h-3 w-3 rounded-full bg-[var(--mockup-surface)] shadow transition ${
                      isLight ? "translate-x-4" : "translate-x-0"
                    }`}
                  />
                </span>
              </button>
              <div className="flex items-center gap-2 text-[var(--mockup-danger)] px-2">
                <span className="text-[10px]">Logout</span>
              </div>
            </div>
          </aside>

          <main className="col-span-9 bg-[var(--mockup-bg)]">
            <div className="p-4 space-y-3">
              {activeView === "sessions" && (
                <>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {[
                      { label: "Total Sessions", value: "2", accent: true, Icon: User },
                      { label: "Rating", value: "4.8/5", Icon: Medal },
                      { label: "Pending Payments", value: "0", Icon: CreditCard },
                      { label: "Available Slots", value: "40", Icon: Calendar },
                    ].map((c) => (
                      <div
                        key={c.label}
                        className={`rounded-xl p-3 shadow-sm border text-[10px] ${
                          c.accent
                            ? "bg-[var(--mockup-accent)] text-white border-transparent"
                            : "bg-[var(--mockup-surface)] border-[var(--mockup-border-soft)]"
                        }`}
                      >
                        <div className="flex items-center justify-between gap-1">
                          <span className={c.accent ? "text-white/80" : "text-[var(--mockup-muted-strong)]"}>
                            {c.label}
                          </span>
                          <c.Icon className={`h-3.5 w-3.5 shrink-0 ${c.accent ? "text-white/90" : "text-[var(--mockup-muted)]"}`} />
                        </div>
                        <div className={`mt-1 text-lg font-semibold ${c.accent ? "" : "text-[var(--mockup-text)]"}`}>{c.value}</div>
                      </div>
                    ))}
                  </div>
                  <div className="rounded-xl bg-[var(--mockup-surface)] border border-[var(--mockup-border-soft)] p-3">
                    <div className="text-[10px] font-semibold text-[var(--mockup-muted-strong)] uppercase">Specialties</div>
                    <div className="mt-2 inline-flex rounded-full bg-[var(--mockup-surface-soft)] px-3 py-1 text-[10px] text-[var(--mockup-text)]">
                      General
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 text-[10px]">
                    {["Weekly Schedule", "Payment Verification", "Exam Requests", "My Students"].map((t, i) => (
                      <span
                        key={t}
                        className={`inline-flex items-center gap-1 rounded-full px-3 py-1.5 font-medium ${
                          i === 0
                            ? "bg-[var(--mockup-accent)] text-white"
                            : "bg-[var(--mockup-surface)] border border-[var(--mockup-border)] text-[var(--mockup-muted)]"
                        }`}
                      >
                        {i === 1 && (
                          <span className="grid h-4 min-w-[1rem] place-items-center rounded-full bg-[var(--mockup-danger)] px-1 text-[9px] text-white">
                            2
                          </span>
                        )}
                        {i === 2 && <GraduationCap className="h-3 w-3" />}
                        {i === 3 && <User className="h-3 w-3" />}
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="rounded-xl bg-[var(--mockup-surface)] border border-[var(--mockup-border-soft)] p-3 space-y-2">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="text-xs font-semibold">Weekly Schedule</span>
                      <div className="flex items-center gap-1 text-[10px] text-[var(--mockup-muted)]">
                        <button type="button" className="rounded-md border border-[var(--mockup-border)] p-0.5">
                          <ChevronLeft className="h-3 w-3" />
                        </button>
                        <span>May 11 – May 17, 2026</span>
                        <button type="button" className="rounded-md border border-[var(--mockup-border)] p-0.5">
                          <ChevronRight className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                    <div className="flex items-start gap-1 text-[9px] text-[var(--mockup-muted)]">
                      <Lightbulb className="h-3 w-3 shrink-0 text-amber-500" />
                      Click a slot to add availability. Booked slots appear in orange.
                    </div>
                    <div className="overflow-x-auto">
                      <div className="min-w-[280px] grid gap-0.5 text-[9px]" style={{ gridTemplateColumns: `56px repeat(${days.length}, minmax(0,1fr))` }}>
                        <div className="p-1 font-semibold text-[var(--mockup-muted-strong)]">Time</div>
                        {days.map((d, di) => (
                          <div
                            key={d}
                            className={`p-1 text-center font-semibold ${di === 0 ? "bg-[var(--mockup-accent-soft)] rounded-t" : ""}`}
                          >
                            {d}
                          </div>
                        ))}
                        {hours.map((h, hi) => (
                          <Fragment key={h}>
                            <div className="p-1 text-[var(--mockup-muted)] border-t border-[var(--mockup-border)]">{h}</div>
                            {days.map((d, di) => (
                              <div
                                key={`${h}-${d}`}
                                className={`border border-dashed border-[var(--mockup-border)] min-h-[28px] grid place-items-center ${
                                  di === 0 ? "bg-[var(--mockup-accent-soft)]/50" : ""
                                } ${hi === 1 && di === 2 ? "bg-orange-100 border-orange-200 text-orange-700 text-[8px]" : ""}`}
                              >
                                {hi === 1 && di === 2 ? (
                                  "Booked"
                                ) : hi === 0 && di === 1 ? (
                                  <span className="rounded-full bg-[var(--mockup-accent)]/90 text-white px-1.5 py-0.5 text-[8px]">Open</span>
                                ) : hi % 2 === di % 2 ? (
                                  <span className="text-[var(--mockup-accent)]">+</span>
                                ) : null}
                              </div>
                            ))}
                          </Fragment>
                        ))}
                      </div>
                    </div>
                  </div>
                </>
              )}

              {activeView === "students" && (
                <div className="space-y-2">
                  {studentRows.map((s) => (
                    <div
                      key={s.name}
                      className="flex items-center gap-3 rounded-xl bg-[var(--mockup-surface)] border border-[var(--mockup-border-soft)] p-3 shadow-sm"
                    >
                      <div
                        className={`h-10 w-10 shrink-0 rounded-full grid place-items-center text-sm font-semibold text-white ${
                          s.photo ? "bg-gradient-to-br from-[var(--mockup-accent)] to-teal-700" : "bg-[var(--mockup-accent)]"
                        }`}
                      >
                        {s.photo ? "☺" : s.initial}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="text-sm font-semibold truncate">{s.name}</div>
                        <div className="mt-0.5 flex flex-wrap items-center gap-x-3 gap-y-0.5 text-[10px] text-[var(--mockup-muted)]">
                          <span className="inline-flex items-center gap-1">
                            <Mail className="h-3 w-3 text-blue-500" />
                            {s.email}
                          </span>
                          <span className="inline-flex items-center gap-1">
                            <Phone className="h-3 w-3 text-[var(--mockup-danger)]" />
                            {s.phone}
                          </span>
                        </div>
                      </div>
                      <span className="shrink-0 rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-medium text-emerald-800">
                        Active
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {activeView === "vehicles" && (
                <div className="space-y-3">
                  <div className="flex justify-end">
                    <button
                      type="button"
                      className="inline-flex items-center gap-1 rounded-full bg-[var(--mockup-accent)] px-3 py-1.5 text-[10px] font-semibold text-white"
                    >
                      <Plus className="h-3 w-3" />
                      Add Vehicle
                    </button>
                  </div>
                  <div className="flex flex-wrap items-center gap-3 rounded-xl bg-[var(--mockup-surface)] border border-[var(--mockup-border-soft)] p-3 shadow-sm">
                    <div className="h-14 w-14 shrink-0 rounded-lg bg-red-100 grid place-items-center text-lg">🚗</div>
                    <div className="min-w-0 flex-1">
                      <div className="text-sm font-bold">RENU CLIO (2026)</div>
                      <div className="mt-1 flex flex-wrap items-center gap-3 text-[10px] text-[var(--mockup-muted)]">
                        <span className="inline-flex items-center gap-1 text-[var(--mockup-danger)]">123TUN2343</span>
                        <span className="inline-flex items-center gap-1">Manual</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] text-emerald-800">Active</span>
                      <button type="button" className="rounded-lg border border-[var(--mockup-border)] p-1.5 text-amber-600">
                        <Pencil className="h-3.5 w-3.5" />
                      </button>
                      <button type="button" className="rounded-lg border border-[var(--mockup-border)] p-1.5 text-[var(--mockup-muted)]">
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {activeView === "parking" && (
                <>
                  <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl bg-[var(--mockup-accent)] px-3 py-2.5 text-white">
                    <div className="flex items-center gap-2 text-xs font-semibold">
                      <span className="grid h-7 w-7 place-items-center rounded-lg bg-white/20 text-sm font-bold">P</span>
                      <div>
                        <div>PARKING</div>
                        <div className="text-[9px] font-normal text-white/80">Parking Management — Wino Driving School</div>
                      </div>
                    </div>
                    <div className="hidden sm:flex items-center gap-2">
                      <span className="flex items-center gap-1 rounded-full bg-white/15 px-2 py-1 text-[9px]">
                        <Search className="h-3 w-3" />
                        Global search…
                      </span>
                      <span className="rounded-full bg-white/15 px-2 py-1 text-[9px]">Instructor</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
                    {[
                      ["Active Students", "4"],
                      ["Instructors", "8 / 8"],
                      ["Fleet", "6 avail."],
                      ["Sessions", "18 (3 ✓)"],
                      ["Success", "16%"],
                      ["Revenue", "360 DT"],
                    ].map(([k, v]) => (
                      <div key={k} className="rounded-lg bg-[var(--mockup-surface)] border border-[var(--mockup-border-soft)] p-2 text-[9px]">
                        <div className="text-[var(--mockup-muted-strong)] uppercase">{k}</div>
                        <div className="mt-0.5 text-sm font-semibold">{v}</div>
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-1.5 text-[10px]">
                    {["Dashboard", "Videos", "Steps", "Exam Results", "Parking Students"].map((t, i) => (
                      <span
                        key={t}
                        className={`rounded-full px-2.5 py-1 ${i === 0 ? "bg-[var(--mockup-accent)] text-white" : "bg-[var(--mockup-surface)] border border-[var(--mockup-border)]"}`}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div className="rounded-xl bg-[var(--mockup-surface)] border border-[var(--mockup-border-soft)] p-3">
                      <div className="text-xs font-semibold">Recent Activity</div>
                      <ul className="mt-2 space-y-2 text-[10px]">
                        {[
                          ["✗", "marche_arriere"],
                          ["✓", "creneau"],
                          ["✓", "marche_avant"],
                        ].map(([mark, action]) => (
                          <li key={action} className="flex items-center gap-2 border-b border-[var(--mockup-border)] pb-2 last:border-0">
                            <span className={mark === "✓" ? "text-emerald-600" : "text-[var(--mockup-danger)]"}>{mark}</span>
                            <span className="font-medium">hachmi jemni</span>
                            <span className="text-[var(--mockup-muted)]">{action}</span>
                            <span className="ml-auto text-[var(--mockup-muted)]">2024-05-08</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="rounded-xl bg-[var(--mockup-surface)] border border-[var(--mockup-border-soft)] p-3">
                      <div className="text-xs font-semibold flex items-center gap-2">
                        <Trophy className="h-4 w-4 text-amber-500" />
                        Top Students
                      </div>
                      <div className="mt-3 flex items-center gap-2">
                        <div className="flex-1 h-2 rounded-full bg-[var(--mockup-progress-bg)]">
                          <div className="h-full w-[17%] rounded-full bg-[var(--mockup-accent)]" />
                        </div>
                      </div>
                      <div className="mt-2 text-[10px] text-[var(--mockup-muted)]">hachmi jemni — 17% (18 sess.)</div>
                    </div>
                  </div>
                  <div className="rounded-xl bg-[var(--mockup-surface)] border border-[var(--mockup-border-soft)] p-3">
                    <div className="text-xs font-semibold mb-2">Fleet Status</div>
                    <div className="flex flex-wrap gap-2">
                      {["Peugeot 308", "Toyota Corolla", "RENU CLIO"].map((name) => (
                        <div key={name} className="rounded-lg border border-[var(--mockup-border)] px-2 py-1.5 text-[9px]">
                          <div className="font-semibold">{name}</div>
                          <div className="text-[var(--mockup-muted)]">••••</div>
                          <div className="text-emerald-600">● Available</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {activeView === "circuit" && (
                <>
                  <div className="flex flex-wrap items-center justify-between gap-2 rounded-lg bg-[var(--mockup-surface)] border border-[var(--mockup-border-soft)] px-3 py-2">
                    <div className="flex items-center gap-2 text-[10px] text-[var(--mockup-muted)]">
                      <User className="h-4 w-4" />
                      No student selected
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {["Students", "Live", "Load Session", "Settings"].map((b) => (
                        <span
                          key={b}
                          className="rounded-md border border-[var(--mockup-border)] px-2 py-0.5 text-[9px] text-[var(--mockup-muted-strong)]"
                        >
                          {b}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 border-b border-[var(--mockup-border)] pb-2 text-[10px]">
                    {["Analysis", "Compare", "Progress", "History", "Course"].map((t, i) => (
                      <span
                        key={t}
                        className={`inline-flex items-center gap-1 pb-1 border-b-2 ${
                          i === 0 ? "border-[var(--mockup-accent)] text-[var(--mockup-accent)] font-semibold" : "border-transparent text-[var(--mockup-muted)]"
                        }`}
                      >
                        {i === 0 && <BarChart3 className="h-3 w-3" />}
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {["Stress", "Risk", "Context", "AI"].map((label) => (
                      <div key={label} className="rounded-lg bg-[var(--mockup-surface)] border border-[var(--mockup-border-soft)] p-2 text-[9px]">
                        <div className="text-[var(--mockup-muted-strong)] uppercase">{label}</div>
                        <div className="mt-2 h-8 rounded bg-[var(--mockup-surface-soft)] border border-dashed border-[var(--mockup-border)]" />
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {["Acceleration", "Speed", "Proximity", "Stress vs Risk"].map((title) => (
                      <div key={title} className="rounded-lg bg-[var(--mockup-surface)] border border-[var(--mockup-border-soft)] p-2">
                        <div className="text-[10px] font-semibold">{title}</div>
                        <div className="mt-2 h-24 rounded bg-[var(--mockup-surface-muted)] border border-[var(--mockup-border)] relative overflow-hidden">
                          <div className="absolute inset-2 border-l border-b border-[var(--mockup-border)] opacity-60" />
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                    <div className="md:col-span-2 rounded-lg bg-[var(--mockup-surface)] border border-[var(--mockup-border-soft)] p-2 text-[10px]">
                      <div className="flex items-center gap-1 font-semibold">
                        <Sparkles className="h-3.5 w-3.5 text-amber-500" />
                        AI Recommendations
                      </div>
                      <div className="mt-2 h-10 rounded bg-[var(--mockup-surface-soft)]" />
                    </div>
                    <div className="rounded-lg bg-[var(--mockup-surface)] border border-[var(--mockup-border-soft)] p-2 space-y-2">
                      <div className="text-[10px] font-semibold">Actions</div>
                      <button type="button" className="w-full rounded-md bg-[var(--mockup-accent)] py-1.5 text-[10px] text-white">
                        + Add Session
                      </button>
                      <button type="button" className="w-full rounded-md border border-[var(--mockup-border)] py-1.5 text-[10px]">
                        Export PDF
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </main>
        </div>
      </div>
      </div>
    </motion.div>
  );
}
