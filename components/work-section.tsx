"use client";

import type { CSSProperties } from "react";
import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

import { projectCategories } from "@/data/project-catalog";

const DESKTOP_ITEMS = [
  {
    heading: "Web Apps",
    subtitle:
      "Sites, platforms, e-commerce builds, and digital experiences listed across Femur's public work.",
    href: "/work/web-apps",
    image:
      "https://images.unsplash.com/photo-1517849845537-4d257902454a?w=800"
  },
  {
    heading: "Mobile Apps",
    subtitle:
      "Native and cross-platform product work gathered from Femur's portfolio and case study listings.",
    href: "/work/mobile-apps",
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800"
  },
  {
    heading: "CRM Systems",
    subtitle:
      "Sales, platform, and internal operations systems surfaced from Femur's public case studies and testimonials.",
    href: "/work/crm-systems",
    image:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800"
  },
  {
    heading: "Automation",
    subtitle:
      "Automation, QA, AI operations, and workflow system projects listed on Femur's automation portfolio.",
    href: "/work/automation",
    image:
      "https://images.unsplash.com/photo-1551582045-6ec9c11d8697?w=800"
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

    const handleMove = (event: MouseEvent) => {
      const bounds = section.getBoundingClientRect();

      if (
        event.clientX < bounds.left ||
        event.clientX > bounds.right ||
        event.clientY < bounds.top ||
        event.clientY > bounds.bottom
      ) {
        return;
      }

      const rawX = event.clientX / window.innerWidth;
      const rawY = event.clientY / window.innerHeight;
      const clampedX = Math.min(Math.max(rawX, 0.18), 0.82);
      const clampedY = Math.min(Math.max(rawY, 0.18), 0.82);

      grid.classList.remove("idle");
      grid.style.setProperty("--x-split", `${clampedX * 100}%`);
      grid.style.setProperty("--y-split", `${clampedY * 100}%`);

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

    const handleLeave = () => {
      grid.classList.add("idle");
      grid.style.setProperty("--x-split", "35%");
      grid.style.setProperty("--y-split", "35%");
      cursor.style.opacity = "0";
      applyQuadrantState(null);
    };

    const handleEnter = () => {
      cursor.style.opacity = "1";
    };

    window.addEventListener("mousemove", handleMove);
    section.addEventListener("mouseleave", handleLeave);
    section.addEventListener("mouseenter", handleEnter);

    handleLeave();

    return () => {
      window.removeEventListener("mousemove", handleMove);
      section.removeEventListener("mouseleave", handleLeave);
      section.removeEventListener("mouseenter", handleEnter);
    };
  }, []);

  return (
    <>
      <style>{`
        .work-section-desktop {
          position: relative;
          width: 100%;
          height: 100vh;
          overflow: hidden;
          background: #ffffff;
        }

        .work-section-desktop .work-top-label {
          position: absolute;
          top: 28px;
          left: 50%;
          transform: translateX(-50%);
          font-family: sans-serif;
          font-size: 10px;
          font-weight: 400;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #bbb;
        }

        .work-section-desktop .corner-label {
          position: absolute;
          z-index: 2;
          max-width: 220px;
        }

        .work-section-desktop .corner-label h2 {
          margin: 0;
          font-family: "Helvetica Neue", Helvetica, sans-serif;
          font-size: 36px;
          font-weight: 300;
          letter-spacing: -0.03em;
          line-height: 1;
          color: #111;
        }

        .work-section-desktop .corner-label span {
          display: block;
          margin-top: 8px;
          max-width: 220px;
          font-family: sans-serif;
          font-size: 9px;
          font-weight: 400;
          letter-spacing: 0.13em;
          line-height: 1.7;
          text-transform: uppercase;
          color: #aaa;
        }

        .work-section-desktop .corner-top-left {
          top: 36px;
          left: 44px;
        }

        .work-section-desktop .corner-top-right {
          top: 36px;
          right: 44px;
          text-align: right;
        }

        .work-section-desktop .corner-bottom-left {
          bottom: 36px;
          left: 44px;
        }

        .work-section-desktop .corner-bottom-right {
          right: 44px;
          bottom: 36px;
          text-align: right;
        }

        .work-section-desktop .work-grid {
          --x-split: 35%;
          --y-split: 35%;
          position: absolute;
          top: 50%;
          left: 50%;
          z-index: 1;
          width: 480px;
          height: 440px;
          display: grid;
          grid-template-columns: var(--x-split) 1fr;
          grid-template-rows: var(--y-split) 1fr;
          gap: 2px;
          background: #fff;
          transform: translate(-50%, -50%);
          transition:
            grid-template-columns 0.08s ease-out,
            grid-template-rows 0.08s ease-out;
        }

        .work-section-desktop .work-grid.idle {
          transition:
            grid-template-columns 0.85s cubic-bezier(0.34, 1.36, 0.64, 1),
            grid-template-rows 0.85s cubic-bezier(0.34, 1.36, 0.64, 1);
        }

        .work-section-desktop .grid-cell {
          position: relative;
          overflow: hidden;
        }

        .work-section-desktop .grid-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transform: scale(1.1);
          transition:
            filter 0.25s ease,
            transform 0.25s ease;
          filter: ${RESET_FILTER};
        }

        .work-section-desktop #work-cursor {
          position: fixed;
          top: 0;
          left: 0;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          border: 1.5px solid #222;
          pointer-events: none;
          z-index: 9999;
          transform: translate(-50%, -50%);
          transition: opacity 0.3s ease;
          opacity: 0;
        }
      `}</style>

      <section className="section-fade bg-white text-[#0A0A0A]">
        <div className="flex w-full flex-col gap-0 md:hidden">
          {projectCategories.map((category, index) => (
            <Link
              href={`/work/${category.slug}`}
              key={category.slug}
              className="group block"
            >
              <div className="relative aspect-[16/9] w-full overflow-hidden">
                <Image
                  src={`https://picsum.photos/800/450?random=${index + 1}`}
                  alt={category.label}
                  fill
                  sizes="100vw"
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />
              </div>
              <div className="flex items-start justify-between border-b border-[#E8E8E8] px-5 py-5">
                <div>
                  <div className="text-[11px] uppercase tracking-[0.2em] text-[#888888]">
                    Category
                  </div>
                  <div className="mt-1 text-[1.5rem] font-normal leading-none tracking-[-0.03em]">
                    {category.label}
                  </div>
                </div>
                <span className="mt-1 text-[11px] uppercase tracking-widest text-[#888888]">
                  ↗
                </span>
              </div>
            </Link>
          ))}
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
              Sites, platforms, e-commerce builds, and digital experiences
              listed across Femur&apos;s public work.
            </span>
          </div>

          <div className="corner-label corner-top-right">
            <h2>Mobile Apps</h2>
            <span>
              Native and cross-platform product work gathered from
              Femur&apos;s portfolio and case study listings.
            </span>
          </div>

          <div className="corner-label corner-bottom-left">
            <h2>CRM Systems</h2>
            <span>
              Sales, platform, and internal operations systems surfaced from
              Femur&apos;s public case studies and testimonials.
            </span>
          </div>

          <div className="corner-label corner-bottom-right">
            <h2>Automation</h2>
            <span>
              Automation, QA, AI operations, and workflow system projects
              listed on Femur&apos;s automation portfolio.
            </span>
          </div>

          <div
            ref={gridRef}
            className="work-grid idle"
            style={
              {
                "--x-split": "35%",
                "--y-split": "35%"
              } as CSSProperties
            }
          >
            {DESKTOP_ITEMS.map((item, index) => (
              <Link key={item.heading} href={item.href} className="grid-cell">
                <img
                  ref={(element) => {
                    imageRefs.current[index] = element;
                  }}
                  className="grid-image"
                  src={item.image}
                  alt={item.heading}
                />
              </Link>
            ))}
          </div>

          <div id="work-cursor" ref={cursorRef} aria-hidden="true" />
        </section>
      </section>
    </>
  );
}
