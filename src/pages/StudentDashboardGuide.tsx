import student1 from "@/assets/student/1.jpg";
import student2 from "@/assets/student/2.jpg";
import student3 from "@/assets/student/3.jpg";
import student4 from "@/assets/student/4.jpg";
import student5 from "@/assets/student/5.jpg";
import student6 from "@/assets/student/6.jpg";
import { AppMockup } from "@/components/landing/AppMockup";
import { RotatePrompt } from "@/components/landing/RotatePrompt";
import { withBase } from "@/lib/baseUrl";

const studentPhotos = [
  { src: student1, alt: "Student dashboard tutorial 1" },
  { src: student2, alt: "Student dashboard tutorial 2" },
  { src: student3, alt: "Student dashboard tutorial 3" },
  { src: student4, alt: "Student dashboard tutorial 4" },
  { src: student5, alt: "Student dashboard tutorial 5" },
  { src: student6, alt: "Student dashboard tutorial 6" },
];

export default function StudentDashboardGuide() {
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-40 px-4 pt-6">
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between rounded-2xl px-4 py-3 glass-strong">
          <a href={withBase("")} className="text-sm text-muted-foreground hover:text-foreground transition">
            Back to home
          </a>
          <div className="font-display font-semibold">Student Dashboard Guide</div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-5xl px-4 pb-20 pt-10">
        <section className="glass-strong rounded-3xl p-8">
          <h1 className="font-display text-4xl font-bold">
            How to use the Student Dashboard
          </h1>
          <p className="mt-3 text-muted-foreground">
            Track lessons, manage your schedule, and see progress in one place. Use the
            sections below as a quick guide.
          </p>
        </section>

        <section className="mt-10">
          <RotatePrompt>
            <AppMockup />
          </RotatePrompt>
        </section>

        <div className="mt-8 grid gap-6 grid-cols-2">
          <section className="glass rounded-2xl p-6">
            <h2 className="font-display text-xl font-semibold">Getting started</h2>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li>Check your profile for assigned instructor and training plan.</li>
              <li>Set your availability and preferred lesson times.</li>
              <li>Review pending tasks and required documents.</li>
            </ul>
          </section>

          <section className="glass rounded-2xl p-6">
            <h2 className="font-display text-xl font-semibold">Lessons and schedule</h2>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li>Open the calendar to see upcoming lessons and locations.</li>
              <li>Reschedule or request changes from a lesson card.</li>
              <li>Mark lessons complete after each session.</li>
            </ul>
          </section>

          <section className="glass rounded-2xl p-6">
            <h2 className="font-display text-xl font-semibold">Progress tracking</h2>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li>Review skill checkpoints and instructor feedback.</li>
              <li>Track hours completed versus total requirements.</li>
              <li>Download progress reports when needed.</li>
            </ul>
          </section>

          <section className="glass rounded-2xl p-6">
            <h2 className="font-display text-xl font-semibold">Notifications</h2>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li>Enable email alerts for schedule updates.</li>
              <li>Confirm lesson reminders the day before.</li>
              <li>Contact support from the help panel if needed.</li>
            </ul>
          </section>
        </div>
      </main>
    </div>
  );
}
