import React from "react";
import Image from "next/image";

type SectionHeadingProps = {
  children: React.ReactNode;
};

export default function SectionHeading({ children }: SectionHeadingProps) {
  return (
    <div>
      <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-bold capitalize tracking-tight leading-tight mb-8 text-center">
        {children}
      </h2>
    </div>
  );
}
