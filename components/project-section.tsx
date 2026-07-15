"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { projectsData } from "@/lib/data";
import BurstBload2 from "./burst-bload-2";
import { useSectionInView } from "@/lib/hooks";
import { useInView } from "react-intersection-observer";
import { FaGithub } from "react-icons/fa";
import { BiLinkExternal } from "react-icons/bi";
import SectionHeading from "./section-heading";

interface Project {
  title: string;
  category: "web" | "data";
  description: string;
  tech: string[];
  image: string;
  screenshots: string[];
  features: string[];
  languages: string[];
  demoUrl?: string;
  githubUrl?: string;
}

type CategoryFilter = "all" | "data" | "web";

const CATEGORY_OPTIONS: { key: CategoryFilter; label: string }[] = [
  { key: "all", label: "General Dev" },
  { key: "data", label: "Data Scient" },
  { key: "web", label: "Website" },
];

type MarqueeRowProps = {
  projects: any[];
  keyPrefix: string;
  /** 1 = auto-scrolls left-to-right, -1 = auto-scrolls right-to-left */
  direction: 1 | -1;
  speed?: number;
  inView: boolean;
  onProjectClick: (project: any) => void;
};

/**
 * A single infinite-loop row. The project list is duplicated so the track is
 * exactly 2x wide; auto-scroll runs on requestAnimationFrame and wraps by
 * exactly half the scrollWidth, so the loop never visibly jumps. Dragging
 * (mouse or touch) simply pauses the auto-scroll and lets the user move the
 * native scrollLeft directly — releasing resumes the auto-scroll from
 * wherever it was left.
 */
function MarqueeRow({
  projects,
  keyPrefix,
  direction,
  speed = 0.6,
  inView,
  onProjectClick,
}: MarqueeRowProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isPointerDownRef = useRef(false);
  const hasMovedRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);
  const pausedRef = useRef(false);
  const resumeTimeoutRef = useRef<ReturnType<typeof setTimeout>>();
  const rafRef = useRef<number>();
  const [isDragging, setIsDragging] = useState(false);

  const items = [...projects, ...projects];

  // Auto-scroll loop
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Rows that scroll "backwards" start halfway through the track so they
    // have room to decrement before wrapping.
    if (direction === -1 && container.scrollLeft === 0) {
      container.scrollLeft = container.scrollWidth / 2;
    }

    const step = () => {
      if (!pausedRef.current && container) {
        const halfWidth = container.scrollWidth / 2;
        container.scrollLeft += direction * speed;

        if (direction === 1 && container.scrollLeft >= halfWidth) {
          container.scrollLeft -= halfWidth;
        } else if (direction === -1 && container.scrollLeft <= 0) {
          container.scrollLeft += halfWidth;
        }
      }
      rafRef.current = requestAnimationFrame(step);
    };

    rafRef.current = requestAnimationFrame(step);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [direction, speed]);

  const getPageX = (e: React.MouseEvent | React.TouchEvent) =>
    "touches" in e ? e.touches[0].pageX : (e as React.MouseEvent).pageX;

  const handlePointerDown = (e: React.MouseEvent | React.TouchEvent) => {
    const container = containerRef.current;
    if (!container) return;
    isPointerDownRef.current = true;
    hasMovedRef.current = false;
    pausedRef.current = true;
    setIsDragging(true);
    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    startXRef.current = getPageX(e) - container.offsetLeft;
    scrollLeftRef.current = container.scrollLeft;
  };

  const handlePointerMove = (e: React.MouseEvent | React.TouchEvent) => {
    const container = containerRef.current;
    if (!isPointerDownRef.current || !container) return;
    const x = getPageX(e) - container.offsetLeft;
    const walk = x - startXRef.current;
    if (Math.abs(walk) > 5) hasMovedRef.current = true;
    container.scrollLeft = scrollLeftRef.current - walk;
  };

  const endDrag = () => {
    isPointerDownRef.current = false;
    setIsDragging(false);
    // Resume auto-scroll shortly after the user lets go
    resumeTimeoutRef.current = setTimeout(() => {
      pausedRef.current = false;
    }, 700);
  };

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    const container = containerRef.current;
    if (!container) return;
    if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      e.preventDefault();
      pausedRef.current = true;
      container.scrollLeft += e.deltaY;
      if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
      resumeTimeoutRef.current = setTimeout(() => {
        pausedRef.current = false;
      }, 800);
    }
  };

  return (
    <div
      ref={containerRef}
      onMouseDown={handlePointerDown}
      onMouseMove={handlePointerMove}
      onMouseUp={endDrag}
      onMouseLeave={endDrag}
      onTouchStart={handlePointerDown}
      onTouchMove={handlePointerMove}
      onTouchEnd={endDrag}
      onWheel={handleWheel}
      className={`flex gap-6 overflow-x-auto scrollbar-hide select-none -mx-4 px-4 sm:mx-0 sm:px-0 ${
        isDragging ? "cursor-grabbing" : "cursor-grab"
      }`}
    >
      {items.map((project, index) => (
        <motion.div
          key={`${keyPrefix}-${index}`}
          onClick={() => {
            if (!hasMovedRef.current) onProjectClick(project);
          }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: inView ? 1 : 0, scale: inView ? 1 : 0.9 }}
          transition={{ duration: 0.6, delay: 0.03 * (index % 10) }}
          whileHover={{ scale: isDragging ? 1 : 1.03 }}
          style={{ cursor: isDragging ? "grabbing" : "pointer" }}
          className="flex-shrink-0 w-[280px] sm:w-[320px] md:w-[360px] lg:w-[400px] xl:w-[480px] 2xl:w-[560px] relative overflow-hidden rounded-2xl bg-white/60 dark:bg-white/5 backdrop-blur-md border border-gray-200/60 dark:border-white/10 shadow-sm transition-all"
        >
          <img
            src={project.image}
            alt={project.title}
            className="w-full aspect-video object-cover"
            draggable={false}
          />
          <div className="p-4">
            <h3 className="text-xl font-semibold mb-2 dark:text-white">
              {project.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-200 mb-4 text-left text-pretty leading-relaxed">
              {project.description}
            </p>
            <div className="flex justify-between items-end">
              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech: string, techIndex: number) => (
                  <img
                    key={techIndex}
                    src={tech}
                    alt={`Tech ${techIndex}`}
                    className="h-6"
                    draggable={false}
                  />
                ))}
              </div>
              <div className="flex space-x-2">
                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="text-gray-600 dark:text-gray-200 hover:underline text-xl"
                  >
                    <BiLinkExternal />
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="text-gray-600 dark:text-gray-200 dark:hover:text-gray-100 hover:text-gray-700 text-xl"
                  >
                    <FaGithub />
                  </a>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

const ProjectSection: React.FC = () => {
  const { ref } = useSectionInView("Projects", 0.5);
  const [sectionRef, inView] = useInView({
    triggerOnce: true,
  });
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("all");

  const handleProjectClick = (project: any) => {
    setSelectedProject(project);
    document.body.style.overflow = "hidden";
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
    document.body.style.overflow = "auto";
  };

  const handleScreenshotClick = (screenshot: string) => {
    setZoomedImage(screenshot);
  };

  const handleCloseZoomedImage = () => {
    setZoomedImage(null);
  };

  // Filter by the selected category, then split into two roughly-even rows
  const filteredProjects =
    activeCategory === "all"
      ? projectsData
      : projectsData.filter((project) => project.category === activeCategory);

  const midPoint = Math.ceil(filteredProjects.length / 2);
  const rowOneProjects = filteredProjects.slice(0, midPoint);
  const rowTwoProjects = filteredProjects.slice(midPoint);

  return (
    <motion.section
      id="projects"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="w-full mb-28 sm:mb-32 lg:mb-40 xl:mb-48 scroll-mt-28"
      ref={ref}
    >
      <div ref={sectionRef} className="container mx-auto">
        <div className="flex justify-center mb-2">
          <SectionHeading> Projects</SectionHeading>
          <BurstBload2 />
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-6">
          {CATEGORY_OPTIONS.map((option) => (
            <button
              key={option.key}
              type="button"
              onClick={() => setActiveCategory(option.key)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                activeCategory === option.key
                  ? "bg-gray-900 text-white dark:bg-white dark:text-gray-900 shadow-md"
                  : "bg-transparent text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/10"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>

        <div className="mt-5 flex flex-col gap-6">
          {/* Row 1 — auto-scrolls right to left, draggable */}
          <MarqueeRow
            key={`row1-${activeCategory}`}
            projects={rowOneProjects}
            keyPrefix="row1"
            direction={-1}
            inView={inView}
            onProjectClick={handleProjectClick}
          />

          {/* Row 2 — auto-scrolls left to right, draggable */}
          <MarqueeRow
            key={`row2-${activeCategory}`}
            projects={rowTwoProjects}
            keyPrefix="row2"
            direction={1}
            inView={inView}
            onProjectClick={handleProjectClick}
          />
        </div>
      </div>

      {/* Modal for detailed description */}
      {selectedProject && (
        <div className="modal-overlay flex items-center justify-center">
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {" "}
            <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl p-6 sm:p-8 max-w-[900px] w-full rounded-2xl shadow-2xl relative overflow-y-auto max-h-[85vh] border border-gray-200/60 dark:border-white/10">
              <button
                onClick={handleCloseModal}
                className="absolute top-4 right-4 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors bg-gray-100 dark:bg-white/10 rounded-full w-8 h-8 flex items-center justify-center"
              >
                <span className="text-xl">&times;</span>
              </button>
              <h2 className="text-xl font-semibold mb-2 dark:text-white">
                {selectedProject.title}
              </h2>
              <div className=" relative overflow-y-auto">
                <p className="modal-content text-gray-600 dark:text-gray-200 mb-4 text-left text-pretty leading-relaxed max-h-60vh">
                  {selectedProject.description}
                </p>
              </div>
              <div className="mb-4">
                <h3 className="text-lg font-semibold mb-2 dark:text-white">
                  Features I Worked On:
                </h3>
                <ul className="list-disc list-inside">
                  {selectedProject.features.map((feature, index) => (
                    <li
                      key={index}
                      className="text-gray-600 dark:text-gray-200"
                    >
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <h4 className="text-lg font-semibold mb-2 dark:text-white">
                Click the image to enlarge
              </h4>
              <div className="flex space-x-4 flex-wrap mb-4">
                {selectedProject.screenshots.map((screenshot, index) => (
                  <img
                    key={index}
                    src={screenshot}
                    alt={`Screenshot ${index + 1}`}
                    className="w-32 h-32 object-cover rounded-md cursor-pointer mb-4"
                    onClick={() => handleScreenshotClick(screenshot)}
                  />
                ))}
              </div>
              <h4 className="text-lg font-semibold mb-2 dark:text-white">
                Language and Tools
              </h4>
              <div className="flex justify-between items-end">
                <div className="flex space-x-2">
                  {selectedProject.languages.map((language, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-gray-200 text-gray-800 rounded-full text-sm"
                    >
                      {language}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
      {zoomedImage && (
        <div className="image-modal-overlay flex items-center justify-center">
          <motion.div
            className="fixed inset-0 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="bg-white dark:bg-[#192D3E] p-8 max-w-[1000px] w-full mx-4 my-8 rounded-xl shadow-lg relative">
              <button
                onClick={handleCloseZoomedImage}
                className="absolute top-4 right-4 text-gray-600 dark:text-gray-200 hover:text-gray-700"
              >
                <span className="text-xl">&times;</span>
              </button>
              <div className="w-full h-[600px] mb-4 overflow-hidden">
                <img
                  src={zoomedImage}
                  alt="Zoomed Screenshot"
                  className="max-w-full max-h-full object-contain"
                />
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </motion.section>
  );
};

export default ProjectSection;