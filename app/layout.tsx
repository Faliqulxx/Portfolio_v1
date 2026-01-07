import Header from "@/components/header";
import "./globals.css";
import { Inter } from "next/font/google";
import ActiveSectionContextProvider from "@/context/active-section-context";
import Footer from "@/components/footer";
import ThemeSwitch from "@/components/theme-switch";
import ThemeContextProvider from "@/context/theme-context";
import { Toaster } from "react-hot-toast";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({ subsets: ["latin"] });
const baseUrlMeta = `${new URL("https://faliqulisback.my.id/")}`;
export const metadata = {
  metadataBase: new URL("https://faliqulisback.my.id/"),
  title: "Faliqul Ishbah | Portfolio",
  description:
    "Faliqul Ishbah is a web developer with 2 years of experience.",
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
        className={`${inter.className} bg-gray-50 text-gray-950 relative pt-10 md:pt-36 dark:bg-gray-900 dark:text-gray-50 dark:text-opacity-90`}
      >
        <div className="bg-cyan-500 absolute top-[-6rem] -z-10 right-[11rem] h-[31.25rem] w-[31.25rem] rounded-full blur-[10rem] sm:w-[68.75rem] dark:bg-[#946263]"></div>
        <div className="bg-[#dbd7fb] absolute top-[-1rem] -z-10 left-[-35rem] h-[31.25rem] w-[50rem] rounded-full blur-[10rem] sm:w-[68.75rem] md:left-[-33rem] lg:left-[-28rem] xl:left-[-15rem] 2xl:left-[-5rem] dark:bg-[#676394]"></div>
        {/* <div className="bg-[#fbe2e3] absolute bottom-[-6rem] -z-10 left-[11rem] h-[31.25rem] w-[31.25rem] rounded-full blur-[10rem] sm:w-[68.75rem] dark:bg-[#946263]"></div>
        <div className="bg-[#dbd7fb] absolute bottom-[-1rem] -z-10 right-[-35rem] h-[31.25rem] w-[50rem] rounded-full blur-[10rem] sm:w-[68.75rem] md:right-[-33rem] lg:right-[-28rem] xl:right-[-15rem] 2xl:right-[-5rem] dark:bg-[#676394]"></div> */}

        <ThemeContextProvider>
          <ActiveSectionContextProvider>
            <Header />
            {children}
            <Footer />

            <Toaster position="top-right" />
            <ThemeSwitch />
          </ActiveSectionContextProvider>
        </ThemeContextProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
