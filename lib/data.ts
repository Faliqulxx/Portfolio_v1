import React from "react";
import { CgWorkAlt } from "react-icons/cg";
import { FaReact } from "react-icons/fa";
import { LuGraduationCap } from "react-icons/lu";
import wartafenoImg from "@/public/images/project/wartefeno/1.png";
import autogateImg from "@/public/images/project/autogate/1.png";
import amikomImg from "@/public/images/project/amikom/1.png";
import hrtoolsImg from "@/public/images/project/hr-tools/1.png";

export const links = [
  {
    name: "Home",
    hash: "#home",
  },
  {
    name: "About",
    hash: "#about",
  },
  {
    name: "Projects",
    hash: "#projects",
  },
  {
    name: "Skills",
    hash: "#skills",
  },
  {
    name: "Experience",
    hash: "#experience",
  },
  {
    name: "Contact",
    hash: "#contact",
  },
] as const;
export const experiencesData = [
  {
    title: "AI Automation  (Freelance)",
    location: "Gresik",
    description:
      "Worked as an AI Automation Intern focusing on the development of an AI-based chatbot for the Informatics Study Program. Designed and implemented automated workflows, integrated APIs, and supported chatbot functionality to provide academic information and improve user interaction efficiency.",
    icon: React.createElement(CgWorkAlt),
    date: "Jul 2025 - Present",
  },
  {
    title: "Web Programmer",
    location: "DISPARTA Kab. Pasuruan",
    description:
      "Maintained and improved official websites for DISPARTA and OnTrip, including bug fixing, feature enhancements, performance optimization, and resolving user-reported issues. Collaborated with stakeholders to ensure system reliability, usability, and alignment with organizational requirements.",
    icon: React.createElement(CgWorkAlt),
    date: "Jul 2025 - Aug 2025",
  },
  {
    title: "Software Engineer (Freelance)",
    location: "Gresik",
    description:
      "Worked as a freelance web developer supporting UMKM and small online businesses by developing, customizing, and maintaining websites and online stores. Handled feature implementation, bug fixing, UI improvements, and basic system optimization to ensure usability, reliability, and alignment with client requirements.",
    icon: React.createElement(CgWorkAlt),
    date: "Mar 2022 - Dec 2022",
  },
  {
    title: "Data Scientist (Kampus Merdeka)",
    location: "PT Time Excelindo",
    description:
      "Worked as a Data Scientist through the Kampus Merdeka program, focusing on data analysis and data-driven feature development for HR tools. Performed data processing, analysis, and visualization related to employee attendance, shift patterns, leave and overtime records, and employee performance assessments to support operational and decision-making processes.",
    icon: React.createElement(CgWorkAlt),
    date: "Aug 2021 - Feb 2022",
  },
] as const;

export const projectsData = [
  {
    title: "Sistem Informasi Logistik CGN",
    description:
      "The CGN Logistics Information System is a digital platform that integrates inventory management, inventory control, delivery monitoring, and logistics performance analysis to maximize the efficiency of CGN's logistics operations. The system also provides high security and an intuitive user interface.",
    screenshots: [
      "images/project/cekresi/1.png",
      "images/project/cekresi/3.png",
      "images/project/cekresi/4.png",
      "images/project/cekresi/2.png",
      "images/project/cekresi/6.png",
    ],
    image: "images/project/cekresi/1.png",
    tech: [
      "/images/icon/bootstrap.svg",
      "https://upload.wikimedia.org/wikipedia/commons/9/9a/Laravel.svg",
      "/images/icon/jquery-vertical.svg",
      "/images/icon/mysql.svg",
    ],
    demoUrl: null,
    githubUrl: null,
    features: [
      "Inventory Management: Tracks, organizes, and optimizes stock levels for efficient resource allocation.",
      "Inventory Control: Empowers precise oversight with real-time updates on stock movements for accurate decision-making.",
      "Delivery Monitoring: Offers real-time visibility into logistics, enabling proactive responses to ensure timely deliveries.",
      "Performance Analysis: Utilizes powerful analytics to gain insights, identify improvements, and enhance operational efficiency.",
    ],
    languages: ["Laravel 10", "Bootstrap 5", "MYSQL 8.0", "Jquery"],
  },
  {
    title: "E-Commerce Ikan Me",
    description:
      "This website is an innovative platform designed to assist freshwater fishermen and fish farmers in the village of Berasan Mulya in marketing their products online. We are dedicated to supporting the local economy and the conservation of natural resources.",
    screenshots: [
      "images/project/ikanme/1.png",
      "images/project/ikanme/2.png",
      "images/project/ikanme/3.png",
      "images/project/ikanme/4.png",
      // "images/project/ikanme/5.png",
      "images/project/ikanme/6.png",
    ],
    image: "images/project/ikanme/1.png",
    tech: [
      "/images/icon/bootstrap.svg",
      "https://upload.wikimedia.org/wikipedia/commons/9/9a/Laravel.svg",
      "/images/icon/jquery-vertical.svg",
      "/images/icon/mysql.svg",
    ],
    demoUrl: null,
    githubUrl: null,
    features: [
      "Online Marketplace: Provides a dedicated space for fishermen and fish farmers to create and manage their online stores, showcasing their products to a wider audience.",
      "Buy and Sell: Enables users to easily buy and sell freshwater products, fostering a vibrant online marketplace that connects local producers with consumers.",
      "Shipping and Delivery: Facilitates a streamlined shipping process, allowing sellers to arrange for the efficient and timely delivery of their products to customers.",
    ],
    languages: ["Laravel 9", "Bootstrap 5", "MYSQL 8.0", "Jquery"],
  },
  {
    title: "Match Schedule MPL Indonesia",
    description:
      "This website is a demonstration of a clone that imitates the appearance and features of the official MPL Indonesia website. It provides information similar to the actual MPL Indonesia website, including match schedules, team listings, and standings.",
    screenshots: [
      "images/project/mpl/2.png",
      "images/project/mpl/3.png",
      "images/project/mpl/4.png",
      "images/project/mpl/5.png",
    ],
    image: "images/project/mpl/1.png",
    tech: [
      "/images/icon/next-js.svg",
      "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg",
      "https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg",
      "/images/icon/framer-motion.svg",
    ],
    demoUrl: "https://mpl-id.vercel.app/",
    githubUrl: null,
    features: [
      "Match Schedules: Provides information about the schedule of matches in the MPL Indonesia league.",
      "Team Listings: Displays a list of teams participating in the MPL Indonesia league.",
      "Standings: Shows the current standings of the teams in the league, indicating their performance.",
      "Past Match Results: Displays the results and summaries of previous matches in the MPL Indonesia league.",
    ],
    languages: ["Next JS 13", "Tailwind CSS 3", "Framer Motion", "Typescript"],
  },
  {
    title: "Autogate RFID",
    description:
      "A smart autogate and parking access system based on IoT using ESP32, RFID, ultrasonic sensors, servo motor, LCD display, and web monitoring integration. This system is designed to automate vehicle entry and exit access in residential areas or parking environments using RFID card authentication.",
    screenshots: [
      "images/project/autogate/1.png",
      "images/project/autogate/2.png",
      "images/project/autogate/3.png",
      "images/project/autogate/ur.png",
      "images/project/autogate/5.png",
      "images/project/autogate/7.png",
    ],
    image: "images/project/autogate/1.png",
    tech: [
      "/images/icon/next-js.svg",
      "/images/icon/typescript.svg",
      "/images/icon/jquery-vertical.svg",
      "/images/icon/supabase.svg",
    ],
    demoUrl: null,
    githubUrl: null,
    features: [
      "RFID-based vehicle access authentication system.",
      "Automatic gate control using servo motor.",
      "Vehicle detection using ultrasonic sensors.",
      "LCD display for access status and user instructions.",
      "Buzzer and LED indicators for valid and invalid access notifications.",
      "Automatic gate closing after vehicle passes the sensor.",
      "Real-time monitoring system for vehicle entry and exit.",
      "Designed for smart parking and residential security simulation.",
      "ESP32-based IoT communication and automation.",
      "Simple prototype miniaturized using cardboard and custom road simulation.",
    ],
    languages: ["ESP32", "Arduino IDE", "C++", "React", "Supabase"],
  },
  {
    title: "Multi-Service AI Assistant Bot",
    description:
      "An intelligent, multi-purpose AI Assistant integrated with n8n workflow automation. It leverages Large Language Models (LLMs) and Vector Databases to provide contextual responses and execute actions across four core modules: Academic Information, Personal Finance Tracking, Appointment Booking, and Car Rental Management.",
    screenshots: [
      "images/project/automation-ai/1.png",
      "images/project/automation-ai/2.png",
      "images/project/automation-ai/3.png",
      "images/project/automation-ai/4.png",
    ],
    image: "images/project/automation-ai/1.png",
    tech: [
      "/images/icon/n8n.svg",
      "https://upload.wikimedia.org/wikipedia/commons/4/4d/OpenAI_Logo.svg",
      "/images/icon/supabase.svg",
      "/images/icon/postgresql.svg",
    ],
    demoUrl: null,
    githubUrl: "https://github.com/faliqulxx",
    features: [
      "Academic Information System: Retrieval-Augmented Generation (RAG) for answering campus regulations and schedules accurately using vector embeddings.",
      "Finance Tracker: Automatically logs income or expenses into the database through simple chat commands, equipped with budget alerts.",
      "Instant Booking & Car Rental: Seamless end-to-end scheduling and fleet availability check via dynamic API and database lookups.",
      "Advanced Router: n8n conditional routing logic to seamlessly direct user intents to the correct service module without overlapping.",
    ],
    languages: ["n8n", "OpenAI API", "Supabase (Vector)", "PostgreSQL"],
  },
  {
    title: "WhatsApp RAG AI Assistant Chatbot",
    description:
      "An intelligent, multi-purpose WhatsApp AI Assistant integrated with n8n workflow automation. It leverages Large Language Models (LLMs) and Vector Databases to provide contextual responses and execute actions across four core modules: Academic Information, Personal Finance Tracking, Appointment Booking, and Car Rental Management.",
    screenshots: [
      "images/project/chatbot_ai/1.png",
      "images/project/chatbot_ai/2.png",
      "images/project/chatbot_ai/3.png",
      "images/project/chatbot_ai/4.png",
      "images/project/chatbot_ai/5.png",
    ],
    image: "images/project/chatbot_ai/1.png",
    tech: [
      "/images/icon/n8n.svg",
      "https://upload.wikimedia.org/wikipedia/commons/4/4d/OpenAI_Logo.svg",
      "/images/icon/supabase.svg",
      "/images/icon/postgresql.svg",
    ],
    demoUrl: null,
    githubUrl: "https://github.com/faliqulxx",
    features: [
      "Retrieval-Augmented Generation (RAG) Implementation: Integrates academic reference documents into the LLM pipeline to provide validated, factual responses regarding campus regulations while minimizing AI hallucinations.",
      "text-embedding-3-small Vector Optimization: Leverages OpenAI's high-performance embedding model to perform precise cosine similarity searches within the vector store against user queries.",
      "WhatsApp Gateway Integration: Connects the automated AI workflow directly with a WhatsApp interface, offering students and users 24/7 responsive access to academic inquiries.",
      "n8n Workflow Orchestration: Utilizes n8n as the core backend orchestrator to seamlessly manage data routing, from handling incoming payloads to querying vector databases and dispatching final responses.",
    ],
    languages: ["n8n", "Whatsapp", "OpenAI API", "Supabase (Vector)", "PostgreSQL"],
  },
  {
    title: "HR-TOOLS",
    description:
      "This is HR TOOLS which is used to manage employee data, starting from personal data, employee performance appraisal work to the attendance system.",
    image: "images/project/hr-tools/1.png",
    screenshots: [
      "images/project/hr-tools/2.png",
      "images/project/hr-tools/3.png",
      "images/project/hr-tools/4.png",
      "images/project/hr-tools/5.png",
      "images/project/hr-tools/6.png",
    ],
    tech: [
      "/images/icon/bootstrap.svg",
      "/images/icon/leaflet.svg",
      "/images/icon/codeigniter.svg",
      "/images/icon/jquery-vertical.svg",
      "/images/icon/mysql.svg",
    ],
    demoUrl: null,
    githubUrl: null,
    features: [
      "Fixed Bug Create, Read, Update and Delete Data Employee, Siswa, and Mata Pelajaran.",
      "Create, Read, Update and Delete Employee Recruitment.",
      "Create, Read, Update and Delete Data Employee Performance appraisal.",
      "Create, Read, Update and Delete Data Employee attendance using a location with a leaflet.",
    ],
    languages: ["Codeigniter 3", "Bootstrap 3", "MYSQL 5.3", "Jquery"],
  },
  {
  title: "Cat Breed Classification",
  description:
    "A deep learning-based web application for classifying 12 cat breeds using image recognition. This project compares CNN Scratch, MobileNetV2, and ResNet50 models, with MobileNetV2 achieving the best classification performance through transfer learning.",
  image: "images/project/cat-breed/1.png",
  screenshots: [
    "images/project/cat-breed/2.png",
    "images/project/cat-breed/3.png",
    "images/project/cat-breed/4.png",
    "images/project/cat-breed/5.png",
    "images/project/cat-breed/6.png",
    "images/project/cat-breed/7.png",
  ],
  tech: [
    "/images/icon/python.svg",
    "/images/icon/tensorflow.svg",
    "/images/icon/keras.svg",
    "/images/icon/streamlit.svg",
    "/images/icon/opencv.svg",
  ],
  demoUrl: null,
  githubUrl: null,
  features: [
    "Classifies images into 12 different cat breeds using Deep Learning.",
    "Compares CNN Scratch, MobileNetV2, and ResNet50 classification models.",
    "Performs image preprocessing and data augmentation for better model generalization.",
    "Displays prediction confidence scores and probability distribution for each class.",
    "Provides interactive image upload and prediction through a Streamlit dashboard.",
    "Visualizes model performance with accuracy-loss curves and confusion matrices.",
  ],
  languages: [
    "Python",
    "TensorFlow",
    "Keras",
    "Streamlit",
    "OpenCV",
  ],
},
] as const;

export const skillsData = [
  "HTML",
  "CSS",
  "PHP",
  "JavaScript",
  "TypeScript",
  "Tailwind",
  "Bootstrap",
  "Codeigneter",
  "Laravel",
  "React",
  "MYSQL",
  "Git",
  "python",
  "cisco",
  // "Framer Motion",
] as const;

export const skilss = [
  {
    id: 2,
    imgUrl:
      "https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg",
  },
  {
    id: 3,
    imgUrl: "/images/icon/bootstrap.svg",
  },
  {
    id: 8,
    imgUrl: "https://upload.wikimedia.org/wikipedia/commons/2/27/PHP-logo.svg",
  },
  {
    id: 4,
    imgUrl: "https://upload.wikimedia.org/wikipedia/commons/9/9a/Laravel.svg",
  },
  {
    id: 5,
    imgUrl: "/images/icon/codeigniter.svg",
  },
  {
    id: 7,
    imgUrl: "/images/icon/mysql.svg",
  },

  {
    id: 9,
    imgUrl: "/images/icon/typescript.svg",
  },
  {
    id: 10,
    imgUrl: "/images/icon/javascript.svg",
  },
  {
    id: 1,
    imgUrl: "/images/icon/jquery-vertical.svg",
  },
  {
    id: 6,
    imgUrl:
      "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg",
  },
  {
    id: 11,
    imgUrl: "/images/icon/python-svgrepo-com.svg",
  },
  {
    id: 12,
    imgUrl: "/images/icon/vscode.svg",
  },
  {
    id: 13,
    imgUrl: "/images/icon/n8n.svg",
  },
  {
    id: 14,
    imgUrl: "/images/icon/postgresql.svg",
  },
  {
    id: 15,
    imgUrl: "/images/icon/windows.svg",
  },
  {
    id: 16,
    imgUrl: "/images/icon/supabase.svg",
  },
  {
    id: 16,
    imgUrl: "/images/icon/cisco.svg",
  },
  // {
  //   id: 10,
  //   imgUrl:
  //     "https://upload.wikimedia.org/wikipedia/commons/9/98/WordPress_blue_logo.svg",
  // },
] as const;
