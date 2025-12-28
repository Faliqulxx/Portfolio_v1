"use client";

import React from "react";
import SectionHeading from "./section-heading";
import { motion } from "framer-motion";
import { useSectionInView } from "@/lib/hooks";
import BurstBload from "./burst-bload";

export default function About() {
  const { ref } = useSectionInView("About");

  return (
    <motion.section
      ref={ref}
      className="mb-28 max-w-[45rem] text-center leading-8 sm:mb-40 scroll-mt-28"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.175 }}
      id="about"
    >
      <div className="flex justify-center">
        <SectionHeading>👨‍💻 About Me</SectionHeading>
        <BurstBload />
      </div>
      <p>
        Hello, I’m Faliq! I am dedicated and primarily focused on{" "}
        <span className="font-medium">Data Science</span>, supported by strong
        skills in <span className="font-medium">Data Analysis</span> and{" "}
        <span className="font-medium">AI Automation</span>. I continuously
        strive to enhance my technical skills and stay up to date with the
        latest technologies.
        <br />
        <br />
        In the field of data science and data analysis, I have experience in{" "}
        <span className="font-medium">data processing</span>,{" "}
        <span className="font-medium">data analysis</span>,{" "}
        <span className="font-medium">data visualization</span>, and{" "}
        <span className="font-medium">machine learning</span>. I am accustomed
        to transforming raw data into{" "}
        <span className="font-medium">actionable insights</span> using{" "}
        <span className="font-medium">Python, Pandas, Scikit-learn</span>, and{" "}
        <span className="font-medium">SQL</span> to support{" "}
        <span className="font-medium">data-driven and evidence-based</span>{" "}
        decision making.
        <br />
        <br />
        In addition, within the field of AI Automation, I have experience
        building <span className="font-medium">
          automated workflows
        </span> using <span className="font-medium">n8n</span>, integrating{" "}
        <span className="font-medium">RESTful APIs</span>, and automating data
        collection, processing, and distribution processes to improve
        operational efficiency.
        <br />
        <br />
        My goal is to deliver{" "}
        <span className="font-medium">
          impactful data- and AI-driven solutions
        </span>{" "}
        as well as <span className="font-medium">meaningful automation</span>{" "}
        for business and organizational needs.
      </p>
    </motion.section>
  );
}
