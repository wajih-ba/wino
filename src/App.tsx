import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { Stats } from "@/components/landing/Stats";
import { EmailSection } from "@/components/landing/EmailSection";
import { About } from "@/components/landing/About";
import { Features } from "@/components/landing/Features";
import { Team } from "@/components/landing/Team";
import { Screenshots } from "@/components/landing/Screenshots";
import { TechStack } from "@/components/landing/TechStack";
import { FAQ } from "@/components/landing/FAQ";
import { FreeBanner } from "@/components/landing/FreeBanner";
import { Footer } from "@/components/landing/Footer";
import StudentDashboardGuide from "@/pages/StudentDashboardGuide";
import InstructorDashboardGuide from "@/pages/InstructorDashboardGuide";
import { stripBasePathname } from "@/lib/baseUrl";

export default function App() {
  const rawPath = typeof window !== "undefined" ? window.location.pathname : "/";
  const path = stripBasePathname(rawPath).replace(/\/+$/, "") || "/";

  if (path === "/student-dashboard") {
    return <StudentDashboardGuide />;
  }

  if (path === "/instructor-dashboard") {
    return <InstructorDashboardGuide />;
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <About />
        <Features />
        <Screenshots />
        <Team />
        <TechStack />
        <FAQ />
        <EmailSection />
        <FreeBanner />
      </main>
      <Footer />
    </div>
  );
}
