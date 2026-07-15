"use client";

import dynamic from "next/dynamic";
import { useInView } from "react-intersection-observer";
import { useActiveSectionContext } from "@/context/active-section-context";
import { useEffect } from "react";

const Masonry = dynamic(() => import("@/components/Masonry"), { ssr: false });

// Only using images confirmed to exist in /public/images/gallery/
// + picsum photos as supplemental content
const galleryItems = [
  {
    id: "1",
    img: "/images/gallery/1.png",
    height: 520,
  },
  {
    id: "2",
    img: "/images/gallery/2.png",
    height: 420,
  },
  {
    id: "3",
    img: "https://picsum.photos/id/1015/600/900",
    height: 500,
  },
  {
    id: "4",
    img: "https://picsum.photos/id/1011/600/750",
    height: 380,
  },
  {
    id: "5",
    img: "https://picsum.photos/id/1074/600/800",
    height: 460,
  },
  {
    id: "6",
    img: "https://picsum.photos/id/1043/600/700",
    height: 340,
  },
  {
    id: "7",
    img: "https://picsum.photos/id/1060/600/850",
    height: 480,
  },
  {
    id: "8",
    img: "https://picsum.photos/id/1035/600/600",
    height: 300,
  },
  {
    id: "9",
    img: "https://picsum.photos/id/1047/600/780",
    height: 420,
  },
  {
    id: "10",
    img: "https://picsum.photos/id/1018/600/900",
    height: 560,
  },
  {
    id: "11",
    img: "https://picsum.photos/id/1039/600/700",
    height: 360,
  },
  {
    id: "12",
    img: "https://picsum.photos/id/1023/600/800",
    height: 440,
  },
];

export default function GallerySection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const { setActiveSection, timeOfLastClick } = useActiveSectionContext();

  // Track active section for navbar highlight
  const { ref: trackRef, inView: trackInView } = useInView({ threshold: 0.3 });

  useEffect(() => {
    if (trackInView && Date.now() - timeOfLastClick > 1000) {
      setActiveSection("Gallery");
    }
  }, [trackInView, setActiveSection, timeOfLastClick]);

  return (
    <section
      id="gallery"
      ref={(el) => {
        (ref as React.RefCallback<HTMLElement>)(el);
        (trackRef as React.RefCallback<HTMLElement>)(el);
      }}
      className="w-full scroll-mt-28 mb-28"
    >
      {/* Heading */}
      <div
        className="mb-10 text-center"
        style={{
          opacity: inView ? 1 : 0,
          transform: inView ? "translateY(0)" : "translateY(30px)",
          transition: "opacity 0.6s ease, transform 0.6s ease",
        }}
      >
        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
          Gallery
        </h2>
        <p className="mt-2 text-gray-500 dark:text-gray-400 text-sm">
          A glimpse into moments &amp; work
        </p>
        <div className="mt-4 mx-auto w-16 h-1 rounded-full bg-gradient-to-r from-violet-500 to-indigo-500" />
      </div>

      {/* Masonry Grid — only rendered once in view to trigger GSAP entrance */}
      <div
        className="w-full min-h-[600px]"
        style={{
          opacity: inView ? 1 : 0,
          transition: "opacity 0.4s ease 0.2s",
        }}
      >
        {inView && (
          <Masonry
            items={galleryItems}
            ease="power3.out"
            duration={0.6}
            stagger={0.04}
            animateFrom="bottom"
            scaleOnHover={true}
            hoverScale={0.97}
            blurToFocus={true}
            colorShiftOnHover={true}
          />
        )}
      </div>
    </section>
  );
}
