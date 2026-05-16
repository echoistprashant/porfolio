"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const capabilities = [
  {
    title: "Brand-Led Websites",
    description:
      "Distinct marketing sites and premium portfolios shaped around perception, clarity, and conversion."
  },
  {
    title: "Product Systems",
    description:
      "Dashboards, internal tools, and custom platforms built to make complex operations easier to run."
  },
  {
    title: "Automation Layers",
    description:
      "Workflow systems that reduce manual overhead across outreach, support, QA, and internal handoffs."
  },
  {
    title: "Launch Support",
    description:
      "Polish, QA, iteration, and structured follow-through so the final release feels considered, not rushed."
  }
];

export function CapabilitiesSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const introRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<Array<HTMLElement | null>>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const intro = introRef.current;
    const cards = cardRefs.current.filter(Boolean);

    if (!section || !intro || !cards.length) {
      return;
    }

    gsap.set(intro, { opacity: 0, y: 30 });
    gsap.set(cards, { opacity: 0, y: 40 });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          gsap.to(intro, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out"
          });

          gsap.to(cards, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            delay: 0.12,
            ease: "power3.out"
          });

          observer.disconnect();
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-fade bg-[#F5F0EB] px-5 py-20 text-[#0A0A0A] md:px-9 md:py-28"
    >
      <div className="mx-auto flex w-full max-w-[1320px] flex-col gap-14 md:gap-16">
        <div
          ref={introRef}
          className="grid gap-8 md:grid-cols-[0.9fr_1.1fr] md:items-end"
        >
          <div>
            <p className="mb-3 text-[11px] uppercase tracking-[0.28em] text-[#777777]">
              What We Add
            </p>
            <h2 className="max-w-[10ch] text-[clamp(3rem,7vw,6rem)] font-extrabold uppercase leading-[0.92] tracking-[-0.04em]">
              More Than A Pretty Front Page
            </h2>
          </div>
          <p className="max-w-2xl text-[15px] leading-7 text-[#4C4C4C] md:justify-self-end md:text-[17px]">
            The current site shows attitude, but it does not yet explain the range of work.
            This section fills that gap by making Femur feel broader, more structured, and more
            trustworthy without diluting the visual tone.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {capabilities.map((item, index) => (
            <article
              key={item.title}
              ref={(element) => {
                cardRefs.current[index] = element;
              }}
              className="flex min-h-[240px] flex-col justify-between rounded-[28px] border border-black/8 bg-white px-6 py-6 md:px-7 md:py-7"
            >
              <span className="text-[11px] uppercase tracking-[0.22em] text-[#7F7F7F]">
                0{index + 1}
              </span>
              <div className="mt-10">
                <h3 className="max-w-[11ch] text-[1.75rem] font-bold uppercase leading-[0.95] tracking-[-0.03em]">
                  {item.title}
                </h3>
                <p className="mt-5 text-[14px] leading-7 text-[#5D5D5D]">
                  {item.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
