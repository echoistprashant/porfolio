"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const processSteps = [
  {
    number: "01",
    title: "Discover",
    description:
      "Clarify goals, audience, offer, and the exact friction points the site or product needs to solve."
  },
  {
    number: "02",
    title: "Shape",
    description:
      "Translate that strategy into direction: structure, visual language, messaging hierarchy, and interaction choices."
  },
  {
    number: "03",
    title: "Build",
    description:
      "Design and development move together so the final output stays fast, precise, and consistent."
  },
  {
    number: "04",
    title: "Refine",
    description:
      "QA, feedback, launch support, and post-handoff polish so the work lands cleanly in the real world."
  }
];

export function ProcessSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const titleRef = useRef<HTMLDivElement | null>(null);
  const stepRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const steps = stepRefs.current.filter(Boolean);

    if (!section || !title || !steps.length) {
      return;
    }

    gsap.set(title, { opacity: 0, x: 40 });
    gsap.set(steps, { opacity: 0, y: 36 });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          gsap.to(title, {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: "power3.out"
          });

          gsap.to(steps, {
            opacity: 1,
            y: 0,
            duration: 0.75,
            stagger: 0.1,
            delay: 0.1,
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
      className="section-fade noise relative overflow-hidden bg-[#0A0A0A] px-5 py-20 text-white md:px-9 md:py-28"
    >
      <div className="relative z-10 mx-auto flex w-full max-w-[1320px] flex-col gap-14 md:gap-16">
        <div
          ref={titleRef}
          className="grid gap-8 md:grid-cols-[0.85fr_1.15fr] md:items-end"
        >
          <div className="text-[clamp(3rem,7vw,6rem)] font-extrabold uppercase leading-[0.92] tracking-[-0.04em]">
            Process
          </div>
          <p className="max-w-2xl text-[15px] leading-7 text-white/68 md:justify-self-end md:text-[17px]">
            A stronger portfolio also needs operational clarity. This section shows that Femur has
            a repeatable way of working, not just a moodboard and a contact button.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {processSteps.map((step, index) => (
            <div
              key={step.number}
              ref={(element) => {
                stepRefs.current[index] = element;
              }}
              className="rounded-[28px] border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm"
            >
              <div className="mb-10 flex items-center justify-between gap-4">
                <span className="text-[11px] uppercase tracking-[0.24em] text-white/40">
                  {step.number}
                </span>
                <span className="h-px flex-1 bg-white/10" />
              </div>
              <h3 className="text-[1.8rem] font-bold uppercase leading-none tracking-[-0.03em]">
                {step.title}
              </h3>
              <p className="mt-5 text-[14px] leading-7 text-white/65">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
