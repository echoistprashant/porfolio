"use client";

import { useEffect, useState } from "react";

import { CapabilitiesSection } from "@/components/capabilities-section";
import { FaqSection } from "@/components/faq-section";
import { FooterSection } from "@/components/footer-section";
import { HeroSection } from "@/components/hero-section";
import { IntroLoader } from "@/components/intro-loader";
import { ProcessSection } from "@/components/process-section";
import { VisionSection } from "@/components/vision-section";
import { ScrollTransition } from "@/components/scroll-transition";
import { WorkSection } from "@/components/work-section";

export default function Home() {
  const [hasLoaded, setHasLoaded] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("theme-dark", darkMode);

    return () => {
      document.body.classList.remove("theme-dark");
    };
  }, [darkMode]);

  return (
    <>
      <IntroLoader onComplete={() => setHasLoaded(true)} />
      <main className="min-h-screen bg-canvas text-ink">
        <HeroSection
          darkMode={darkMode}
          onToggleDarkMode={() => setDarkMode((current) => !current)}
          ready={hasLoaded}
        />
        <ScrollTransition
          visionSection={<VisionSection />}
          workSection={<WorkSection />}
        />
        <CapabilitiesSection />
        <ProcessSection />
        <FaqSection />
        <FooterSection />
      </main>
    </>
  );
}
