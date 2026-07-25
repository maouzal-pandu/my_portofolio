"use client";

import { useEffect, useRef, useState } from "react";

const EXPERIENCE = [
  {
    role: "Undergraduate Thesis — Maternal Health Monitoring Application",
    org: "University Harkat Negeri Tegal",
    period: "2025 — Present",
    points: [
      "Designing and building a Flutter + FastAPI app to monitor pregnant women's health in the Balapulang subdistrict.",
      "Handling both frontend (GetX state management) and backend (FastAPI + SQLAlchemy).",
    ],
  },
  {
    role: "Internship — E-commerce Mobile Application",
    org: "PT. Technophoria Indonesia",
    period: "October 2025 — December 2025",
    points: [
      "Developing an e-commerce mobile application for South Barito, Central Kalimantan using Flutter.",
      "Optimizing the app's performance so that it runs well on low-end devices.",
      "Creating a REST API using CodeIgniter to support the mobile application.",
    ],
  },
  {
    role: "Capstone Project — Expense and Income Tracker Application",
    org: "University Harkat Negeri Tegal",
    period: "January 2025 — July 2025",
    points: [
      "Developed a Flutter application to track expenses and income for students, using OCR technology to scan receipts and automatically calculate expenses.",
    ],
  },
  {
    role: "Capstone Project — Hairstyle Recommendation Application",
    org: "University Harkat Negeri Tegal",
    period: "July 2024 — December 2024",
    points: [
      "Developed a Flutter application that recommends hairstyles based on face shape and hair type, using VGG16 to analyze user photos and provide personalized recommendations.",
    ],
  },
];

const EDUCATION = [
  {
    role: "D4 Computer Science",
    org: "University Harkat Negeri Tegal",
    period: "2022 — Present",
    points: [
      "Currently pursuing a Bachelor's degree in Computer Science at University Harkat Negeri Tegal, with a focus on Mobile App Development.",
    ],
  },
];

function useReveal<T extends HTMLElement>(threshold = 0.1) {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, visible };
}

function Timeline({
  items,
  visible,
  baseDelay = 0,
}: {
  items: typeof EXPERIENCE;
  visible: boolean;
  baseDelay?: number;
}) {
  return (
    <div className="w-full relative pl-6 border-l border-[#2C2939]">
      {items.map((item, i) => (
        <div
          key={`${item.role}-${i}`}
          className={`relative pb-12 last:pb-0 transition-all duration-500 ease-out ${
            visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-6"
          }`}
          style={{
            transitionDelay: visible ? `${baseDelay + i * 120}ms` : "0ms",
          }}
        >
          {/* commit dot */}
          <span className="absolute -left-[29px] top-1 w-3 h-3 rounded-full bg-[#15141F] border-2 border-[#4FD8C4]" />

          <p className="font-jet-brains-mono text-xs text-[#726D89] mb-1.5">
            {item.period}
          </p>

          <h3 className="font-jet-brains-mono text-base text-[#EDEBF5] mb-0.5">
            {item.role}
          </h3>

          <p className="font-jet-brains-mono text-sm text-[#4FD8C4] mb-3">
            {item.org}
          </p>

          <ul className="flex flex-col gap-1.5">
            {item.points.map((point, pIndex) => (
              <li
                key={pIndex}
                className="text-[#726D89] text-sm leading-[1.7] flex gap-2"
              >
                <span className="text-[#4FD8C4] shrink-0">·</span>
                {point}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default function Experience() {
  const { ref: sectionRef, visible } = useReveal<HTMLElement>();

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="scroll-mt-24 mx-5 py-24 md:py-32 border-t border-white/5"
    >
      <div className="max-w-3xl mx-auto flex flex-col items-center md:items-start">
        <span
          className={`font-jet-brains-mono text-xs text-[#4FD8C4] tracking-[2px] transition-all duration-700 ease-out ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          // git log --oneline --graph
        </span>

        <h2
          className={`font-neue-machina text-3xl md:text-4xl mt-2 mb-14 transition-all duration-700 ease-out delay-100 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          Experience
        </h2>

        {/* work experience */}
        <p
          className={`font-jet-brains-mono text-sm text-[#726D89] mb-5 transition-all duration-700 ease-out ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{ transitionDelay: "150ms" }}
        >
          &gt; work
        </p>
        <Timeline items={EXPERIENCE} visible={visible} baseDelay={200} />

        {/* education */}
        <p
          className={`font-jet-brains-mono text-sm text-[#726D89] mt-14 mb-5 transition-all duration-700 ease-out ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{ transitionDelay: "300ms" }}
        >
          &gt; education
        </p>
        <Timeline items={EDUCATION} visible={visible} baseDelay={350} />
      </div>
    </section>
  );
}
