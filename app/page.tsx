import About from "@/components/about";
import Contact from "@/components/contact";
import Experience from "@/components/experience";
import Intro from "@/components/intro";
import Skills from "@/components/skills";
import ProjectSection from "@/components/project-section";
import SectionDivider from "@/components/section-divider";
import MaintenanceMode from "../components/MaintenanceMode";
import SplashCursor from "./components/SplashCursor/SplashCursor";
import ScrollVelocity from "./components/ScrollVelocity/ScrollVelocity";

export default function Home() {
  const isMaintenanceMode = false;

  if (isMaintenanceMode) {
    return <MaintenanceMode />;
  }

  return (
    <main className="relative flex flex-col items-center px-4 min-h-screen">
      {/* 🔵 Splash Cursor Effect */}
      <SplashCursor />

      <Intro />

      <div className="w-full overflow-hidden">
        <ScrollVelocity
          texts={["| Data Scientist | Data Analyst | AI Automation", "Scroll Down"]}
          velocity={100}
          className="custom-scroll-text"
        />
      </div>

      <SectionDivider />

      <About />

      <ProjectSection />
      <Skills />
      <Experience />
      <Contact />
    </main>
  );
}
