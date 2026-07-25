import Navbar from "@/components/navbar";
import Hero from "@/components/hero";
import AboutMe from "@/components/about-me";
import TechStack from "@/components/tech-stack";

export default function Home() {
  return (
    <div className="min-h-dvh flex flex-col">
      <Navbar />

      <Hero />

      <AboutMe />

      <TechStack />
    </div>
  );
}
