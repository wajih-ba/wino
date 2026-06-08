import { Fragment, useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  AlertTriangle,
  ArrowLeft,
  BarChart3,
  CalendarCheck,
  CheckCircle2,
  ChevronRight,
  Sparkles,
  Target,
} from "lucide-react";

export function AppMockup() {
  const [activeView, setActiveView] = useState<"sessions" | "code" | "parking" | "circuit">("sessions");
  const navTargets = {
    "1": "code",
    "2": "circuit",
    "3": "parking",
    "4": "sessions",
  } as const;

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

  const progressActiveKey = activeView === "parking" ? "parking" : activeView === "circuit" ? "circuit" : "code";
  const statCards = [
    { label: "Streak", value: "0", sub: "Day Streak", border: "border-amber-200" },
    { label: "Score", value: "0", sub: "Total Score", border: "border-emerald-200" },
    { label: "Done", value: "8 / 9", sub: "Sections Done", border: "border-purple-200" },
    { label: "VR Zone", value: "", sub: "", border: "border-[var(--mockup-border)]", muted: true },
  ];

  const lessonRows = [
    { id: 1, title: "Priority", status: "Completed" },
    { id: 2, title: "Signs & Signals", status: "Completed" },
    { id: 3, title: "First Aid", status: "Completed" },
    { id: 4, title: "Speed", status: "Completed" },
    { id: 5, title: "Traffic Lights", status: "Completed" },
  ];

  const parkingStats = [
    { label: "Sessions", value: "18" },
    { label: "Success", value: "16%" },
    { label: "Best Time", value: "00:52" },
    { label: "Streak", value: "0" },
  ];

  const parkingLessons = [
    { title: "Marche Avant", desc: "Forward straight line", level: "Medium", tone: "amber" },
    { title: "Parallel", desc: "Parallel parking", level: "Hard", tone: "emerald" },
    { title: "Reverse", desc: "Reverse in straight line", level: "Medium", tone: "rose" },
  ];

  const handleNavClick = (id: string) => {
    const target = navTargets[id as keyof typeof navTargets];
    if (target) {
      setActiveView(target);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, rotateX: 8 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ duration: 0.9, delay: 0.2 }}
      className="relative mx-auto w-full max-w-5xl [perspective:1500px]"
    >
      {/* glow */}
      <div className="absolute -inset-10 bg-[var(--gradient-hero)] blur-3xl" />

      {/* overflow-x-auto ensures desktop layout is preserved on small screens */}
      <div className="relative overflow-x-auto rounded-2xl shadow-[var(--shadow-elegant)]">
      <div className="min-w-[700px] overflow-hidden rounded-2xl bg-[var(--mockup-bg)] text-[var(--mockup-text)]">
        <div className="grid grid-cols-12 min-h-[460px]">
          <aside className="col-span-3 bg-[var(--mockup-surface)] border-r border-[var(--mockup-border)] p-4 space-y-4">
            <div className="flex flex-col items-center gap-2 text-center">
              <div className="h-14 w-14 rounded-full bg-[var(--mockup-accent-soft)] text-[var(--mockup-accent)] grid place-items-center font-bold text-lg">
                W
              </div>
              <div className="text-sm font-semibold tracking-wide">WINO</div>
              <div className="text-[10px] text-[var(--mockup-muted)] uppercase">Learning Platform</div>
            </div>

            <div className="space-y-2">
              <div className="text-[10px] text-[var(--mockup-muted-strong)] uppercase tracking-wider">My Progress</div>
              <div className="grid grid-cols-3 gap-2 text-center">
                {[
                  { key: "code", label: "Code", abbr: "C" },
                  { key: "circuit", label: "Circuit", abbr: "Ci" },
                  { key: "parking", label: "Parking", abbr: "P" },
                ].map((item) => (
                  <div key={item.label} className="flex flex-col items-center gap-1">
                    <div
                      className={`h-7 w-7 rounded-full border text-[10px] font-semibold grid place-items-center ${
                        item.key === progressActiveKey
                          ? "border-[var(--mockup-accent)] text-[var(--mockup-accent)]"
                          : "border-[var(--mockup-border)] text-[var(--mockup-muted-strong)]"
                      }`}
                    >
                      {item.abbr}
                    </div>
                    <div className="text-[9px] text-[var(--mockup-muted)]">{item.label}</div>
                  </div>
                ))}
              </div>
              <div className="text-[10px] text-[var(--mockup-muted)]">Progress: 0%</div>
              <div className="text-[10px] text-[var(--mockup-accent)]">
                {activeView === "circuit" ? "Score Circuit: —" : "Score Code: 88.0%"}
              </div>
            </div>

            <div className="space-y-1">
              <div className="text-[10px] text-[var(--mockup-muted-strong)] uppercase tracking-wider">Navigation</div>
              {[
                { id: "1", label: "Code / Theory" },
                { id: "2", label: "Circuit" },
                { id: "3", label: "Parking" },
                { id: "4", label: "Sessions" },
              ].map((item) => {
                const target = navTargets[item.id as keyof typeof navTargets];
                const isViewItem = Boolean(target);
                const isActive = target === activeView;
                const circuitSub = ["Dashboard", "My Sessions", "Progress"] as const;

                if (item.id === "2") {
                  return (
                    <Fragment key="nav-circuit">
                      <button
                        type="button"
                        onClick={() => handleNavClick(item.id)}
                        aria-current={isActive ? "page" : undefined}
                        className={`mockup-nav-liquid flex w-full items-center gap-2 rounded-lg px-2 py-2 text-left text-xs transition-all ${
                          isActive ? "mockup-nav-liquid-active" : "hover:brightness-[1.04]"
                        }`}
                      >
                        <span
                          className={`h-5 w-5 shrink-0 rounded-md border text-[10px] grid place-items-center ${
                            isActive
                              ? "border-[var(--mockup-accent)] bg-[var(--mockup-surface)] text-[var(--mockup-accent)]"
                              : "border-[var(--mockup-border)] text-[var(--mockup-muted)]"
                          }`}
                        >
                          {item.id}
                        </span>
                        <span className="flex-1">{item.label}</span>
                        <ChevronRight
                          className={`h-3.5 w-3.5 shrink-0 transition-transform ${isActive ? "rotate-90 text-[var(--mockup-accent)]" : "text-[var(--mockup-muted)]"}`}
                        />
                      </button>
                      {isActive ? (
                        <div className="ml-2 space-y-0.5 border-l border-[var(--mockup-accent-30)] pl-2.5 py-0.5">
                          {circuitSub.map((label) => (
                            <button
                              key={label}
                              type="button"
                              className="flex w-full items-center rounded-md px-2 py-1.5 text-left text-[10px] text-[var(--mockup-muted)] transition hover:bg-[var(--mockup-accent-10)] hover:text-[var(--mockup-accent-strong)]"
                            >
                              {label}
                            </button>
                          ))}
                        </div>
                      ) : null}
                    </Fragment>
                  );
                }

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleNavClick(item.id)}
                    aria-current={isActive ? "page" : undefined}
                    aria-disabled={!isViewItem}
                    disabled={!isViewItem}
                    className={`flex items-center gap-2 rounded-lg px-2 py-2 text-xs ${
                      isActive
                        ? "bg-[var(--mockup-accent-soft)] text-[var(--mockup-accent)] font-semibold"
                        : "text-[var(--mockup-muted)]"
                    } ${isViewItem ? "cursor-pointer" : "cursor-default"} ${
                      !isActive && isViewItem ? "hover:bg-[var(--mockup-surface-soft)]" : ""
                    }`}
                  >
                    <span
                      className={`h-5 w-5 rounded-md border text-[10px] grid place-items-center ${
                        isActive
                          ? "border-[var(--mockup-accent)] bg-[var(--mockup-surface)] text-[var(--mockup-accent)]"
                          : "border-[var(--mockup-border)] text-[var(--mockup-muted)]"
                      }`}
                    >
                      {item.id}
                    </span>
                    {item.label}
                  </button>
                );
              })}
            </div>

            <div className="pt-3 border-t border-[var(--mockup-border)] space-y-2 text-[10px] text-[var(--mockup-muted)]">
              <button
                type="button"
                onClick={() => setTheme((current) => (current === "dark" ? "light" : "dark"))}
                aria-pressed={isLight}
                className="flex w-full items-center justify-between gap-2 rounded-md px-2 py-1.5 text-[10px] transition hover:bg-[var(--mockup-surface-soft)]"
              >
                <span className="flex items-center gap-2">
                  <span
                    className={`h-2 w-2 rounded-full ${
                      isLight ? "bg-[var(--mockup-muted-strong)]" : "bg-[var(--mockup-warning-dot)]"
                    }`}
                  />
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
              <div className="flex items-center gap-2 text-[var(--mockup-danger)]">
                <span className="h-2 w-2 rounded-full bg-[var(--mockup-danger)]" />
                Logout
              </div>
            </div>
          </aside>

          <main className="col-span-9 bg-[var(--mockup-bg)]">
            <div className="p-4 space-y-4">
              {activeView === "sessions" ? (
                <>
                  <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl bg-[var(--mockup-accent)] px-4 py-3 text-white shadow-sm">
                    <div className="flex items-center gap-3 text-xs sm:text-sm">
                      <button
                        type="button"
                        className="inline-flex items-center gap-1 rounded-full bg-white/20 px-3 py-1"
                      >
                        <ArrowLeft className="h-3 w-3" />
                        Back
                      </button>
                      <div className="font-semibold">Sessions</div>
                      <div className="hidden sm:block text-white/70 text-xs">hachmi jemni</div>
                    </div>
                    <div className="flex items-center gap-2 text-[10px] sm:text-xs">
                      <button
                        type="button"
                        className="inline-flex items-center gap-1 rounded-lg bg-white/15 px-3 py-1.5"
                      >
                        <CalendarCheck className="h-3.5 w-3.5" />
                        Book Session
                      </button>
                      <button
                        type="button"
                        className="inline-flex items-center gap-1 rounded-lg bg-[var(--mockup-button)] px-3 py-1.5 text-[var(--mockup-button-text)]"
                      >
                        <Sparkles className="h-3.5 w-3.5" />
                        AI Recommendations
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="bg-[var(--mockup-surface)] rounded-xl shadow-sm border border-[var(--mockup-border-soft)] overflow-hidden">
                      <div className="bg-[var(--mockup-surface-muted)] px-3 py-1.5 text-[10px] text-[var(--mockup-muted-strong)] uppercase">
                        Account Balance
                      </div>
                      <div className="p-3">
                        <div className="text-2xl font-semibold text-[var(--mockup-danger)]">- 30 TND</div>
                        <div className="mt-2 rounded-md bg-[var(--mockup-danger-soft)] px-2 py-1 text-[10px] text-[var(--mockup-danger)]">
                          You have an outstanding balance of 30 TND.
                        </div>
                        <button
                          type="button"
                          className="mt-3 w-full rounded-md bg-[var(--mockup-accent)] text-white text-xs py-1.5"
                        >
                          Pay with D17
                        </button>
                        <button
                          type="button"
                          className="mt-2 w-full rounded-md border border-[var(--mockup-accent)] text-[var(--mockup-accent)] text-xs py-1.5"
                        >
                          View Payment History
                        </button>
                      </div>
                    </div>

                    <div className="bg-[var(--mockup-surface)] rounded-xl shadow-sm border border-[var(--mockup-border-soft)] overflow-hidden">
                      <div className="bg-[var(--mockup-surface-muted)] px-3 py-1.5 text-[10px] text-[var(--mockup-muted-strong)] uppercase">
                        Current Score
                      </div>
                      <div className="p-3">
                        <div className="text-2xl font-semibold">88.0%</div>
                        <div className="mt-2 inline-flex items-center gap-1 rounded-md bg-emerald-50 px-2 py-1 text-[10px] text-emerald-600">
                          <CheckCircle2 className="h-3 w-3" />
                          Eligible for Code Exam
                        </div>
                        <button
                          type="button"
                          className="mt-5 w-full rounded-md bg-[var(--mockup-button)] text-[var(--mockup-button-text)] text-xs py-1.5"
                        >
                          Request Code Exam
                        </button>
                      </div>
                    </div>

                    <div className="bg-[var(--mockup-surface)] rounded-xl shadow-sm border border-[var(--mockup-border-soft)] overflow-hidden">
                      <div className="bg-[var(--mockup-surface-muted)] px-3 py-1.5 text-[10px] text-[var(--mockup-muted-strong)] uppercase">
                        Sessions
                      </div>
                      <div className="p-3">
                        <div className="text-2xl font-semibold">1/25</div>
                        <div className="mt-3 h-1.5 rounded-full bg-[var(--mockup-progress-bg)]">
                          <div className="h-full w-1/4 rounded-full bg-[var(--mockup-accent)]" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-[var(--mockup-surface)] rounded-xl shadow-sm border border-[var(--mockup-border-soft)] overflow-hidden">
                    <div className="flex items-center gap-2 bg-[var(--mockup-surface-muted)] px-3 py-2 text-sm font-semibold">
                      <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[var(--mockup-accent-15)] text-[var(--mockup-accent)] text-[10px]">
                        LP
                      </span>
                      Learning Progress
                    </div>
                    <div className="p-3 space-y-3">
                      <div className="inline-flex items-center gap-2 rounded-md bg-[var(--mockup-accent-soft)] px-2 py-1 text-[10px] text-[var(--mockup-accent-strong)]">
                        Active Stage: Code Theory - Score 88.0%
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        <div className="rounded-lg border border-[var(--mockup-accent-20)] bg-[var(--mockup-accent-10)] p-3 text-center">
                          <div className="mx-auto mb-2 h-7 w-7 rounded-full bg-[var(--mockup-accent-15)] text-[var(--mockup-accent)] grid place-items-center text-[10px] font-semibold">
                            C
                          </div>
                          <div className="text-xs font-semibold">Code Theory</div>
                          <div className="text-[10px] text-[var(--mockup-accent)]">In Progress</div>
                        </div>
                        <div className="rounded-lg bg-[var(--mockup-surface-soft)] p-3 text-center text-[var(--mockup-muted)]">
                          <div className="mx-auto mb-2 h-7 w-7 rounded-full bg-[var(--mockup-progress-bg)] text-[var(--mockup-muted)] grid place-items-center text-[10px] font-semibold">
                            L
                          </div>
                          <div className="text-xs font-semibold">Circuit</div>
                          <div className="text-[10px]">Locked</div>
                        </div>
                        <div className="rounded-lg bg-[var(--mockup-surface-soft)] p-3 text-center text-[var(--mockup-muted)]">
                          <div className="mx-auto mb-2 h-7 w-7 rounded-full bg-[var(--mockup-progress-bg)] text-[var(--mockup-muted)] grid place-items-center text-[10px] font-semibold">
                            L
                          </div>
                          <div className="text-xs font-semibold">Parking</div>
                          <div className="text-[10px]">Locked</div>
                        </div>
                      </div>
                      <div className="rounded-md bg-[var(--mockup-warning-bg)] px-2 py-1 text-[10px] text-[var(--mockup-warning-text)]">
                        Next Exam: Code Theory scheduled on 09/04/2026
                      </div>
                    </div>
                  </div>
                </>
              ) : activeView === "code" ? (
                <div className="rounded-xl border border-[var(--mockup-border)] bg-[var(--mockup-surface-muted)] p-4 space-y-4">
                  <div>
                    <div className="text-lg font-semibold">Welcome!</div>
                    <div className="text-xs text-[var(--mockup-muted)]">Continue your driving lessons</div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    <div className="bg-[var(--mockup-surface)] rounded-xl p-4 shadow-sm flex items-center justify-center">
                      <div className="flex flex-col items-center gap-2">
                        <div
                          className="h-28 w-28 rounded-full grid place-items-center"
                          style={{
                            background:
                              "conic-gradient(var(--mockup-accent) 0 316deg, var(--mockup-progress-bg) 316deg 360deg)",
                          }}
                        >
                          <div className="h-20 w-20 rounded-full bg-[var(--mockup-surface)] grid place-items-center">
                            <div className="text-lg font-semibold text-[var(--mockup-text)]">88%</div>
                          </div>
                        </div>
                        <div className="text-[10px] text-[var(--mockup-muted)]">Complete</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 lg:col-span-2">
                      {statCards.map((stat) => (
                        <div
                          key={stat.label}
                          className={`rounded-xl border ${stat.border} bg-[var(--mockup-surface)] p-3 shadow-sm ${
                            stat.muted ? "text-[var(--mockup-muted-strong)]" : "text-[var(--mockup-text)]"
                          }`}
                        >
                          <div className="text-[10px] uppercase text-[var(--mockup-muted-strong)]">{stat.label}</div>
                          {stat.value ? (
                            <div className="mt-1 text-lg font-semibold">{stat.value}</div>
                          ) : (
                            <div className="mt-3 h-6 rounded-md bg-[var(--mockup-surface-soft)]" />
                          )}
                          {stat.sub ? (
                            <div className="text-[10px] text-[var(--mockup-muted)]">{stat.sub}</div>
                          ) : (
                            <div className="text-[10px] text-[var(--mockup-muted-strong)]">VR Zone</div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="text-xs text-[var(--mockup-muted-strong)] uppercase tracking-wider">Lessons</div>
                    <div className="mt-3 space-y-3">
                      {lessonRows.map((lesson) => (
                        <div
                          key={lesson.id}
                          className="flex items-center justify-between gap-3 rounded-xl border border-[var(--mockup-accent-40)] bg-[var(--mockup-surface)] px-3 py-2.5 shadow-sm"
                        >
                          <div className="flex items-center gap-3">
                            <div className="h-9 w-9 rounded-full bg-[var(--mockup-accent)] text-white text-xs font-semibold grid place-items-center">
                              {lesson.id}
                            </div>
                            <div>
                              <div className="text-sm font-semibold">{lesson.title}</div>
                              <div className="mt-0.5 inline-flex items-center gap-1 text-[10px] text-[var(--mockup-accent)]">
                                <CheckCircle2 className="h-3 w-3" />
                                {lesson.status}
                              </div>
                            </div>
                          </div>
                          <button
                            type="button"
                            className="rounded-full border border-[var(--mockup-accent-40)] px-3 py-1 text-[10px] text-[var(--mockup-accent)]"
                          >
                            Review
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : activeView === "circuit" ? (
                <div className="space-y-4">
                  <div className="rounded-xl border border-[var(--mockup-border-soft)] bg-gradient-to-r from-[var(--mockup-accent-soft)] to-transparent p-4 shadow-sm">
                    <div className="text-sm font-semibold text-[var(--mockup-accent-strong)]">Welcome back, Houssem!</div>
                    <div className="mt-1.5 flex flex-wrap gap-4 text-[10px] text-[var(--mockup-muted)]">
                      <span>
                        Course level: <strong className="text-[var(--mockup-text)]">B</strong>
                      </span>
                      <span>
                        Status: <strong className="text-emerald-600">ACTIVE</strong>
                      </span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                    {(
                      [
                        ["Total Sessions", "3", BarChart3] as const,
                        ["PASS / Total", "3 / 3", CheckCircle2] as const,
                        ["Avg Stress", "88.7%", null] as const,
                        ["Avg Risk", "80.0%", AlertTriangle] as const,
                        ["Readiness", "58%", Target] as const,
                      ] as const
                    ).map(([label, value, Icon]) => (
                      <div
                        key={label}
                        className="rounded-xl border border-[var(--mockup-border-soft)] bg-[var(--mockup-surface)] p-3 shadow-sm"
                      >
                        <div className="flex items-center justify-between gap-1 text-[10px] text-[var(--mockup-muted-strong)] uppercase">
                          <span className="leading-tight">{label}</span>
                          {Icon ? (
                            <Icon className="h-3.5 w-3.5 shrink-0 text-[var(--mockup-muted)]" />
                          ) : (
                            <span className="text-sm" aria-hidden>
                              😰
                            </span>
                          )}
                        </div>
                        <div className="mt-1 text-base font-semibold text-[var(--mockup-text)]">{value}</div>
                      </div>
                    ))}
                  </div>
                  <div className="rounded-xl border border-[var(--mockup-border-soft)] bg-[var(--mockup-surface)] p-4 shadow-sm">
                    <div className="text-[10px] font-semibold uppercase text-[var(--mockup-muted-strong)]">Exam readiness</div>
                    <div className="mt-2 flex items-end gap-3">
                      <span className="text-3xl font-bold text-orange-500">58%</span>
                      <div className="mb-1.5 flex-1 h-2.5 rounded-full bg-[var(--mockup-progress-bg)]">
                        <div className="h-full w-[58%] rounded-full bg-gradient-to-r from-orange-400 to-orange-500" />
                      </div>
                    </div>
                    <p className="mt-3 text-[10px] text-[var(--mockup-muted)]">
                      You need more practice sessions. Focus on the AI recommendations.
                    </p>
                  </div>
                  <div className="rounded-xl border border-[var(--mockup-accent-20)] bg-[var(--mockup-accent-10)] p-4 shadow-sm">
                    <div className="flex flex-wrap items-center justify-between gap-2 text-[10px] text-[var(--mockup-muted)]">
                      <span>2026-05-12 17:18</span>
                      <span className="inline-flex items-center gap-1">neighborhood ☀️</span>
                    </div>
                    <div className="mt-2 inline-flex items-center gap-2 rounded-lg bg-emerald-100 px-3 py-1.5 text-sm font-semibold text-emerald-800">
                      <CheckCircle2 className="h-4 w-4" />
                      PASS
                    </div>
                    <p className="mt-3 text-[10px] text-[var(--mockup-muted-strong)] leading-relaxed">
                      Session Parcours Circuit (Arduino) — Stress: 100% Risk: 100% Perf: Needs Improvement.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl bg-[var(--mockup-surface)] px-4 py-3 shadow-sm border border-[var(--mockup-border-soft)]">
                    <div className="flex items-center gap-3 text-xs sm:text-sm">
                      <span className="inline-flex items-center gap-2 rounded-full bg-[var(--mockup-accent-10)] px-2 py-1 text-[var(--mockup-accent)] text-xs font-semibold">
                        <span className="h-5 w-5 rounded-full bg-[var(--mockup-accent)] text-white grid place-items-center text-[10px]">P</span>
                        PARKING
                      </span>
                      <span className="text-[var(--mockup-muted)] text-xs">Autonomous Training</span>
                    </div>
                    <div className="flex items-center gap-2 text-[10px] sm:text-xs">
                      <button
                        type="button"
                        className="inline-flex items-center gap-1 rounded-full bg-[var(--mockup-ai)] px-3 py-1 text-white"
                      >
                        <Sparkles className="h-3 w-3" />
                        AI
                      </button>
                      <div className="rounded-full bg-[var(--mockup-accent-15)] px-3 py-1 text-[var(--mockup-accent)]">Lv. 3 — Confirmed</div>
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 w-16 rounded-full bg-[var(--mockup-progress-bg)]">
                          <div className="h-full w-1/3 rounded-full bg-[var(--mockup-accent)]" />
                        </div>
                        <span className="text-[var(--mockup-muted-strong)]">2 / 6</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {parkingStats.map((stat) => (
                      <div key={stat.label} className="bg-[var(--mockup-surface)] rounded-xl p-3 shadow-sm border border-[var(--mockup-border-soft)]">
                        <div className="text-[10px] text-[var(--mockup-muted-strong)] uppercase">{stat.label}</div>
                        <div className="mt-1 text-lg font-semibold text-[var(--mockup-text)]">{stat.value}</div>
                        <div className="text-[10px] text-[var(--mockup-muted)]">{stat.label}</div>
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                    {parkingLessons.slice(0, 2).map((lesson) => (
                      <div key={lesson.title} className="bg-[var(--mockup-surface)] rounded-xl p-4 shadow-sm border border-[var(--mockup-border-soft)]">
                        <div className="flex items-center justify-between gap-3">
                          <div className="flex items-center gap-3">
                            <div
                              className={`h-10 w-10 rounded-lg grid place-items-center text-xs font-semibold ${
                                lesson.tone === "amber"
                                  ? "bg-amber-100 text-amber-600"
                                  : "bg-emerald-100 text-emerald-600"
                              }`}
                            >
                              {lesson.title.slice(0, 2).toUpperCase()}
                            </div>
                            <div>
                              <div className="text-sm font-semibold">{lesson.title}</div>
                              <div className="text-[10px] text-[var(--mockup-muted)]">{lesson.desc}</div>
                            </div>
                          </div>
                          <span
                            className={`rounded-full px-2 py-0.5 text-[10px] ${
                              lesson.tone === "amber"
                                ? "bg-amber-50 text-amber-600"
                                : "bg-emerald-50 text-emerald-600"
                            }`}
                          >
                            {lesson.level}
                          </span>
                        </div>
                        <div className="mt-4 text-[10px] text-[var(--mockup-muted-strong)]">4 steps • 8 min</div>
                        <div className="mt-3 h-1.5 rounded-full bg-[var(--mockup-progress-bg)]">
                          <div
                            className={`h-full w-0 rounded-full ${
                              lesson.tone === "amber" ? "bg-amber-400" : "bg-emerald-500"
                            }`}
                          />
                        </div>
                        <button
                          type="button"
                          className={`mt-4 ml-auto block rounded-full px-4 py-1 text-[10px] text-white ${
                            lesson.tone === "amber" ? "bg-amber-400" : "bg-emerald-500"
                          }`}
                        >
                          Start →
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="bg-[var(--mockup-surface)] rounded-xl p-4 shadow-sm border border-[var(--mockup-border-soft)]">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-lg bg-rose-100 text-rose-600 grid place-items-center text-xs font-semibold">
                          RV
                        </div>
                        <div>
                          <div className="text-sm font-semibold">{parkingLessons[2].title}</div>
                          <div className="text-[10px] text-[var(--mockup-muted)]">{parkingLessons[2].desc}</div>
                        </div>
                      </div>
                      <span className="rounded-full bg-amber-50 text-amber-600 px-2 py-0.5 text-[10px]">Medium</span>
                    </div>
                    <div className="mt-4 text-[10px] text-[var(--mockup-muted-strong)]">4 steps • 8 min</div>
                    <div className="mt-3 h-1.5 rounded-full bg-[var(--mockup-progress-bg)]">
                      <div className="h-full w-0 rounded-full bg-rose-400" />
                    </div>
                    <button
                      type="button"
                      className="mt-4 ml-auto block rounded-full bg-rose-400 px-4 py-1 text-[10px] text-white"
                    >
                      Start →
                    </button>
                  </div>

                  <div className="rounded-2xl bg-gradient-to-r from-indigo-500 to-violet-400 p-4 text-white shadow-sm">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm font-semibold">Parking</div>
                        <div className="text-[10px] text-white/80">3 maneuvers in sequence</div>
                      </div>
                      <span className="rounded-full bg-white/20 px-3 py-1 text-[10px]">ATTT</span>
                    </div>
                    <div className="mt-3 flex flex-wrap items-center gap-3 text-[10px]">
                      <span className="rounded-full bg-white/15 px-2 py-1">1. Marche Avant</span>
                      <span className="rounded-full bg-white/15 px-2 py-1">2. Creneau</span>
                      <span className="rounded-full bg-white/15 px-2 py-1">3. Marche arriere</span>
                    </div>
                    <button
                      type="button"
                      className="mt-4 ml-auto block rounded-full bg-white text-indigo-600 px-4 py-1 text-[10px]"
                    >
                      Start Parking →
                    </button>
                  </div>

                  <div className="bg-[var(--mockup-surface)] rounded-xl p-4 shadow-sm border border-[var(--mockup-border-soft)]">
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-semibold">Smart Coach Recommendation</div>
                      <span className="rounded-full bg-amber-50 px-2 py-0.5 text-[10px] text-amber-600">Exam: 0%</span>
                    </div>
                    <div className="mt-3 text-[10px] text-[var(--mockup-muted)]">
                      Start with <span className="text-emerald-600 font-semibold">Parallel</span>. This is the most
                      common maneuver on the ATTT exam. Build confidence first.
                    </div>
                  </div>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
      </div>
    </motion.div>
  );
}
