import { InstructorAppMockup } from "@/components/landing/InstructorAppMockup";
import { RotatePrompt } from "@/components/landing/RotatePrompt";
import { withBase } from "@/lib/baseUrl";

export default function InstructorDashboardGuide() {
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-40 px-4 pt-6">
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between rounded-2xl px-4 py-3 glass-strong">
          <a href={withBase("")} className="text-sm text-muted-foreground hover:text-foreground transition">
            Back to home
          </a>
          <div className="font-display font-semibold">Instructor Dashboard Guide</div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-5xl px-4 pb-20 pt-10">
        <section className="glass-strong rounded-3xl p-8">
          <h1 className="font-display text-4xl font-bold">
            How to use the Instructor Dashboard
          </h1>
          <p className="mt-3 text-muted-foreground">
            Organize lessons, manage students, and capture feedback fast. Use the
            sections below for a quick walkthrough.
          </p>
        </section>

        <section className="mt-10">
          <RotatePrompt>
            <InstructorAppMockup />
          </RotatePrompt>
        </section>

        <div className="mt-8 grid gap-6 grid-cols-2">
          <section className="glass rounded-2xl p-6">
            <h2 className="font-display text-xl font-semibold">Schedule management</h2>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li>Review your weekly calendar and location details.</li>
              <li>Approve or adjust lesson requests in one click.</li>
              <li>Block time for exams or admin tasks.</li>
            </ul>
          </section>

          <section className="glass rounded-2xl p-6">
            <h2 className="font-display text-xl font-semibold">Student oversight</h2>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li>Open a student profile to view progress history.</li>
              <li>Add notes and attach documents after each lesson.</li>
              <li>Flag readiness for final exams.</li>
            </ul>
          </section>

          <section className="glass rounded-2xl p-6">
            <h2 className="font-display text-xl font-semibold">Lesson templates</h2>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li>Use templates to standardize lesson flow.</li>
              <li>Customize checklists per student skill level.</li>
              <li>Save frequent routes and training paths.</li>
            </ul>
          </section>

          <section className="glass rounded-2xl p-6">
            <h2 className="font-display text-xl font-semibold">Notifications</h2>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li>Enable alerts for last-minute cancellations.</li>
              <li>Send quick reminders to students.</li>
              <li>Check daily summaries before signing off.</li>
            </ul>
          </section>
        </div>
      </main>
    </div>
  );
}
