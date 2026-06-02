"use client";

import type { CSSProperties } from "react";
import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

import { projectCategories } from "@/data/project-catalog";

const MIN_SPLIT = 22;
const MAX_SPLIT = 78;
const IDLE_SPLIT = 50;

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

const DESKTOP_ITEMS = [
  {
    heading: "Web Apps",
    subtitle:
      "Brand-led websites and web platforms including Sikhsha.in and other business-facing product surfaces.",
    href: "/work/web-apps",
    image: "/work/sikhsha-showcase.png"
  },
  {
    heading: "Mobile Apps",
    subtitle:
      "Mobile products like Mindspring and Sikhsha's AI-assisted school experience built for everyday use, not demos.",
    href: "/work/mobile-apps",
    image: "/work/mindspring-showcase.png"
  },
  {
    heading: "CRM Systems",
    subtitle:
      "Operational systems for school management, client workflows, and internal business tracking including Sikhsha and Accelify.",
    href: "/work/crm-systems",
    image: "/work/accelify-showcase.png"
  },
  {
    heading: "Automation",
    subtitle:
      "Automation systems for HR, payroll, outbound email, and internal ops where repeat work needed to disappear.",
    href: "/work/automation",
    image: "/work/prane-showcase.png"
  }
] as const;

const MOBILE_ITEMS = [
  {
    heading: "WEB",
    description: "BUILD BRAND-LED SURFACES THAT MOVE PEOPLE FAST.",
    href: "/work/web-apps"
  },
  {
    heading: "MOBILE",
    description: "SHIP PURPOSE-BUILT APPS PEOPLE ACTUALLY RETURN TO.",
    href: "/work/mobile-apps"
  },
  {
    heading: "CRM",
    description: "TURN MESSY OPERATIONS INTO CLEAR WORKING SYSTEMS.",
    href: "/work/crm-systems"
  },
  {
    heading: "AUTOMATION",
    description: "REMOVE REPEAT WORK BEFORE IT STARTS DRAINING TIME.",
    href: "/work/automation"
  }
] as const;

const ACTIVE_FILTER = "brightness(1.05) saturate(1.05)";
const DIMMED_FILTER = "brightness(0.72) saturate(0.9)";
const RESET_FILTER = "brightness(1) saturate(1)";

export function WorkSection() {
  const desktopSectionRef = useRef<HTMLElement | null>(null);
  const gridRef = useRef<HTMLDivElement | null>(null);
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const imageRefs = useRef<(HTMLImageElement | null)[]>([]);

  useEffect(() => {
    const section = desktopSectionRef.current;
    const grid = gridRef.current;
    const cursor = cursorRef.current;
    let animationFrame = 0;
    let currentXSplit = IDLE_SPLIT;
    let currentYSplit = IDLE_SPLIT;
    let targetXSplit = IDLE_SPLIT;
    let targetYSplit = IDLE_SPLIT;
    let isPointerInside = false;

    if (!section || !grid || !cursor) {
      return;
    }

    const applyQuadrantState = (activeIndex: number | null) => {
      imageRefs.current.forEach((image, index) => {
        if (!image) {
          return;
        }

        image.style.filter =
          activeIndex === null
            ? RESET_FILTER
            : index === activeIndex
              ? ACTIVE_FILTER
              : DIMMED_FILTER;
      });
    };

    const renderGrid = () => {
      currentXSplit += (targetXSplit - currentXSplit) * 0.14;
      currentYSplit += (targetYSplit - currentYSplit) * 0.14;

      grid.style.setProperty("--x-split", `${currentXSplit}%`);
      grid.style.setProperty("--y-split", `${currentYSplit}%`);

      const hasSettled =
        Math.abs(targetXSplit - currentXSplit) < 0.1 &&
        Math.abs(targetYSplit - currentYSplit) < 0.1;

      if (!hasSettled || isPointerInside) {
        animationFrame = window.requestAnimationFrame(renderGrid);
        return;
      }

      animationFrame = 0;
    };

    const ensureAnimationFrame = () => {
      if (!animationFrame) {
        animationFrame = window.requestAnimationFrame(renderGrid);
      }
    };

    const handleMove = (event: MouseEvent) => {
      const bounds = section.getBoundingClientRect();

      if (!bounds.width || !bounds.height) {
        return;
      }

      const rawX = clamp(
        (event.clientX - bounds.left) / bounds.width,
        0,
        1
      );
      const rawY = clamp(
        (event.clientY - bounds.top) / bounds.height,
        0,
        1
      );
      const clampedX = clamp(rawX * 100, MIN_SPLIT, MAX_SPLIT);
      const clampedY = clamp(rawY * 100, MIN_SPLIT, MAX_SPLIT);

      isPointerInside = true;
      grid.classList.remove("idle");
      targetXSplit = 100 - clampedX;
      targetYSplit = 100 - clampedY;
      ensureAnimationFrame();

      cursor.style.left = `${event.clientX}px`;
      cursor.style.top = `${event.clientY}px`;
      cursor.style.opacity = "1";

      let activeIndex = 0;

      if (rawX >= 0.5 && rawY < 0.5) {
        activeIndex = 1;
      } else if (rawX < 0.5 && rawY >= 0.5) {
        activeIndex = 2;
      } else if (rawX >= 0.5 && rawY >= 0.5) {
        activeIndex = 3;
      }

      applyQuadrantState(activeIndex);
    };

    const handleEnter = (event: MouseEvent) => {
      isPointerInside = true;
      cursor.style.opacity = "1";
      handleMove(event);
    };

    const handleLeave = () => {
      isPointerInside = false;
      grid.classList.add("idle");
      targetXSplit = IDLE_SPLIT;
      targetYSplit = IDLE_SPLIT;
      ensureAnimationFrame();
      cursor.style.opacity = "0";
      applyQuadrantState(null);
    };

    section.addEventListener("mousemove", handleMove);
    section.addEventListener("mouseleave", handleLeave);
    section.addEventListener("mouseenter", handleEnter);

    handleLeave();

    return () => {
      window.cancelAnimationFrame(animationFrame);
      section.removeEventListener("mousemove", handleMove);
      section.removeEventListener("mouseleave", handleLeave);
      section.removeEventListener("mouseenter", handleEnter);
    };
  }, []);

  return (
    <>
      <section className="section-fade bg-white text-[#0A0A0A]">
        <div className="px-4 pb-8 pt-7 md:hidden">
          <div className="mx-auto flex w-full max-w-[380px] flex-col">
            <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.18em]">
              <span className="h-[9px] w-[9px] bg-black" />
              <span>Work</span>
            </div>

            <h2 className="mt-5 max-w-[11ch] text-[2.65rem] font-normal leading-[0.98] tracking-[-0.055em] text-black">
              Instead of adapting to change, we shape it.
            </h2>

            <Link
              href="/work/web-apps"
              className="mt-7 inline-flex w-fit border border-black px-4 py-3 text-[11px] uppercase tracking-[0.16em] transition-colors hover:bg-black hover:text-white"
            >
              See Our Work
            </Link>

            <div className="mt-11 border-t border-black/12">
              {MOBILE_ITEMS.map((item, index) => {
                const category = projectCategories[index];

                if (!category) {
                  return null;
                }

                return (
                  <Link
                    href={item.href}
                    key={item.heading}
                    className="grid grid-cols-[78px_1fr_1.15fr] gap-3 border-b border-black/12 py-4"
                  >
                    <div className="relative h-[78px] w-[78px] overflow-hidden">
                      <Image
                        src={DESKTOP_ITEMS[index].image}
                        alt={item.heading}
                        fill
                        sizes="78px"
                        className="object-cover"
                      />
                    </div>
                    <div className="pt-1 text-[11px] uppercase tracking-[0.14em] text-black">
                      [&rarr;] {item.heading}
                    </div>
                    <p className="pt-1 text-[11px] uppercase leading-[1.4] tracking-[0.05em] text-black">
                      {item.description}
                    </p>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        <section
          ref={desktopSectionRef}
          className="work-section-desktop hidden md:block"
          aria-label="Work"
        >
          <div className="work-top-label">WORK</div>

          <div className="corner-label corner-top-left">
            <h2>Web Apps</h2>
            <span>
              Brand-led websites and web platforms including Sikhsha.in and
              other business-facing product surfaces.
            </span>
          </div>

          <div className="corner-label corner-top-right">
            <h2>Mobile Apps</h2>
            <span>
              Mobile products like Mindspring and Sikhsha&apos;s AI-assisted
              school experience built for everyday use, not demos.
            </span>
          </div>

          <div className="corner-label corner-bottom-left">
            <h2>CRM Systems</h2>
            <span>
              Operational systems for school management, client workflows, and
              internal business tracking including Sikhsha and Accelify.
            </span>
          </div>

          <div className="corner-label corner-bottom-right">
            <h2>Automation</h2>
            <span>
              Automation systems for HR, payroll, outbound email, and internal
              ops where repeat work needed to disappear.
            </span>
          </div>

          <div
            ref={gridRef}
            className="work-grid idle"
            style={
              {
                "--x-split": `${IDLE_SPLIT}%`,
                "--y-split": `${IDLE_SPLIT}%`
              } as CSSProperties
            }
          >
            {DESKTOP_ITEMS.map((item, index) => (
              <Link key={item.heading} href={item.href} className="grid-cell">
                <Image
                  ref={(element) => {
                    imageRefs.current[index] = element;
                  }}
                  className="grid-image"
                  src={item.image}
                  alt={item.heading}
                  fill
                  sizes="(min-width: 768px) 46vw, 100vw"
                />
              </Link>
            ))}
          </div>

          <div id="work-cursor" ref={cursorRef} aria-hidden="true">
            <span>OPEN</span>
          </div>
        </section>
      </section>
    </>
  );
}
