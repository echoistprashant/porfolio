"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const faqItems = [
  {
    question: "Who Is Femur Actually For?",
    answer:
      "Founders and teams who know that the problem is bigger than a prettier homepage. If you need the brand, the site, the backend logic, or the internal flow to finally act like one system, you are a fit."
  },
  {
    question: "What If We Only Need A Website?",
    answer:
      "If a website is genuinely the whole fix, we will build the website. If the real issue is your sales flow, client ops, or handoff chaos, we will say that too. We do not sell extra work for sport, but we do not fake simple answers either."
  },
  {
    question: "Do You Design And Develop In-House?",
    answer:
      "Yes. Femur is not a design file factory. We handle the direction, the interface, the build, the logic behind it, and the cleanup required to get it live without excuses."
  },
  {
    question: "Can We Start Small First?",
    answer:
      "Yes, if the smaller scope still solves something real. A focused landing page, one product surface, or one broken internal flow can be a smart starting point. We just will not package busywork as momentum."
  },
  {
    question: "How Involved Do We Need To Be?",
    answer:
      "Available, decisive, and honest. You do not need to sit in Figma all day, but you do need to answer the hard questions quickly. Slow approvals and vague feedback kill good work faster than bad code does."
  },
  {
    question: "What Happens After Launch?",
    answer:
      "We do not vanish the second something ships. We stay close enough to QA the real-world use, fix rough edges, and make sure the thing works the way it was supposed to before we call it done."
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

    const ctx = gsap.context(() => {
      gsap.set(header, { opacity: 0, y: 24 });
      gsap.set(items, { opacity: 0, y: 32 });

      gsap.to(header, {
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

      gsap.to(items, {
        opacity: 1,
        y: 0,
        duration: 0.75,
        stagger: 0.08,
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
      className="section-fade bg-[#F3F0EA] px-5 py-[7.5rem] text-[#0A0A0A] md:px-9 md:py-[7.5rem]"
      style={{ fontFamily: "var(--font-fallback), sans-serif" }}
    >
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-12">
        <div
          ref={headerRef}
          className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(320px,400px)] lg:items-center lg:gap-16"
        >
          <div className="max-w-[920px]">
            <p className="mb-5 text-[11px] font-normal uppercase tracking-[0.32em] text-black/40">
              FAQ
            </p>
            <h2 className="max-w-[10ch] text-[clamp(3.25rem,7vw,5rem)] font-extrabold uppercase leading-[0.95] tracking-[-0.06em]">
              Before You
              <br />
              Get On
              <br />
              The Call
            </h2>
          </div>
          <p className="max-w-[400px] text-[16px] font-normal leading-[1.6] text-black/65 lg:justify-self-end">
            These are the questions people ask before they decide whether Femur is the right team
            or the wrong one. Better to be clear now than polite for three calls.
          </p>
        </div>

        <div className="flex flex-col border-t border-black/10">
          {faqItems.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={item.question}
                ref={(element) => {
                  itemRefs.current[index] = element;
                }}
                className="border-b border-black/10"
              >
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  className="flex w-full items-start justify-between gap-6 py-6 text-left md:py-7"
                >
                  <span className="max-w-[20ch] text-[1.35rem] font-semibold uppercase leading-[1.02] tracking-[-0.03em] md:text-[1.85rem]">
                    {item.question}
                  </span>
                  <span className="pt-1 text-[11px] font-normal uppercase tracking-[0.24em] text-black/40">
                    {isOpen ? "Close" : "Open"}
                  </span>
                </button>
                <div
                  className={`grid transition-[grid-template-rows,opacity] duration-500 ease-out ${
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-70"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="max-w-[780px] pb-6 text-[14px] font-normal leading-[1.75] text-black/65 md:pb-7 md:text-[15px]">
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
