"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const loaderColors = ["#FF3B3B", "#F0FF44", "#3BFF8A", "#3B8AFF", "#FF8C3B", "#FFFFFF"];

type IntroLoaderProps = {
  onComplete: () => void;
};

export function IntroLoader({ onComplete }: IntroLoaderProps) {
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const wordRef = useRef<HTMLSpanElement | null>(null);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const overlay = overlayRef.current;
    const word = wordRef.current;

    if (!overlay || !word) {
      return;
    }

    const timeline = gsap.timeline({
      onComplete: () => {
        onComplete();
        setTimeout(() => setHidden(true), 50);
      }
    });

    loaderColors.forEach((color) => {
      timeline.to(word, {
        color,
        duration: 0.225,
        ease: "none"
      });
    });

    timeline
      .to(word, {
        color: "#FFFFFF",
        duration: 0.05,
        ease: "none"
      })
      .to(overlay, {
        opacity: 0,
        duration: 0.6,
        ease: "power2.out"
      });

    return () => {
      timeline.kill();
    };
  }, [onComplete]);

  if (hidden) {
    return null;
  }

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#0A0A0A]"
    >
      <span
        ref={wordRef}
        className="text-[clamp(5rem,18vw,14rem)] font-extrabold uppercase tracking-[-0.05em] text-white"
      >
        FEMUR
      </span>
    </div>
  );
}
