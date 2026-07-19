import React from "react";
import { CgWorkAlt } from "react-icons/cg";
import { FaReact } from "react-icons/fa";
import { LuGraduationCap } from "react-icons/lu";
import wartafenoImg from "@/public/images/project/wartefeno/1.png";
import autogateImg from "@/public/images/project/autogate/1.png";
import amikomImg from "@/public/images/project/amikom/1.png";
import hrtoolsImg from "@/public/images/project/hr-tools/1.png";

// ─── PERSONAL / PROFILE ──────────────────────────────────────────────────────
export const personalData = {
  name: "Faliqul Ishbah",
  nickname: "Faliq",
  title: "Data Scientist & AI Automation Engineer",
  location: "Gresik, Indonesia",
  email: "faliqul.isback@gmail.com",
  profileImage: "/images/profile2.png",
  cvUrl: "/cv/resumev3.pdf",
  bio: "Hello, I'm Faliq! My primary interests and expertise are in Data Science, supported by skills in Data Analysis, AI Automation, and Internet of Things (IoT). I have experience in data processing, data analysis, data visualization, and machine learning, transforming raw data into valuable insights using Python, Pandas, Scikit-learn, and SQL. In the field of AI Automation, I design and develop automated workflows using n8n, integrate RESTful APIs, and automate data pipelines to improve operational efficiency. I also have a strong interest and hands-on experience in developing IoT systems, sensor-based device monitoring, and implementing smart technologies for livestock farming and smart agriculture. My goal is to create impactful data-driven, AI-powered, and IoT-based solutions through innovative automation that delivers real-world value.",
  expertise: [
    "Data Science",
    "Data Analysis",
    "AI Automation",
    "Internet of Things (IoT)",
    "Frontend Development",
  ],
  tools: ["React", "n8n", "Python", "SQL"],
} as const;

// ─── SOCIAL / CONTACT ────────────────────────────────────────────────────────
export const contactData = {
  email: "faliqul.isback@gmail.com",
  linkedin: "https://www.linkedin.com/in/faliqulishbah/",
  github: "https://github.com/Faliqulxx",
  instagram: "https://www.instagram.com/Faliqulx/",
} as const;

// ─── CERTIFICATES ────────────────────────────────────────────────────────────
export const certificatesData = [
  {
    name: "Cisco Packet Tracer / Networking",
    image: "/images/certificate/ciscop.jpg",
    issuer: "Cisco",
  },
  {
    name: "Udemy Course Certificate #1",
    image: "/images/certificate/udemy.jpg",
    issuer: "Udemy",
  },
  {
    name: "Udemy Course Certificate #2",
    image: "/images/certificate/udemy1.jpg",
    issuer: "Udemy",
  },
  {
    name: "Dicoding Certificate #1",
    image: "/images/certificate/dicoding.jpg",
    issuer: "Dicoding",
  },
  {
    name: "Dicoding Certificate #2",
    image: "/images/certificate/dicoding1.jpg",
    issuer: "Dicoding",
  },
  {
    name: "ITS Certificate",
    image: "/images/certificate/its.png",
    issuer: "Institut Teknologi Sepuluh Nopember (ITS)",
  },
  {
    name: "Meta Certificate",
    image: "/images/certificate/meta.png",
    issuer: "Meta",
  },
] as const;

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
    category: ["web"],
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
    category: ["web"],
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
    category: ["web"],
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
    category: ["data", "web"],
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
    category: ["data"],
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
    category: ["data"],
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
    title: "Cat Breed Classification (Streamlit)",
    category: ["data", "web"],
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
    githubUrl: "https://github.com/Faliqulxx/UAP_Machine_Learning",
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
  {
    title: "HR-TOOLS",
    category: ["web"],
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
    title: "Cat Breed Classification (React)",
    category: ["data", "web"],
    description:
      "A deep learning-based image classification system that identifies 12 different cat breeds. The project compares CNN Scratch, MobileNetV2, and ResNet50 models, with MobileNetV2 achieving the best performance at 82% accuracy. The trained model is deployed through an interactive web dashboard that allows users to upload cat images and receive breed predictions with confidence scores.",
    image: "images/project/cat-breed-classification/1.png",
    screenshots: [
      "images/project/cat-breed-classification/2.png",
      "images/project/cat-breed-classification/3.png",
      "images/project/cat-breed-classification/4.png",
    ],
    tech: [
      "/images/icon/react.svg",
      "/images/icon/vite.svg",
      "/images/icon/tailwindcss.svg",
      "/images/icon/fastapi.svg",
      "/images/icon/python.svg",
      "/images/icon/tensorflow.svg",
    ],
    demoUrl: "https://cat-breed-classification.vercel.app/",
    githubUrl: "https://github.com/Faliqulxx/Cat-Breed-Classification",
    features: [
      "Classifies images into 12 different cat breeds.",
      "Compares CNN Scratch, MobileNetV2, and ResNet50 models.",
      "Uses transfer learning with MobileNetV2 and ResNet50.",
      "MobileNetV2 achieved the best performance with 82% accuracy.",
      "Upload cat images directly through the interactive web dashboard.",
      "Displays predicted cat breed with a confidence score.",
      "Shows sorted prediction probabilities for all available classes.",
      "Includes model evaluation using accuracy, precision, recall, and F1-score.",
      "Provides confusion matrix and accuracy-loss visualizations.",
      "Interactive and responsive dashboard with smooth animations.",
      "FastAPI backend for serving machine learning predictions.",
    ],
    languages: [
      "Python",
      "TensorFlow",
      "Keras",
      "FastAPI",
      "React",
      "Vite",
      "Tailwind CSS",
      "Framer Motion",
    ],
  },
  {
    title: "AI UI Chat",
    category: ["web"],
    description:
      "A modern AI chatbot interface inspired by today's leading conversational AI platforms. Designed with a clean, responsive, and user-friendly experience featuring real-time messaging, conversation history, prompt suggestions, and an elegant dark theme.",
    image: "images/project/ai-ui-chat/1.png",
    screenshots: [
      "images/project/ai-ui-chat/2.png",
      "images/project/ai-ui-chat/3.png",
      "images/project/ai-ui-chat/4.png",
      "images/project/ai-ui-chat/5.png",
      "images/project/ai-ui-chat/6.png",
      "images/project/ai-ui-chat/7.png",
    ],
    tech: [
      "/images/icon/nextjs.svg",
      "/images/icon/react.svg",
      "/images/icon/typescript.svg",
      "/images/icon/tailwindcss.svg",
      "/images/icon/shadcnui.svg",
    ],
    demoUrl: null,
    githubUrl: "https://github.com/Faliqulxx/AI-uiChat",
    features: [
      "Modern AI chatbot interface inspired by ChatGPT and Gemini.",
      "Real-time chat conversation with streaming message animation.",
      "Conversation history with easy chat management.",
      "Prompt suggestions and empty-state experience for new users.",
      "Responsive layout optimized for desktop, tablet, and mobile.",
      "Dark mode interface with smooth animations.",
      "Loading, typing, and error states for a realistic AI chat experience.",
      "Reusable and scalable component architecture.",
      "Clean UI built with accessibility and performance in mind.",
      "Prepared for future integration with AI APIs such as OpenAI or Gemini.",
    ],
    languages: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "shadcn/ui",
      "Framer Motion",
    ],
  },
  {
    title: "Coffee Cafe",
    category: ["web"],
    description:
      "A modern coffee shop landing page designed to showcase coffee products, featured menus, company profile, and contact information. Built with a responsive, visually engaging interface and smooth user experience across all devices.",
    image: "images/project/coffee-cafe/1.png",
    screenshots: [
      "images/project/coffee-cafe/2.png",
      "images/project/coffee-cafe/3.png",
      "images/project/coffee-cafe/4.png",
      "images/project/coffee-cafe/5.png",
      "images/project/coffee-cafe/6.png",
    ],
    tech: [
      "/images/icon/html5.svg",
      "/images/icon/css3.svg",
      "/images/icon/javascript.svg",
      "/images/icon/bootstrap.svg",
    ],
    demoUrl: null,
    githubUrl: "https://github.com/Faliqulxx/coffe-caf",
    features: [
      "Modern and responsive coffee shop landing page.",
      "Interactive hero section with engaging call-to-action.",
      "Featured coffee menu and product showcase.",
      "About section introducing the coffee shop and its story.",
      "Gallery section displaying coffee products and café atmosphere.",
      "Contact section with location and social media links.",
      "Smooth scrolling navigation and responsive mobile menu.",
      "Optimized layout for desktop, tablet, and mobile devices.",
      "Clean UI with reusable components and maintainable structure.",
      "Fast loading static website with responsive design principles.",
    ],
    languages: [
      "HTML5",
      "CSS3",
      "JavaScript",
      "Bootstrap",
    ],
  },
  {
    title: "POS (Point of Sale)",
    category: ["web"],
    description:
      "A modern Point of Sale (POS) web application designed to simplify sales transactions, product management, inventory tracking, and business operations. Built with a responsive interface to provide an efficient and user-friendly experience for cashiers and store owners.",
    image: "images/project/pos/1.png",
    screenshots: [
      "images/project/pos/2.png",
      "images/project/pos/3.png",
      "images/project/pos/4.png",
      "images/project/pos/5.png",
    ],
    tech: [
      "/images/icon/next-js.svg",
      "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg",
      "/images/icon/typescript.svg",
      "https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg",
      "/images/icon/framer-motion.svg",
    ],
    demoUrl: null,
    githubUrl: "https://github.com/Faliqulxx/POS-point-of-sale",
    features: [
      "Dashboard with business overview and sales statistics.",
      "Product management with categories and inventory tracking.",
      "Fast cashier interface for creating sales transactions.",
      "Shopping cart with quantity adjustment and discount support.",
      "Order history and transaction management.",
      "Customer management for storing customer information.",
      "Responsive design optimized for desktop, tablet, and mobile devices.",
      "Reusable component architecture for scalability and maintainability.",
      "Modern UI with loading, empty, and error states.",
      "Prepared architecture for future backend and CMS integration.",
    ],
    languages: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "shadcn/ui",
      "Framer Motion",
    ],
  },
  {
    title: "Digital Wedding Invitations",
    category: ["web"],
    description:
      "A modern digital wedding invitation platform that allows couples to share elegant online invitations with RSVP, event information, photo gallery, love story, countdown timer, gift section, and responsive design for all devices.",
    image: "images/project/digital-wedding-invitations/1.png",
    screenshots: [
      "images/project/digital-wedding-invitations/2.png",
      "images/project/digital-wedding-invitations/3.png",
      "images/project/digital-wedding-invitations/4.png",
      "images/project/digital-wedding-invitations/5.png",
      "images/project/digital-wedding-invitations/6.png",
    ],
    tech: [
      "/images/icon/next-js.svg",
      "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg",
      "/images/icon/typescript.svg",
      "https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg",
      "/images/icon/framer-motion.svg",
    ],
    demoUrl: null,
    githubUrl: "https://github.com/Faliqulxx/digital-wedding-invitations",
    features: [
      "Beautiful and responsive landing page for digital wedding invitations.",
      "Interactive countdown timer until the wedding ceremony.",
      "Bride & groom profile with love story timeline.",
      "Event schedule with integrated Google Maps location.",
      "Photo gallery with smooth animations and lightbox preview.",
      "RSVP section for guest attendance confirmation.",
      "Digital gift and bank account information.",
      "Background music with play/pause controls.",
      "Guest name personalization through URL parameters.",
      "Optimized performance, accessibility, and mobile-first design.",
    ],
    languages: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "shadcn/ui",
      "Framer Motion",
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

// ─── EDUCATION ───────────────────────────────────────────────────────────────
// Field keterangan:
//   level       : jenjang pendidikan (SD / SMP / SMA / S1 / dll.)
//   degree      : nama gelar / program (tampil sebagai judul besar & bold)
//   institution : nama sekolah / universitas
//   field       : jurusan / bidang studi (opsional, kosongkan "" jika tidak ada)
//   location    : kota, provinsi, negara
//   year        : periode tahun (misal "2021 – Sekarang")
//   gpa         : nilai IPK / rata-rata (opsional, kosongkan "" jika tidak ingin ditampilkan)
//   gpaMax      : skala maksimal GPA (default "4.00")
//   logo        : path ke logo sekolah di folder /public
//   description : deskripsi singkat (dipakai oleh AI assistant)
//   details     : list poin tambahan yang muncul saat "Show Details" diklik (opsional)
export const educationData = [
  {
    level: "SD",
    degree: "Primary school",
    institution: "SDN Sidorukun 1",
    field: "Natural Sciences",
    location: "Gresik, Jawa Timur, Indonesia",
    year: "2009 – 2014",
    gpa: "90.5",
    gpaMax: "100",
    logo: "/images/education/islamiyah.png",
    description: "Pendidikan dasar di SDN Sidorukun 1 Gresik.",
    details: [],
  },
  {
    level: "SMP",
    degree: "Junior High School",
    institution: "SMPN 4 Gresik",
    field: "Natural Sciences",
    location: "Gresik, Jawa Timur, Indonesia",
    year: "2014 – 2017",
    gpa: "80",
    gpaMax: "100",
    logo: "/images/education/islamiyah.png",
    description: "Pendidikan menengah pertama di SMPN 4 Gresik.",
    details: [],
  },
  {
    level: "SMA",
    degree: "High School",
    institution: "Modern Islamic Boarding School Darussalam Gontor",
    field: "Natural Sciences",
    location: "Ponorogo, Jawa Timur, Indonesia",
    year: "2017 – 2021",
    gpa: "8.80",
    gpaMax: "10",
    logo: "/images/education/virtuous.png",
    description: "Pendidikan menengah atas jurusan IPA di SMAN 1 Gresik.",
    details: ["Focused on foundational science and basic statistics at PMDG (Pondok Moderen Darussalam Gontor), I balanced my studies with comprehensive Islamic religious education. This combination helped me develop analytical, disciplined, and structured problem-solving skills, alongside a strong ethical foundation ready to be applied in a professional environment."],
  },
  {
    level: "S1",
    degree: "Bachelor of Computer Science",
    institution: "University of Muhammadiyah Malang",
    field: "Informatics Engineering",
    location: "Malang, Jawa Timur, Indonesia",
    year: "2021 – 2026",
    gpa: "3.85",
    gpaMax: "4.00",
    logo: "/images/education/logoumm.png",
    description:
      "Menempuh pendidikan S1 Teknik Informatika di Universitas Muhammadiyah Gresik dengan IPK 3.65/4.00. Fokus pada Kecerdasan Buatan, Data Science, dan Pengembangan Perangkat Lunak.",
    details: [
      "Focused on business intelligence, statistics, and machine learning, I specialized in Data Science within the Informatics Engineering program at the University of Muhammadiyah Malang. This rigorous academic path enabled me to develop strong competencies in end-to-end data handling, advanced analytics, and predictive modeling, culminating in graduating with a perfect 3.65/4.00 GPA"
    ],
  },

] as const;

// ─── GALLERY ─────────────────────────────────────────────────────────────────
export const galleryData = [
  {
    src: "/images/gallery/1.png",
    caption: "Gallery Photo 1",
  },
  {
    src: "/images/gallery/2.png",
    caption: "Gallery Photo 2",
  },
  {
    src: "/images/gallery/3.jpg",
    caption: "Gallery Photo 3",
  },
  {
    src: "/images/gallery/4.jpg",
    caption: "Gallery Photo 4",
  },
  {
    src: "/images/gallery/5.jpg",
    caption: "Gallery Photo 5",
  },
  {
    src: "/images/gallery/6.jpg",
    caption: "Gallery Photo 6",
  },
] as const;