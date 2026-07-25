"use client";

import { useEffect, useRef, useState } from "react";
import {
  SiFlutter,
  SiFastapi,
  SiReact,
  SiLaravel,
  SiPhp,
  SiCodeigniter,
  SiFigma,
  SiDart,
  SiPython,
} from "react-icons/si";

const STACK = [
  { name: "Flutter", icon: SiFlutter, level: 90, category: "frontend" },
  { name: "React", icon: SiReact, level: 80, category: "frontend" },
  { name: "Figma / UI-UX", icon: SiFigma, level: 70, category: "frontend" },
  { name: "FastAPI", icon: SiFastapi, level: 70, category: "backend" },
  { name: "Laravel", icon: SiLaravel, level: 70, category: "backend" },
  { name: "CodeIgniter", icon: SiCodeigniter, level: 60, category: "backend" },
  { name: "Dart", icon: SiDart, level: 85, category: "language" },
  { name: "Python", icon: SiPython, level: 70, category: "language" },
  { name: "PHP", icon: SiPhp, level: 70, category: "language" },
];

const CATEGORIES: { id: string; label: string }[] = [
  { id: "frontend", label: "frontend" },
  { id: "backend", label: "backend" },
  { id: "language", label: "language" },
];

function useReveal<T extends HTMLElement>(threshold = 0.15) {
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

export default function TechStack() {
  const { ref: sectionRef, visible } = useReveal<HTMLElement>();

  return (
    <section
      ref={sectionRef}
      id="tech-stack"
      className="scroll-mt-24 mx-5 py-24 md:py-32 border-t border-[#2C2939]"
    >
      <div className="max-w-5xl mx-auto flex flex-col items-center md:items-start">
        <span
          className={`font-jet-brains-mono text-xs text-[#4FD8C4] tracking-[2px] transition-all duration-700 ease-out ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          // tech-stack.json
        </span>

        <h2
          className={`font-neue-machina text-3xl md:text-4xl mt-2 mb-10 transition-all duration-700 ease-out delay-100 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          Tech Stack
        </h2>

        <div className="w-full flex flex-col gap-10">
          {CATEGORIES.map((cat, catIndex) => {
            const items = STACK.filter((s) => s.category === cat.id);
            return (
              <div key={cat.id}>
                <p
                  className={`font-jet-brains-mono text-sm text-[#726D89] mb-4 transition-all duration-700 ease-out ${
                    visible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-8"
                  }`}
                  style={{ transitionDelay: `${150 + catIndex * 80}ms` }}
                >
                  &gt; {cat.label}
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {items.map((item, i) => {
                    const Icon = item.icon;
                    return (
                      <div
                        key={item.name}
                        className={`group rounded-[10px] border border-[#2C2939] bg-[#1C1A28] p-4 flex flex-col gap-3 transition-all duration-500 ease-out hover:-translate-y-1 hover:border-[#4FD8C4] ${
                          visible
                            ? "opacity-100 translate-y-0"
                            : "opacity-0 translate-y-8"
                        }`}
                        style={{
                          transitionDelay: visible
                            ? `${200 + catIndex * 80 + i * 60}ms`
                            : "0ms",
                        }}
                      >
                        <Icon
                          size={26}
                          className="text-[#726D89] group-hover:text-[#4FD8C4] transition-colors"
                        />
                        <span className="font-jet-brains-mono text-[13px] text-[#EDEBF5]">
                          {item.name}
                        </span>

                        {/* level bar */}
                        <div className="w-full h-1.5 rounded-full bg-[#100F18] overflow-hidden">
                          <div
                            className="h-full rounded-full bg-[#4FD8C4] transition-all duration-700 ease-out"
                            style={{
                              width: visible ? `${item.level}%` : "0%",
                              transitionDelay: `${300 + catIndex * 80 + i * 60}ms`,
                            }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
