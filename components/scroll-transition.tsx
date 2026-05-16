"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ScrollTransitionProps {
  visionSection: React.ReactNode;
  workSection: React.ReactNode;
}

export function ScrollTransition({ visionSection, workSection }: ScrollTransitionProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const workRef = useRef<HTMLDivElement | null>(null);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    setIsDesktop(mq.matches);

    const handleChange = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener("change", handleChange);
    return () => mq.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    const work = workRef.current;

    if (!container || !work) return;

    // Only activate the scroll-jacking effect on desktop
    if (!isDesktop) {
      gsap.set(work, { y: "0%" });
      return;
    }

    // Work section starts fully off-screen below
    gsap.set(work, { y: "100%" });

    const trigger = ScrollTrigger.create({
      trigger: container,
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      onUpdate: (self) => {
        const progress = Math.max(0, Math.min(1, self.progress));
        gsap.set(work, { y: `${(1 - progress) * 100}%` });
      }
    });

    return () => {
      trigger.kill();
    };
  }, [isDesktop]);

  // ── Mobile: plain stacked layout, no scroll trickery ───────────────
  if (!isDesktop) {
    return (
      <>
        {visionSection}
        {workSection}
      </>
    );
  }

  // ── Desktop: sticky Vision + sliding Work ──────────────────────────
  return (
    <div ref={containerRef} className="relative" style={{ height: "200vh" }}>
      <div className="sticky top-0 h-screen overflow-hidden">
        {visionSection}
        <div
          ref={workRef}
          className="absolute inset-0 will-change-transform"
          style={{ top: 0, left: 0, right: 0, bottom: 0, zIndex: 10, backgroundColor: "#ffffff" }}
        >
          {workSection}
        </div>
      </div>
    </div>
  );
}
