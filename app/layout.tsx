import Header from "@/components/header";
import "./globals.css";
import { Inter } from "next/font/google";
import ActiveSectionContextProvider from "@/context/active-section-context";
import Footer from "@/components/footer";
import ThemeSwitch from "@/components/theme-switch";
import ThemeContextProvider from "@/context/theme-context";
import ToasterProvider from "@/components/ToasterProvider";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import LoadingScreen from "@/components/loading/LoadingScreen";
import { CVPreviewProvider } from "@/context/cv-preview-context";
import CVPreviewModal from "@/components/cv/CVPreviewModal";

const inter = Inter({ subsets: ["latin"] });
const baseUrlMeta = `${new URL("https://faliqulisback.my.id/")}`;
export const metadata = {
  metadataBase: new URL("https://faliqulisback.my.id/"),
  title: "Faliqul Ishbah | Portfolio",
  description:
    "Faliqul Ishbah is a web developer with 2 years of experience.",
  icons: {
    icon: "/favicon.svg?v=3",
    shortcut: "/favicon.svg?v=3",
    apple: "/favicon.svg?v=3",
  },
  author: "Faliqul Ishbah",
  subject: "Web Development",
  copyright: "© Faliqul Ishbah",
  keywords: [
    "Faliqul Ishbah",
    "Next.js",
    "React",
    "JavaScript",
    "Laravel",
    "Codeigniter",
    "PHP",
    "HTML",
    "Web developer",
    "coding services",
    "website development services",
    "IT assignment services",
    "Information Systems",
    "Jasa buat website",
    "joki tugas IT",
    "Joki buat website",
    "Joki Coding",
    "Joki coding jogja",
    "joki murah",
  ],
  generator: "Next.js",
  applicationName: "Faliqul Ishbah | Portfolio",
  referrer: "origin-when-cross-origin",
  colorScheme: "dark",
  creator: "Faliqul Ishbah",
  publisher: "Faliqul Ishbah",
  language: "id",
  geo: {
    country: "ID",
    placename: "Gresik",
  },
  openGraph: {
    images: [
      {
        url: `${baseUrlMeta}images/profile_2.jpg`,
        alt: "Faliqul Ishbah",
      },
      {
        url: `${baseUrlMeta}images/project/cekresi/1.png`,
        alt: "Portofolio Cek Resi CGN",
      },
      {
        url: `${baseUrlMeta}images/project/ikanme/1.png`,
        alt: "Portofolio Ikan Me",
      },
    ],
    description:
      "Faliqul Ishbah is a web developer with 2 years of experience.",
    author: "Faliqul Ishbah",
  },
  basic: {
    title: "Faliqul Ishbah - Fullstack Engineer",
    type: "website",
    image: {
      url: `${baseUrlMeta}images/profile_2.jpg`,
      alt: "Faliqul Ishbah",
    },
  },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="!scroll-smooth">
      <body
        className={`${inter.className} bg-white dark:bg-black text-gray-900 dark:text-white relative pt-10 md:pt-36 transition-colors duration-300 overflow-x-hidden`}
      >
        {/* Ambient background glow orbs — dark mode only */}
        <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden hidden dark:block">
          <div className="glow-orb-violet absolute -top-40 -left-40 w-[600px] h-[600px] opacity-30" />
          <div className="glow-orb-electric absolute -bottom-40 -right-40 w-[500px] h-[500px] opacity-20" />
        </div>

        <LoadingScreen />

        <ThemeContextProvider>
          <CVPreviewProvider>
            <ActiveSectionContextProvider>
              <Header />
              {children}
              <Footer />
              <CVPreviewModal />

              <ToasterProvider />
              <ThemeSwitch />
            </ActiveSectionContextProvider>
          </CVPreviewProvider>
        </ThemeContextProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
