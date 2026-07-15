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
    <main
      className="
        relative
        flex flex-col
        items-center
        w-[92vw] max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12
        min-h-screen
        overflow-x-hidden
      "
    >
      {/* ================= BACKGROUND SPLASH ================= */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <SplashCursor />
      </div>

      {/* ================= CONTENT ================= */}
      <div className="relative w-full flex flex-col items-center">
        <Intro />

        {/* ================= SCROLL TEXT ================= */}
        <div className="w-full overflow-hidden">
          <ScrollVelocity
            texts={[
              "| Data Scientist | Data Analyst | AI Automation | IoT Developer | Frontend Developer",
              "Scroll Down",
            ]}
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
      </div>
    </main>
  );
}