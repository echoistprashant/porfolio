"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const faqItems = [
  {
    question: "What kind of projects fit Femur best?",
    answer:
      "Brand-driven websites, product interfaces, internal systems, and automation-led builds where design quality and execution quality both matter."
  },
  {
    question: "Do you only handle design or full development too?",
    answer:
      "The portfolio positioning suggests full-stack delivery: concept, interface direction, front-end implementation, and production-ready handoff or launch."
  },
  {
    question: "Can we start small before committing to a larger build?",
    answer:
      "Yes. Discovery, landing pages, UI directions, or scoped product modules work well as smaller starting engagements before a broader rollout."
  },
  {
    question: "How involved does the client need to be?",
    answer:
      "Enough to keep decisions sharp, but not enough to slow momentum. The ideal setup is fast approvals, clear priorities, and structured check-ins."
  },
  {
    question: "What happens after launch?",
    answer:
      "Post-launch support can cover refinements, fixes, performance tuning, and follow-up improvements once the first version is live."
  }
];

export function FaqSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [openIndex, setOpenIndex] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const items = itemRefs.current.filter(Boolean);

    if (!section || !header || !items.length) {
      return;
    }

    gsap.set(header, { opacity: 0, y: 24 });
    gsap.set(items, { opacity: 0, y: 24 });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          gsap.to(header, {
            opacity: 1,
            y: 0,
            duration: 0.75,
            ease: "power3.out"
          });

          gsap.to(items, {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.08,
            delay: 0.08,
            ease: "power3.out"
          });

          observer.disconnect();
        });
      },
      { threshold: 0.18 }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-fade bg-white px-5 py-20 text-[#0A0A0A] md:px-9 md:py-28"
    >
      <div className="mx-auto flex w-full max-w-[1100px] flex-col gap-10">
        <div ref={headerRef} className="max-w-3xl">
          <p className="mb-3 text-[11px] uppercase tracking-[0.28em] text-[#7A7A7A]">
            FAQ
          </p>
          <h2 className="text-[clamp(3rem,7vw,5.5rem)] font-extrabold uppercase leading-[0.92] tracking-[-0.04em]">
            Questions Before The First Call
          </h2>
        </div>

        <div className="flex flex-col border-t border-[#E4E4E4]">
          {faqItems.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={item.question}
                ref={(element) => {
                  itemRefs.current[index] = element;
                }}
                className="border-b border-[#E4E4E4]"
              >
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  className="flex w-full items-start justify-between gap-6 py-6 text-left md:py-7"
                >
                  <span className="max-w-[20ch] text-[1.25rem] font-medium uppercase leading-[1.05] tracking-[-0.02em] md:text-[1.65rem]">
                    {item.question}
                  </span>
                  <span className="pt-1 text-[11px] uppercase tracking-[0.22em] text-[#8A8A8A]">
                    {isOpen ? "Close" : "Open"}
                  </span>
                </button>
                <div
                  className={`grid transition-[grid-template-rows,opacity] duration-500 ease-out ${
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-70"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="max-w-3xl pb-6 text-[14px] leading-7 text-[#555555] md:pb-7 md:text-[15px]">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
