"use client";
import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { projectsData } from "@/lib/data";
import BurstBload2 from "./burst-bload-2";
import { useSectionInView } from "@/lib/hooks";
import { useInView } from "react-intersection-observer";
import { FaGithub, FaLink } from "react-icons/fa";
import { BiLinkExternal } from "react-icons/bi";
import SectionHeading from "./section-heading";

interface Project {
  title: string;
  description: string;
  tech: string[];
  image: string;
  screenshots: string[];
  features: string[];
  languages: string[];
  demoUrl?: string;
  githubUrl?: string;
}

const ProjectSection: React.FC = () => {
  const { ref } = useSectionInView("Projects", 0.5);
  const [sectionRef, inView] = useInView({
    triggerOnce: true,
  });
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // --- Horizontal scroll / drag-to-scroll refs ---
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const hasMovedRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    const container = scrollContainerRef.current;
    if (!container) return;
    isDraggingRef.current = true;
    hasMovedRef.current = false;
    setIsDragging(true);
    startXRef.current = e.pageX - container.offsetLeft;
    scrollLeftRef.current = container.scrollLeft;
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const container = scrollContainerRef.current;
    if (!isDraggingRef.current || !container) return;
    e.preventDefault();
    const x = e.pageX - container.offsetLeft;
    const walk = x - startXRef.current;
    if (Math.abs(walk) > 5) hasMovedRef.current = true;
    container.scrollLeft = scrollLeftRef.current - walk;
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    isDraggingRef.current = false;
    setIsDragging(false);
  };

  // Allows a normal vertical mouse wheel to scroll the row horizontally
  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    const container = scrollContainerRef.current;
    if (!container) return;
    if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      e.preventDefault();
      container.scrollLeft += e.deltaY;
    }
  };

  const handleProjectClick = (project: any) => {
    // Ignore the click that fires right after a drag gesture
    if (hasMovedRef.current) return;
    setSelectedProject(project);
    document.body.style.overflow = "hidden";
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
    document.body.style.overflow = "auto";
  };

  const [zoomedImage, setZoomedImage] = useState<string | null>(null);

  const handleScreenshotClick = (screenshot: string) => {
    setZoomedImage(screenshot);
  };

  const handleCloseZoomedImage = () => {
    setZoomedImage(null);
  };

  return (
    <motion.section
      id="projects"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="py-12 px-10 scroll-mt-28 mb-28"
      ref={ref}
      style={{ padding: "0 8%" }}
    >
      <div ref={sectionRef} className="container mx-auto">
        <div className="flex justify-center mb-2">
          <SectionHeading> Projects</SectionHeading>
          <BurstBload2 />
        </div>

        <div
          ref={scrollContainerRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          onWheel={handleWheel}
          className={`mt-5 flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth scrollbar-hide pb-4 -mx-1 px-1 select-none ${
            isDragging ? "cursor-grabbing" : "cursor-grab"
          }`}
        >
          {projectsData.map((project, index) => (
            <motion.div
              key={index}
              onClick={() => handleProjectClick(project)}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: inView ? 1 : 0, scale: inView ? 1 : 0.9 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              exit={{ opacity: 0, scale: 0.9 }}
              whileHover={{ scale: isDragging ? 1 : 1.05 }}
              style={{ cursor: isDragging ? "grabbing" : "pointer" }}
              className="flex-shrink-0 snap-start w-[280px] sm:w-[320px] md:w-[360px] lg:w-[400px] bg-white dark:bg-[#232D3F] text-black border-white dark:border-[#232D3F] border-solid border-8 rounded-xl shadow-lg hover:shadow-xl overflow-hidden"
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-49 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2 dark:text-white">
                  {project.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-200 mb-4 text-justify">
                  {project.description}
                </p>
                <div className="flex justify-between items-end">
                  <div className="flex space-x-2">
                    {project.tech.map((tech, techIndex) => (
                      <img
                        key={techIndex}
                        src={tech}
                        alt={`Tech ${techIndex}`}
                        className="h-6 "
                      />
                    ))}
                  </div>
                  <div className="flex space-x-2">
                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`text-gray-600 dark:text-gray-200 hover:underline text-xl`}
                      >
                        <BiLinkExternal />
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`text-gray-600 dark:text-gray-200 dark:hover:text-gray-100 hover:text-gray-700 text-xl`}
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
      </div>
      {/* Modal for detailed description */}
      {selectedProject && (
        <div className="modal-overlay flex items-center justify-center">
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {" "}
            <div className="bg-white dark:bg-[#232D3F] p-8 max-w-[900px] w-full mx-4 my-8 rounded-xl shadow-lg relative overflow-y-scroll max-h-[80vh]">
              <button
                onClick={handleCloseModal}
                className="absolute top-4 right-4 text-gray-600 dark:text-gray-200 hover:text-gray-700"
              >
                <span className="text-xl">&times;</span>
              </button>
              <h2 className="text-xl font-semibold mb-2 dark:text-white">
                {selectedProject.title}
              </h2>
              <div className=" relative overflow-y-auto">
                <p className="modal-content text-gray-600 dark:text-gray-200 mb-4 text-justify max-h-60vh">
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