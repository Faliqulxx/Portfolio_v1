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
  category: string[];
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
      onMouseEnter={() => {
        pausedRef.current = true;
        if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
      }}
      onMouseLeave={endDrag}
      onMouseDown={handlePointerDown}
      onMouseMove={handlePointerMove}
      onMouseUp={endDrag}
      onTouchStart={handlePointerDown}
      onTouchMove={handlePointerMove}
      onTouchEnd={endDrag}
      onWheel={handleWheel}
      className={`flex gap-6 overflow-x-auto scrollbar-hide select-none -mx-4 px-4 sm:mx-0 sm:px-0 ${isDragging ? "cursor-grabbing" : "cursor-grab"
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
          className="flex-shrink-0 w-[280px] sm:w-[320px] md:w-[360px] lg:w-[400px] xl:w-[480px] 2xl:w-[560px] relative overflow-hidden rounded-2xl bg-white dark:bg-white/5 backdrop-blur-md border border-brand-violet/15 shadow-sm hover:border-brand-violet/35 hover:shadow-glow-card transition-all"
        >
          <img
            src={project.image}
            alt={project.title}
            className="w-full aspect-video object-cover"
            draggable={false}
          />
          <div className="p-4">
            <h3 className="text-xl font-semibold mb-4 text-black dark:text-white">
              {project.title}
            </h3>
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
                    className="text-black dark:text-white/50 hover:text-black dark:hover:text-white transition-colors text-xl"
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
                    className="text-black dark:text-white/50 hover:text-black dark:hover:text-white transition-colors text-xl"
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
  const [activeSlide, setActiveSlide] = useState<number>(0);
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("all");

  const handleProjectClick = (project: any) => {
    setSelectedProject(project);
    document.body.style.overflow = "hidden";
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
    document.body.style.overflow = "auto";
    setActiveSlide(0);
  };


  // Filter by the selected category, then split into two roughly-even rows
  const filteredProjects =
    activeCategory === "all"
      ? projectsData
      : projectsData.filter((project) => (project.category as readonly string[]).includes(activeCategory as string));

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
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${activeCategory === option.key
                  ? "bg-brand-gradient text-white shadow-glow-violet"
                  : "bg-transparent text-black dark:text-white/50 hover:bg-brand-violet/10 hover:text-black dark:hover:text-white border border-brand-violet/20"
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
            speed={activeCategory === "all" ? 0.6 : 0}
            inView={inView}
            onProjectClick={handleProjectClick}
          />

          {/* Row 2 — auto-scrolls left to right, draggable */}
          <MarqueeRow
            key={`row2-${activeCategory}`}
            projects={rowTwoProjects}
            keyPrefix="row2"
            direction={1}
            speed={activeCategory === "all" ? 0.6 : 0}
            inView={inView}
            onProjectClick={handleProjectClick}
          />
        </div>
      </div>

      {/* ─── PROJECT DETAIL MODAL ─────────────────────────────── */}
      {selectedProject && (
        <motion.div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleCloseModal}
        >
          <motion.div
            className="bg-white dark:bg-gray-950 w-full max-w-5xl max-h-[90vh] rounded-2xl shadow-2xl border border-brand-violet/20 overflow-hidden flex flex-col lg:flex-row"
            initial={{ scale: 0.92, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.92, opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* ── LEFT: Image Slider ── */}
            <div className="lg:w-1/2 flex flex-col bg-black/5 dark:bg-black/30">
              {/* Main slide image */}
              <div className="relative w-full aspect-video overflow-hidden">
                <motion.img
                  key={activeSlide}
                  src={[
                    selectedProject.image,
                    ...selectedProject.screenshots,
                  ][activeSlide]}
                  alt={`slide-${activeSlide}`}
                  className="w-full h-full object-cover"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.25 }}
                />
                {/* Prev / Next arrows */}
                {[selectedProject.image, ...selectedProject.screenshots].length > 1 && (
                  <>
                    <button
                      onClick={() => setActiveSlide((p) => (p === 0 ? [selectedProject.image, ...selectedProject.screenshots].length - 1 : p - 1))}
                      className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white rounded-full w-8 h-8 flex items-center justify-center transition"
                    >
                      &#8249;
                    </button>
                    <button
                      onClick={() => setActiveSlide((p) => (p === [selectedProject.image, ...selectedProject.screenshots].length - 1 ? 0 : p + 1))}
                      className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white rounded-full w-8 h-8 flex items-center justify-center transition"
                    >
                      &#8250;
                    </button>
                  </>
                )}
                {/* Slide counter */}
                <div className="absolute bottom-2 right-3 bg-black/50 text-white text-xs px-2 py-0.5 rounded-full">
                  {activeSlide + 1} / {[selectedProject.image, ...selectedProject.screenshots].length}
                </div>
              </div>
              {/* Thumbnail strip */}
              <div className="flex gap-2 p-3 overflow-x-auto scrollbar-hide">
                {[selectedProject.image, ...selectedProject.screenshots].map((src, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveSlide(i)}
                    className={`flex-shrink-0 w-16 h-10 rounded-md overflow-hidden border-2 transition ${
                      i === activeSlide
                        ? "border-brand-violet"
                        : "border-transparent opacity-60 hover:opacity-100"
                    }`}
                  >
                    <img src={src} alt={`thumb-${i}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* ── RIGHT: Project Details ── */}
            <div className="lg:w-1/2 overflow-y-auto p-6 flex flex-col gap-4">
              {/* Close button */}
              <button
                onClick={handleCloseModal}
                className="absolute top-4 right-4 z-10 text-black dark:text-white/50 hover:text-black dark:hover:text-white bg-gray-100 dark:bg-white/10 hover:bg-brand-violet/20 border border-brand-violet/20 rounded-full w-8 h-8 flex items-center justify-center transition"
              >
                <span className="text-xl">&times;</span>
              </button>

              {/* Title + action links */}
              <div>
                <h2 className="text-2xl font-bold text-black dark:text-white mb-2">{selectedProject.title}</h2>
                <div className="flex gap-2 flex-wrap">
                  {selectedProject.demoUrl && (
                    <a
                      href={selectedProject.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-brand-violet text-white text-sm font-medium hover:opacity-80 transition"
                    >
                      <BiLinkExternal className="text-base" /> Live Demo
                    </a>
                  )}
                  {selectedProject.githubUrl && (
                    <a
                      href={selectedProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-brand-violet/40 text-black dark:text-white text-sm font-medium hover:bg-brand-violet/10 transition"
                    >
                      <FaGithub className="text-base" /> GitHub
                    </a>
                  )}
                </div>
              </div>

              {/* Description */}
              <div>
                <p className="text-black dark:text-white/70 leading-relaxed text-sm">{selectedProject.description}</p>
              </div>

              {/* Features */}
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-widest text-black dark:text-white/50 mb-2">Features</h3>
                <ul className="space-y-1.5">
                  {selectedProject.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-black dark:text-white/70">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-brand-violet flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tech Stack */}
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-widest text-black dark:text-white/50 mb-2">Tech Stack</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.languages.map((lang, index) => (
                    <span
                      key={index}
                      className="px-2.5 py-1 bg-brand-violet/10 border border-brand-violet/20 text-black dark:text-white/80 rounded-full text-xs font-medium"
                    >
                      {lang}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.section>
  );
};

export default ProjectSection;