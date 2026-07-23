"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import { Mail, ArrowUpRight, FileCode2 } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa6";

const S = (t: string, c = "text") => ({ t, c });

// warna token, dipakai lewat inline style karena dinamis per-segment
const TOKEN_COLORS: Record<string, string> = {
  text: "#EDEBF5",
  muted: "#726D89",
  prop: "#E85A9B",
  string: "#4FD8C4",
  func: "#7DD3FC",
  keyword: "#F5A623",
};

const TABS = [
  {
    id: "about",
    label: "about.js",
    lines: [
      [S("// hai, selamat datang 👋", "muted")],
      [S("const "), S("developer", "prop"), S(" = {")],
      [
        S("  name", "prop"),
        S(": "),
        S("'Maouzal Pandu Laksmana Widjaya'", "string"),
        S(","),
      ],
      [S("  role", "prop"), S(": "), S("'Mobile Developer'", "string"), S(",")],
      [
        S("  stack", "prop"),
        S(": ["),
        S("'Flutter'", "string"),
        S(", "),
        S("'FastAPI'", "string"),
        S(", "),
        S("'React'", "string"),
        S(", "),
        S("'Laravel'", "string"),
        S(", "),
        S("'Codeigniter'", "string"),
        S("],"),
      ],
      [
        S("  currentlyBuilding", "prop"),
        S(": "),
        S("'app kesehatan ibu hamil'", "string"),
        S(","),
      ],
      [
        S("  status", "prop"),
        S(": () => "),
        S("'available for opportunities'", "string"),
      ],
      [S("};")],
      [S("")],
      [S("export default "), S("developer", "prop"), S(";")],
    ],
    run: [
      "$ node about.js",
      "✓ compiled in 38ms",
      "> status: available for opportunities",
    ],
  },
  {
    id: "skills",
    label: "skills.js",
    lines: [
      // [S("// level, jujur menurut aku sendiri", "muted")],
      [S("const "), S("skills", "prop"), S(" = {")],
      [
        S("  Flutter", "prop"),
        S("      : "),
        S("█████████░", "string"),
        S(" 9/10"),
      ],
      [
        S("  FastAPI", "prop"),
        S("      : "),
        S("███████░░░", "string"),
        S(" 7/10"),
      ],
      [
        S("  React", "prop"),
        S("        : "),
        S("████████░░", "string"),
        S(" 8/10"),
      ],
      [
        S("  Laravel", "prop"),
        S("      : "),
        S("███████░░░", "string"),
        S(" 7/10"),
      ],
      [
        S("  Codeigniter", "prop"),
        S("  : "),
        S("██████░░░░", "string"),
        S(" 6/10"),
      ],
      [
        S('  "UI/UX"', "prop"),
        S("       : "),
        S("███████░░░", "string"),
        S(" 7/10"),
      ],
      [S("};")],
    ],
    run: [
      "$ node skills.js",
      "✓ levels loaded",
      "> tip: masih terus belajar tiap hari",
    ],
  },
  {
    id: "contact",
    label: "contact.js",
    lines: [
      [S("// mari terhubung", "muted")],
      [S("const "), S("contact", "prop"), S(" = {")],
      [
        S("  email", "prop"),
        S(": "),
        S("'maouzalpandu.work@gmail.com'", "string"),
        S(","),
      ],
      [
        S("  github", "prop"),
        S(": "),
        S("'github.com/maouzal-pandu'", "string"),
        S(","),
      ],
      [
        S("  linkedin", "prop"),
        S(": "),
        S("'linkedin.com/in/maouzal-pandu'", "string"),
      ],
      [S("};")],
      [S("")],
      [
        S("contact.email && "),
        S("sendMessage", "func"),
        S("();"),
        // S("  // klik di bawah", "muted"),
      ],
    ],
    run: ["$ node contact.js", "✓ ready", "> hubungi kapan aja, aku responsif"],
  },
];

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);
  return reduced;
}

function CodeLine({
  segments,
  index,
}: {
  segments: { t: string; c: string }[];
  index: number;
}) {
  return (
    <div className="flex font-jet-brains-mono text-[13px] leading-[22px] whitespace-pre">
      <span className="w-[22px] shrink-0 select-none text-[#726D89]">
        {index + 1}
      </span>
      <span>
        {segments.map((seg, i) => (
          <span
            key={i}
            style={{ color: TOKEN_COLORS[seg.c] ?? TOKEN_COLORS.text }}
          >
            {seg.t}
          </span>
        ))}
      </span>
    </div>
  );
}

function EditorWindow() {
  const [activeTab, setActiveTab] = useState("about");
  const [revealed, setRevealed] = useState(1);
  const [runRevealed, setRunRevealed] = useState(0);
  const reducedMotion = useReducedMotion();
  const tab = TABS.find((t) => t.id === activeTab)!;

  useEffect(() => {
    if (reducedMotion) {
      setRevealed(tab.lines.length);
      setRunRevealed(tab.run.length);
      return;
    }
    setRevealed(1);
    setRunRevealed(0);
    const timer = setInterval(() => {
      setRevealed((r) => {
        if (r >= tab.lines.length) {
          clearInterval(timer);
          return r;
        }
        return r + 1;
      });
    }, 110);
    return () => clearInterval(timer);
  }, [activeTab, reducedMotion]);

  useEffect(() => {
    if (reducedMotion || revealed < tab.lines.length) return;
    const timer = setInterval(() => {
      setRunRevealed((r) => {
        if (r >= tab.run.length) {
          clearInterval(timer);
          return r;
        }
        return r + 1;
      });
    }, 260);
    return () => clearInterval(timer);
  }, [revealed, activeTab, reducedMotion]);

  return (
    <div className="w-full max-w-[480px] rounded-[10px] border border-[#2C2939] bg-[#1C1A28] overflow-hidden shadow-[0_30px_60px_-20px_rgba(0,0,0,0.6)]">
      {/* window chrome */}
      <div className="flex items-center gap-2 px-3.5 py-2.5 bg-[#221F30] border-b border-[#2C2939]">
        <span className="w-2.5 h-2.5 rounded-full bg-[#F26D6D]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#F5C563]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#69D394]" />
        <span className="ml-2 flex items-center gap-1.5 font-jet-brains-mono text-xs text-[#726D89]">
          <FileCode2 size={12} /> portfolio.jsx
        </span>
      </div>

      {/* tabs */}
      <div className="flex border-b border-[#2C2939]">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            className={`px-4 py-2.5 font-jet-brains-mono text-[12.5px] border-r border-[#2C2939] transition-colors ${
              activeTab === t.id
                ? "bg-[#15141F] text-[#4FD8C4]"
                : "bg-transparent text-[#726D89] hover:text-[#EDEBF5]"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* code body */}
      <div className="px-3.5 py-4 min-h-[252px]">
        {tab.lines.slice(0, revealed).map((seg, i) => (
          <CodeLine key={i} segments={seg} index={i} />
        ))}
      </div>

      {/* terminal strip */}
      <div className="border-t border-[#2C2939] bg-[#100F18] px-3.5 py-3 font-jet-brains-mono text-[12.5px] h-25">
        {runRevealed === 0 && <div>&nbsp;</div>}
        {tab.run.slice(0, runRevealed).map((line, i) => (
          <div
            key={i}
            className="mb-1"
            style={{
              color:
                i === 0
                  ? TOKEN_COLORS.func
                  : i === 1
                    ? TOKEN_COLORS.string
                    : TOKEN_COLORS.muted,
            }}
          >
            {line}
            {i === tab.run.length - 1 && runRevealed === tab.run.length && (
              <span className="inline-block w-[7px] h-[15px] ml-1.5 align-middle bg-[#4FD8C4] animate-blink" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div className="min-h-dvh flex flex-col">
      <Navbar />

      <div
        className="flex flex-col md:flex-row gap-10 mx-5 items-center justify-center md:justify-evenly"
        style={{ minHeight: "calc(100dvh - var(--nav-h))" }}
      >
        {/* left: identity */}
        <div className="flex flex-col gap-2.5 justify-center items-center md:justify-start md:items-start">
          {/* name */}
          <h1 className="font-neue-machina md:text-6xl text-4xl text-center md:text-left">
            Maouzal Pandu
            <br />
            Laksmana Widjaya
          </h1>

          {/* position */}
          <p className="font-space-grostek text-[#4FD8C4] font-semibold md:text-4xl text-2xl">
            Mobile Developer
          </p>

          <p className="text-[#726D89] text-center md:text-left mb-5 max-w-[420px] text-[15px] leading-[1.7]">
            Ngoding dari backend sampai UI. Suka bikin sesuatu yang nyata
            dipakai orang — bukan cuma nangkring di repo.
          </p>

          <div className="flex flex-wrap gap-3 mb-7">
            {/* projects button */}
            <a
              href="#projects"
              className="th-cta font-jet-brains-mono flex items-center gap-2 text-[13px] text-[#EDEBF5] no-underline border border-solid border-[#2C2939] bg-[#1C1A28] px-4 py-2.5 rounded-md"
            >
              $ view --projects <ArrowUpRight size={14} />
            </a>

            {/* contact button */}
            <a
              href="mailto:you@email.com"
              className="th-cta font-jet-brains-mono flex items-center gap-2 text-[13px] font-medium text-[#15141F] no-underline border border-solid border-[#4FD8C4] bg-[#4FD8C4] px-4 py-2.5 rounded-md"
            >
              $ contact --me
            </a>
          </div>

          <div className="flex gap-[18px]">
            {/* github  */}
            <a href="http://github.com/maouzal-pandu" target="_blank">
              <FaGithub
                size={19}
                className="th-icon text-[#726D89] cursor-pointer"
              />
            </a>

            {/* linkedin */}
            <a href="http://www.linkedin.com/in/maouzal-pandu/">
              <FaLinkedin
                size={19}
                className="th-icon text-[#726D89] cursor-pointer"
              />
            </a>

            <a href="mailto:maouzalpandu.work@gmail.com">
              <Mail
                size={19}
                className="th-icon text-[#726D89] cursor-pointer"
              />
            </a>
          </div>
        </div>
        {/* right: editor window */}
        <EditorWindow />
      </div>
    </div>
  );
}
