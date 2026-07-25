"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import Link from "next/link";

const PROJECTS = [
  {
    title: "Maternal Health Monitoring App",
    description:
      "An app to help track and monitor the health of pregnant women in the Balapulang subdistrict. Built with a Flutter frontend and a FastAPI + SQLAlchemy backend. Use Random Forest Classifier for predicting the risk of pregnancy complications based on user anc data.",
    tags: ["Flutter", "FastAPI", "SQLAlchemy", "GetX"],
    codeUrl: "https://github.com/maouzal-pandu/frontend-skripsi-app",
  },
  {
    title: "Hearth Blade",
    description:
      "A 2D action platformer game developed using the Unity Game Engine. Players navigate through challenging levels, battling enemies and overcoming obstacles to achieve their objectives.",
    tags: ["Unity Game Engine", "C#"],
    codeUrl: "https://github.com/maouzal-pandu/Hearth_Blade",
  },
  {
    title: "E-commerce mobile app for a local business",
    description:
      "A mobile application for a local e-commerce business, allowing users to browse products, add them to a cart, and complete purchases. Built with Codeigniter for the backend and Flutter for the frontend.",
    tags: ["Codeigniter", "Flutter", "MySQL"],
    codeUrl:
      "https://github.com/maouzal-pandu/barito-selatan-ecommerce-mobile-application",
  },
  {
    title: "Ndhalang Online",
    description:
      "A web application that provides tools for helping users learn and practice how to be a dalang. It features a collection of wayang stories, wayang characters, and interactive ndhalang to help users manage their tone. Built with Next.js for the frontend and Tailwind CSS for styling.",
    tags: ["Next.js", "React", "Tailwind CSS"],
    codeUrl: "https://github.com/maouzal-pandu/Ndhalang-Online-NextJS",
  },
  {
    title: "Money Tracker App",
    description:
      "A mobile application that helps users track their income and expenses, providing insights into their financial habits. Built with Flutter for the frontend and Hive Database for local data storage.",
    tags: ["Flutter", "GetX", "Hive Database"],
    codeUrl: "https://github.com/maouzal-pandu/money-tracker",
  },
  {
    title: "Hairstyle Recommendation Mobile App",
    description:
      "A mobile application that recommends hairstyles based on user preferences and facial features. Built with Flutter for the frontend and php for the backend. Use VGG16 model for image classification to recommend suitable hairstyles.",
    tags: ["Flutter", "Firebase"],
    codeUrl: "https://github.com/maouzal-pandu/hairstyle-recommendation-app",
  },
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

export default function Projects() {
  const { ref: sectionRef, visible } = useReveal<HTMLElement>();

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="scroll-mt-24 mx-5 py-24 md:py-32 border-t border-white/5"
    >
      <div className="max-w-5xl mx-auto flex flex-col items-center md:items-start">
        <span
          className={`font-jet-brains-mono text-xs text-[#4FD8C4] tracking-[2px] transition-all duration-700 ease-out ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          // projects.ts
        </span>

        <h2
          className={`font-neue-machina text-3xl md:text-4xl mt-2 mb-10 transition-all duration-700 ease-out delay-100 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          Projects
        </h2>

        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
          {PROJECTS.map((project, i) => (
            <Link
              href={project.codeUrl || "#"}
              target="_blank"
              key={project.title}
            >
              <div
                className={`group rounded-[10px] border border-[#2C2939] bg-[#1C1A28] overflow-hidden flex flex-col transition-all duration-500 ease-out hover:-translate-y-1 hover:border-[#4FD8C4] ${
                  visible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{
                  transitionDelay: visible ? `${150 + i * 100}ms` : "0ms",
                }}
              >
                {/* content */}
                <div className="p-5 flex flex-col gap-3 flex-1">
                  <h3 className="font-jet-brains-mono text-base text-[#EDEBF5]">
                    {project.title}
                  </h3>

                  <p className="text-[#726D89] text-sm leading-[1.7] flex-1">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, tagIndex) => (
                      <span
                        key={`${project.title}-tag-${tagIndex}`}
                        className="font-jet-brains-mono text-[11px] text-[#4FD8C4] border border-[#2C2939] bg-[#15141F] px-2 py-1 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
