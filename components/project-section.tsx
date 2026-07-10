"use client";
import React, { useState } from "react";
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

  const handleProjectClick = (project: any) => {
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

  // Split all projects into two roughly-even rows for the marquee
  const midPoint = Math.ceil(projectsData.length / 2);
  const rowOneProjects = projectsData.slice(0, midPoint);
  const rowTwoProjects = projectsData.slice(midPoint);

  // Speed scales with row length so both rows move at the same px/sec pace
  const rowOneDuration = `${rowOneProjects.length * 8}s`;
  const rowTwoDuration = `${rowTwoProjects.length * 8}s`;

  // Shared card renderer — identical markup/behavior to the original card,
  // reused for both rows (and both halves of each row's loop) so nothing
  // is duplicated in source.
  const renderProjectCard = (project: any, keyPrefix: string, index: number) => (
    <motion.div
      key={`${keyPrefix}-${index}`}
      onClick={() => handleProjectClick(project)}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: inView ? 1 : 0, scale: inView ? 1 : 0.9 }}
      transition={{ duration: 0.6, delay: 0.05 * (index % 10) }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ scale: 1.05 }}
      className="flex-shrink-0 cursor-pointer w-[280px] sm:w-[320px] md:w-[360px] lg:w-[400px] bg-white dark:bg-[#232D3F] text-black border-white dark:border-[#232D3F] border-solid border-8 rounded-xl shadow-lg hover:shadow-xl overflow-hidden"
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
            {project.tech.map((tech: string, techIndex: number) => (
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
  );

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

        <div className="mt-5 flex flex-col gap-6">
          {/* Row 1 — scrolls right to left */}
          <div className="marquee-row marquee-fade overflow-hidden">
            <div
              className="marquee-track flex gap-6 w-max"
              style={{ ["--marquee-duration" as any]: rowOneDuration }}
            >
              {[...rowOneProjects, ...rowOneProjects].map((project, index) =>
                renderProjectCard(project, "row1", index)
              )}
            </div>
          </div>

          {/* Row 2 — scrolls left to right */}
          <div className="marquee-row marquee-fade overflow-hidden">
            <div
              className="marquee-track marquee-track-reverse flex gap-6 w-max"
              style={{ ["--marquee-duration" as any]: rowTwoDuration }}
            >
              {[...rowTwoProjects, ...rowTwoProjects].map((project, index) =>
                renderProjectCard(project, "row2", index)
              )}
            </div>
          </div>
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