"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const STATS = [
  { label: "domicile", value: "Kab. Tegal, Central Java" },
  { label: "status", value: "Student, Final Year" },
  { label: "available", value: "Part-time / Freelance / Full-time" },
];

export default function AboutMe() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reducedMotion) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect(); // cuma trigger sekali
        }
      },
      { threshold: 0.2 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about-me"
      className="scroll-mt-24 mx-5 py-24 md:py-32 border-t border-[#2C2939]"
    >
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-14 items-center">
        {/* photo card */}
        <div
          className={`flex max-w-[280px] w-full shrink-0 relative z-10 transition-all duration-700 ease-out ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <Image
            src="/images/me.jpeg"
            alt="Me"
            width={400}
            height={400}
            className="rounded-md mx-auto my-8 object-cover"
          />
        </div>

        {/* bio */}
        <div className="flex-1 flex flex-col gap-5 text-center md:text-left items-center md:items-start">
          <span
            className={`font-jet-brains-mono text-xs text-[#4FD8C4] tracking-[2px] transition-all duration-700 ease-out delay-100 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            // about-me.md
          </span>

          <h2
            className={`font-neue-machina text-3xl md:text-4xl transition-all duration-700 ease-out delay-150 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            About Me
          </h2>

          <p
            className={`text-[#726D89] text-[15px] leading-[1.7] max-w-[500px] transition-all duration-700 ease-out delay-200 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            A final-year University Harkat Negeri Computer Science student
            currently working on a thesis project: a maternal health monitoring
            app for the Balapulang subdistrict. Splitting time between Flutter
            on the frontend and FastAPI on the backend.
          </p>

          <p
            className={`text-[#726D89] text-[15px] leading-[1.7] max-w-[500px] transition-all duration-700 ease-out delay-300 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            Also have experience working with Laravel & CodeIgniter on past
            projects. I prefer tracing a bug down to its root cause through
            careful debugging, rather than just patching over the symptoms.
          </p>

          {/* stats bar, gaya terminal output */}
          <div
            className={`w-full max-w-[500px] mt-2 rounded-md border border-[#2C2939] bg-[#100F18] font-jet-brains-mono text-[12.5px] divide-y divide-[#2C2939] transition-all duration-700 ease-out delay-[400ms] ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            {STATS.map((stat) => (
              <div
                key={stat.label}
                className="flex items-center justify-between px-4 py-2.5 gap-4"
              >
                <span className="text-[#726D89] shrink-0">{stat.label}</span>
                <span className="text-[#4FD8C4] text-right">{stat.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
