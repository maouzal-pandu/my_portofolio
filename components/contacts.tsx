"use client";

import { useEffect, useRef, useState } from "react";
import { Mail, ArrowUpRight, Check, Copy } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa6";

const EMAIL = "maouzalpandu.work@gmail.com";

const LINKS = [
  {
    label: "GitHub",
    value: "github.com/maouzal-pandu",
    href: "http://github.com/maouzal-pandu",
    icon: FaGithub,
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/maouzal-pandu",
    href: "http://www.linkedin.com/in/maouzal-pandu/",
    icon: FaLinkedin,
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

export default function Contacts() {
  const { ref: sectionRef, visible } = useReveal<HTMLElement>();
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard gagal (misal browser lama/permission) — biarin user copy manual
    }
  };

  return (
    <section
      ref={sectionRef}
      id="contacts"
      className="scroll-mt-24 mx-5 py-24 md:py-32 border-t border-white/5"
    >
      <div className="max-w-3xl mx-auto flex flex-col items-center text-center">
        <span
          className={`font-jet-brains-mono text-xs text-[#4FD8C4] tracking-[2px] transition-all duration-700 ease-out ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          // contact.json
        </span>

        <h2
          className={`font-neue-machina text-3xl md:text-4xl mt-2 mb-4 transition-all duration-700 ease-out delay-100 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          Let&apos;s Build Something
        </h2>

        <p
          className={`text-[#726D89] text-[15px] leading-[1.7] max-w-[440px] mb-10 transition-all duration-700 ease-out delay-150 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          Open to internship, freelance, or full-time opportunities. Feel free
          to reach out — usually respond within a day.
        </p>

        {/* email, click to copy */}
        <button
          onClick={handleCopy}
          className={`group flex items-center gap-3 font-jet-brains-mono text-sm md:text-base text-[#EDEBF5] border border-[#2C2939] bg-[#1C1A28] px-5 py-3.5 rounded-md mb-10 hover:border-[#4FD8C4] transition-all duration-700 ease-out delay-200 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <Mail size={16} className="text-[#4FD8C4] shrink-0" />
          {EMAIL}
          {copied ? (
            <Check size={15} className="text-[#4FD8C4] shrink-0" />
          ) : (
            <Copy
              size={15}
              className="text-[#726D89] group-hover:text-[#EDEBF5] shrink-0 transition-colors"
            />
          )}
        </button>

        {/* link cards */}
        <div
          className={`w-full grid grid-cols-1 sm:grid-cols-2 gap-4 transition-all duration-700 ease-out delay-300 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {LINKS.map((link) => {
            const Icon = link.icon;
            return (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                className="group flex items-center justify-between gap-3 rounded-[10px] border border-[#2C2939] bg-[#1C1A28] px-5 py-4 hover:-translate-y-1 hover:border-[#4FD8C4] transition-all duration-300 ease-out"
              >
                <div className="flex items-center gap-3 text-left">
                  <Icon
                    size={20}
                    className="text-[#726D89] group-hover:text-[#4FD8C4] transition-colors shrink-0"
                  />
                  <div className="flex flex-col">
                    <span className="font-jet-brains-mono text-sm text-[#EDEBF5]">
                      {link.label}
                    </span>
                    <span className="font-jet-brains-mono text-xs text-[#726D89]">
                      {link.value}
                    </span>
                  </div>
                </div>
                <ArrowUpRight
                  size={16}
                  className="text-[#726D89] group-hover:text-[#4FD8C4] transition-colors shrink-0"
                />
              </a>
            );
          })}
        </div>

        <p
          className={`font-jet-brains-mono text-xs text-[#726D89] mt-16 transition-all duration-700 ease-out delay-[400ms] ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          © {new Date().getFullYear()} Maouzal Pandu Laksmana Widjaya
        </p>
      </div>
    </section>
  );
}
