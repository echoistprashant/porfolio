"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const processSteps = [
  {
    number: "01",
    title: "Call Out The Real Problem",
    description:
      "We do not start by decorating a vague idea. First we figure out what is actually broken: the offer, the flow, the handoff, or the way your business is being perceived."
  },
  {
    number: "02",
    title: "Decide What Needs Building",
    description:
      "Sometimes you need a site. Sometimes you need a CRM, automation, or a better internal system. We scope the thing that fixes the bottleneck, not the thing that sounds trendy on a call."
  },
  {
    number: "03",
    title: "Build The Whole Machine",
    description:
      "Design and development happen together. The front end, the backend logic, the admin flow, and the edge cases get built like one system instead of four freelancers passing files around."
  },
  {
    number: "04",
    title: "Stay Until It Works",
    description:
      "We QA, tighten, test, and ship. If it still needs babysitting after launch, it is not done. The job is finished when it runs cleanly and your team knows how to use it."
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

    const ctx = gsap.context(() => {
      gsap.set(title, { opacity: 0, y: 24 });
      gsap.set(steps, { opacity: 0, y: 40 });

      gsap.to(title, {
        opacity: 1,
        y: 0,
        duration: 0.75,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 75%",
          once: true
        }
      });

      gsap.to(steps, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 70%",
          once: true
        }
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-fade relative overflow-hidden border-t border-white/10 bg-[#0A0A0A] px-5 py-[7.5rem] text-[#F3F0EA] md:px-9 md:py-[7.5rem]"
      style={{ fontFamily: "var(--font-fallback), sans-serif" }}
    >
      <div className="relative z-10 mx-auto flex w-full max-w-[1440px] flex-col gap-14 lg:gap-16">
        <div
          ref={titleRef}
          className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(320px,420px)] lg:items-center lg:gap-16"
        >
          <div className="max-w-[920px]">
            <p className="mb-5 text-[11px] font-normal uppercase tracking-[0.32em] text-white/40">
              How Femur Works
            </p>
            <h2 className="max-w-[10ch] text-[clamp(3.25rem,7vw,5rem)] font-extrabold uppercase leading-[0.95] tracking-[-0.06em] text-white">
              We Do Not
              <br />
              Wing It
            </h2>
          </div>
          <p className="max-w-[400px] text-[16px] font-normal leading-[1.6] text-white/65 lg:justify-self-end">
            You are not hiring Femur for vague creative energy. You are hiring a founder-led team
            that can diagnose the mess, build the right system, and stay in the room until the
            thing actually works.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {processSteps.map((step, index) => (
            <div
              key={step.number}
              ref={(element) => {
                stepRefs.current[index] = element;
              }}
              className="flex min-h-[320px] flex-col rounded-[4px] border border-white/[0.07] bg-[#111111] p-8 transition duration-300 ease-in-out hover:-translate-y-1 hover:border-white/20"
            >
              <span className="text-[11px] font-normal uppercase tracking-[0.32em] text-white/30">
                {step.number}
              </span>
              <h3 className="mt-10 max-w-[14ch] text-[20px] font-semibold uppercase leading-[1] tracking-[-0.03em] text-white">
                {step.title}
              </h3>
              <p className="mt-5 max-w-[32ch] text-[14px] font-normal leading-[1.7] text-white/55">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
