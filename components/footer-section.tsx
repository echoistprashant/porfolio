"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export function FooterSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const barRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    const bar = barRef.current;

    if (!section || !content || !bar) {
      return;
    }

    gsap.set([content, bar], { opacity: 0, y: 30 });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          gsap.to(content, {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out"
          });

          gsap.to(bar, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: 0.12,
            ease: "power3.out"
          });

          observer.disconnect();
        });
      },
      { threshold: 0.25 }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <footer
      ref={sectionRef}
      id="contact"
      className="section-fade flex min-h-screen flex-col justify-between bg-[#0A0A0A] px-5 py-10 text-white md:px-9 md:py-12"
    >
      <div
        ref={contentRef}
        className="flex flex-1 flex-col items-center justify-center text-center"
      >
        <div className="text-[clamp(3.75rem,10vw,8.125rem)] font-extrabold uppercase leading-[0.92] tracking-[-0.03em]">
          <div>LET&apos;S BUILD</div>
          <div className="text-transparent [text-stroke:1px_rgba(255,255,255,0.4)]">
            SOMETHING GREAT
          </div>
        </div>
        <a
          href="https://cal.com/femurstudio/30min"
          target="_blank"
          rel="noreferrer"
          className="mt-10 rounded-full bg-accent px-8 py-4 text-[15px] font-bold uppercase tracking-[0.06em] text-[#0A0A0A] transition-all duration-300 hover:scale-[1.03] hover:bg-white md:px-10"
        >
          START A PROJECT &rarr;
        </a>
      </div>

      <div
        ref={barRef}
        className="flex flex-col gap-4 border-t border-[#1F1F1F] pt-5 text-[12px] uppercase tracking-[0.1em] text-[#555555] md:flex-row md:items-center md:justify-between"
      >
        <span>&copy; 2025 Femur Studio</span>
        <span>femur.studio</span>
        <span>Instagram ↗ LinkedIn ↗</span>
      </div>
    </footer>
  );
}
