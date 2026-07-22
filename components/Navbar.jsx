"use client";

import Link from "next/link";
import { useState } from "react";

const links = [
  { href: "#about-me", label: "about_me.tsx" },
  { href: "#tech-stack", label: "tech_stack.tsx" },
  { href: "#projects", label: "projects.tsx" },
  { href: "#experience", label: "experience.tsx" },
  { href: "#contacts", label: "contacts.tsx" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="flex items-center justify-between md:justify-center py-5 px-2.5 bg-transparent">
      {/* navbar */}
      <div className="hidden md:flex flex gap-6 font-rubik">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="hover:-translate-y-1 transition transform duration-300"
          >
            {link.label}
          </Link>
        ))}
      </div>

      <span className="font-bold font-neue-machina md:hidden">
        <span className="text-[#55ead4]">&gt;</span>maouzal-portfolio
        <span className="text-[#55ead4] animate-blink">_</span>
      </span>

      <button
        onClick={() => setOpen(true)}
        className="md:hidden flex ml-auto hover:cursor-pointer"
      >
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/50"
          onClick={() => setOpen(false)}
        />
      )}

      {/* drawer */}
      <div
        className={`fixed top-0 right-0 w-64 h-full bg-radial-glow z-50 transform transition-transform duration-300 ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex justify-end p-4">
          <button
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="hover:cursor-pointer"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#FF474D"
              strokeWidth="3"
            >
              <path d="M6 6l12 12M6 18L18 6" />
            </svg>
          </button>
        </div>
        <div className="flex flex-col">
          <span className="font-bold font-cascadia-code px-3.5">
            my_portfolio
          </span>

          <div className="relative ml-3.5 mt-3 border-l-3 border-[#55ead4] flex flex-col">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative flex items-center py-2.5 pl-5 pr-3.5 font-cascadia-code before:content-[''] before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-3 before:h-0.5 before:bg-[#55ead4]"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
