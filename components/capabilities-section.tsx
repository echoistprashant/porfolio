"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const capabilities = [
  {
    title: "Brand-Led Websites",
    description:
      "Marketing sites and portfolios built around how you want to be perceived - not templates, not themes."
  },
  {
    title: "Mobile Apps & CRMs",
    description:
      "Custom-built apps and client management systems that actually match how your business operates."
  },
  {
    title: "Automation Systems",
    description:
      "Outreach flows, lead pipelines, and internal handoffs - so your team stops doing the same thing twice."
  },
  {
    title: "End-to-End Delivery",
    description:
      "From first call to final deploy. We QA, iterate, and stay until it ships the way it should."
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

    const ctx = gsap.context(() => {
      gsap.set(intro, { opacity: 0, y: 24 });
      gsap.set(cards, { opacity: 0, y: 40 });

      gsap.to(intro, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 75%",
          once: true
        }
      });

      gsap.to(cards, {
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
      className="section-fade bg-[#0A0A0A] px-5 py-[7.5rem] text-[#F3F0EA] md:px-9 md:py-[7.5rem]"
      style={{ fontFamily: "var(--font-fallback), sans-serif" }}
    >
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-14 lg:gap-16">
        <div
          ref={introRef}
          className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(320px,400px)] lg:items-center lg:gap-16"
        >
          <div className="max-w-[920px]">
            <p className="mb-5 text-[11px] font-normal uppercase tracking-[0.32em] text-white/40">
              What We Build
            </p>
            <h2 className="max-w-[9ch] text-[clamp(3.25rem,7vw,5rem)] font-extrabold uppercase leading-[0.95] tracking-[-0.06em] text-white">
              More Than
              <br />
              A Pretty
              <br />
              Front Page
            </h2>
          </div>
          <p className="max-w-[400px] text-[16px] font-normal leading-[1.6] text-white/65 lg:justify-self-end">
            Most agencies hand you a design and disappear. Femur builds the full picture - the
            website, the system behind it, and the logic that makes it run without you babysitting
            it.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {capabilities.map((item, index) => (
            <article
              key={item.title}
              ref={(element) => {
                cardRefs.current[index] = element;
              }}
              className="flex min-h-[280px] flex-col rounded-[4px] border border-white/[0.07] bg-[#111111] p-8 transition duration-300 ease-in-out hover:-translate-y-1 hover:border-white/20"
            >
              <span className="text-[11px] font-normal uppercase tracking-[0.32em] text-white/30">
                0{index + 1}
              </span>
              <div className="mt-10 flex flex-1 flex-col">
                <h3 className="max-w-[14ch] text-[20px] font-semibold uppercase leading-[1] tracking-[-0.03em] text-white">
                  {item.title}
                </h3>
                <p className="mt-5 max-w-[30ch] text-[14px] font-normal leading-[1.7] text-white/55">
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
