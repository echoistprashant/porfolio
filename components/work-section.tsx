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

type WorkArtworkConfig = {
  eyebrow: string;
  title: string;
  lines: [string, string];
  accent: string;
  accentSoft: string;
  ink: string;
};

function createWorkArtwork({
  eyebrow,
  title,
  lines,
  accent,
  accentSoft,
  ink
}: WorkArtworkConfig) {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 1200" role="img" aria-label="${title}">
      <defs>
        <linearGradient id="surface" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${accentSoft}" />
          <stop offset="100%" stop-color="#f7f2eb" />
        </linearGradient>
        <linearGradient id="panel" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="${ink}" stop-opacity="0.96" />
          <stop offset="100%" stop-color="${ink}" stop-opacity="0.82" />
        </linearGradient>
      </defs>
      <rect width="1200" height="1200" fill="url(#surface)" />
      <circle cx="972" cy="236" r="208" fill="${accent}" fill-opacity="0.12" />
      <circle cx="234" cy="1010" r="254" fill="${ink}" fill-opacity="0.06" />
      <path d="M0 836C193 760 337 730 536 760C754 793 933 925 1200 870V1200H0Z" fill="${accent}" fill-opacity="0.18" />
      <rect x="78" y="78" width="1044" height="1044" rx="42" fill="none" stroke="${ink}" stroke-opacity="0.12" />
      <rect x="118" y="118" width="964" height="964" rx="34" fill="url(#panel)" />
      <text x="176" y="214" fill="#f7f2eb" fill-opacity="0.7" font-family="Helvetica, Arial, sans-serif" font-size="34" letter-spacing="8">${eyebrow}</text>
      <text x="176" y="462" fill="#f7f2eb" font-family="Helvetica, Arial, sans-serif" font-size="146" font-weight="700" letter-spacing="-5">${title}</text>
      <line x1="176" y1="564" x2="1020" y2="564" stroke="${accent}" stroke-opacity="0.65" />
      <text x="176" y="652" fill="#f7f2eb" fill-opacity="0.82" font-family="Helvetica, Arial, sans-serif" font-size="44" letter-spacing="3">${lines[0]}</text>
      <text x="176" y="724" fill="#f7f2eb" fill-opacity="0.82" font-family="Helvetica, Arial, sans-serif" font-size="44" letter-spacing="3">${lines[1]}</text>
      <text x="176" y="986" fill="${accent}" font-family="Helvetica, Arial, sans-serif" font-size="28" letter-spacing="10">FEMUR STUDIO</text>
    </svg>
  `;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

const DESKTOP_ITEMS = [
  {
    heading: "Web Apps",
    subtitle:
      "Brand-led websites and web platforms including Sikhsha.in and other business-facing product surfaces.",
    href: "/work/web-apps",
    image: createWorkArtwork({
      eyebrow: "SELECTED WEB WORK",
      title: "Sikhsha.in",
      lines: ["AURORA ESTATES", "BIJIN SALON"],
      accent: "#d3a97c",
      accentSoft: "#efe2d1",
      ink: "#171411"
    })
  },
  {
    heading: "Mobile Apps",
    subtitle:
      "Mobile products like Mindspring and Sikhsha's AI-assisted school experience built for everyday use, not demos.",
    href: "/work/mobile-apps",
    image: createWorkArtwork({
      eyebrow: "MOBILE PRODUCT SYSTEMS",
      title: "Mindspring",
      lines: ["AI TEACHING ASSISTANT", "DAILY STUDENT USE"],
      accent: "#8aa7e8",
      accentSoft: "#dde6fa",
      ink: "#101625"
    })
  },
  {
    heading: "CRM Systems",
    subtitle:
      "Operational systems for school management, client workflows, and internal business tracking including Sikhsha and Accelify.",
    href: "/work/crm-systems",
    image: createWorkArtwork({
      eyebrow: "OPERATIONS INFRASTRUCTURE",
      title: "Accelify",
      lines: ["SIKHSHA SCHOOL ERP", "INCUBATOR ONLINE"],
      accent: "#80b08b",
      accentSoft: "#dfecdf",
      ink: "#142017"
    })
  },
  {
    heading: "Automation",
    subtitle:
      "Automation systems for HR, payroll, outbound email, and internal ops where repeat work needed to disappear.",
    href: "/work/automation",
    image: createWorkArtwork({
      eyebrow: "REPEAT WORK REMOVAL",
      title: "Prane",
      lines: ["PAYROLL AUTOMATION", "LANDMARK RETAIL BOTS"],
      accent: "#d7a151",
      accentSoft: "#f2e2c8",
      ink: "#22180b"
    })
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
                  unoptimized
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
