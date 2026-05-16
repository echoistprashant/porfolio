"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const lines = [
  "We don't just build websites.",
  "We build digital muscle.",
  "Fast. Precise. Built to outlast.",
  "Between an idea and impact —",
  "that's where Femur works."
];

export function VisionSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const lineRefs = useRef<Array<HTMLParagraphElement | null>>([]);
  const titleRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const textLines = lineRefs.current.filter(Boolean);

    if (!section || !title || !textLines.length) {
      return;
    }

    gsap.set(textLines, { opacity: 0, y: 24 });
    gsap.set(title, { opacity: 0, x: 60 });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          gsap.to(textLines, {
            opacity: 1,
            y: 0,
            stagger: 0.1,
            duration: 0.8,
            ease: "power3.out"
          });

          gsap.to(title, {
            opacity: 1,
            x: 0,
            duration: 0.9,
            ease: "power3.out"
          });

          observer.disconnect();
        });
      },
      { threshold: 0.35 }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-fade noise relative flex min-h-screen items-center overflow-hidden bg-[#0A0A0A] px-5 py-24 text-white md:px-9"
    >
      <div className="relative z-10 grid w-full items-center gap-12 md:grid-cols-[1.2fr_0.8fr] md:gap-24 lg:gap-32">
        <div className="max-w-3xl justify-self-start font-mono text-[17px] leading-[1.8] text-[#CCCCCC] md:text-[18px]">
          {lines.map((line, index) => (
            <p
              key={line}
              ref={(element) => {
                lineRefs.current[index] = element;
              }}
              className="m-0"
            >
              {line}
            </p>
          ))}
        </div>
        <div
          ref={titleRef}
          className="justify-self-start text-[clamp(5rem,10vw,8.75rem)] font-extrabold uppercase leading-none tracking-[-0.04em] text-white md:justify-self-end"
        >
          VISION
        </div>
      </div>
    </section>
  );
}
