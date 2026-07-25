"use client";

import Link from "next/link";
import { useState } from "react";

const links = [
  { href: "#about-me", label: "About Me" },
  { href: "#tech-stack", label: "Tech Stack" },
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#contacts", label: "Contacts" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="flex items-center justify-between md:justify-center py-3 px-2.5 bg-transparent">
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
          <div className="relative ml-3.5 mt-3 flex flex-col">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group relative flex items-center py-2.5 pl-5 pr-3.5 font-rubik hover:translate-x-2.5 transition transition-transform duration-300"
                onClick={() => setOpen(false)}
              >
                <span className="group-hover:flex hidden mr-1 font-jet-brains-mono text-[#55ead4]">
                  &gt;
                </span>
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
