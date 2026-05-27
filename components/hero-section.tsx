"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";
import { FsLogo } from "@/components/fs-logo";

type HeroSectionProps = {
  darkMode: boolean;
  onToggleDarkMode: () => void;
  ready: boolean;
};

const heroLines = ["WE THINK,", "WE CREATE,", "WE DESIGN"];

export function HeroSection({
  darkMode,
  onToggleDarkMode,
  ready
}: HeroSectionProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const lineRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const cursorDotRef = useRef<HTMLDivElement | null>(null);
  const [time, setTime] = useState("");
  const observerRef = useRef<IntersectionObserver | null>(null);

  const formatter = useMemo(
    () =>
      new Intl.DateTimeFormat("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
        timeZone: "Asia/Kolkata"
      }),
    []
  );

  useEffect(() => {
    const updateTime = () => {
      setTime(formatter.format(new Date()));
    };

    updateTime();
    const interval = window.setInterval(updateTime, 1000);

    return () => window.clearInterval(interval);
  }, [formatter]);

  useEffect(() => {
    if (!ready) {
      return;
    }

    const section = sectionRef.current;
    const lines = lineRefs.current.filter(Boolean);
    const cursor = cursorRef.current;
    const cursorDot = cursorDotRef.current;

    if (!section || !lines.length) {
      return;
    }

    gsap.set(lines, {
      yPercent: 110,
      opacity: 0,
      rotateX: -18,
      transformOrigin: "50% 100%"
    });

    const intro = gsap.timeline();
    const pulse = gsap.timeline({ paused: true, repeat: -1, repeatDelay: 1.25 });
    let hasFinishedIntro = false;

    intro.to(lines, {
      yPercent: 0,
      opacity: 1,
      rotateX: 0,
      duration: 0.9,
      stagger: 0.1,
      ease: "power3.out"
    });
    intro.eventCallback("onComplete", () => {
      hasFinishedIntro = true;
      pulse.play(0);
    });

    pulse
      .to(lines, {
        yPercent: -10,
        scale: 1.025,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out"
      })
      .to(lines, {
        yPercent: 0,
        scale: 1,
        duration: 0.95,
        stagger: 0.1,
        ease: "back.out(1.8)"
      });

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting || !hasFinishedIntro) {
            return;
          }

          pulse.pause(0);
          gsap.fromTo(
            lines,
            { yPercent: 16, opacity: 0.65 },
            {
              yPercent: 0,
              opacity: 1,
              duration: 0.75,
              stagger: 0.08,
              ease: "power3.out",
              onComplete: () => pulse.play(0)
            }
          );
        });
      },
      { threshold: 0.55 }
    );

    observerRef.current.observe(section);

    let cleanupCursor = () => {};

    if (cursor && cursorDot && window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      let cursorX = window.innerWidth / 2;
      let cursorY = window.innerHeight / 2;
      let targetX = cursorX;
      let targetY = cursorY;
      let frameId = 0;

      gsap.set([cursor, cursorDot], {
        x: cursorX,
        y: cursorY,
        xPercent: -50,
        yPercent: -50
      });

      const render = () => {
        cursorX += (targetX - cursorX) * 0.16;
        cursorY += (targetY - cursorY) * 0.16;

        gsap.set(cursor, { x: cursorX, y: cursorY });
        gsap.set(cursorDot, { x: cursorX, y: cursorY });

        frameId = window.requestAnimationFrame(render);
      };

      const setInteractiveState = (interactive: boolean) => {
        cursor.dataset.interactive = interactive ? "true" : "false";
        cursorDot.dataset.interactive = interactive ? "true" : "false";
      };

      const handleMove = (event: MouseEvent) => {
        targetX = event.clientX;
        targetY = event.clientY;

        const interactiveTarget =
          event.target instanceof Element && !!event.target.closest("a, button");

        setInteractiveState(interactiveTarget);
      };

      const handleEnter = (event: MouseEvent) => {
        targetX = event.clientX;
        targetY = event.clientY;
        gsap.to([cursor, cursorDot], {
          autoAlpha: 1,
          scale: 1,
          duration: 0.22,
          ease: "power3.out",
          overwrite: "auto"
        });
      };

      const handleLeave = () => {
        setInteractiveState(false);
        gsap.to([cursor, cursorDot], {
          autoAlpha: 0,
          scale: 0.8,
          duration: 0.2,
          ease: "power3.out",
          overwrite: "auto"
        });
      };

      gsap.set([cursor, cursorDot], { autoAlpha: 0, scale: 0.8 });

      frameId = window.requestAnimationFrame(render);
      section.addEventListener("mousemove", handleMove);
      section.addEventListener("mouseenter", handleEnter);
      section.addEventListener("mouseleave", handleLeave);

      cleanupCursor = () => {
        window.cancelAnimationFrame(frameId);
        section.removeEventListener("mousemove", handleMove);
        section.removeEventListener("mouseenter", handleEnter);
        section.removeEventListener("mouseleave", handleLeave);
      };
    }

    return () => {
      intro.kill();
      pulse.kill();
      cleanupCursor();
      observerRef.current?.disconnect();
    };
  }, [ready]);

  return (
    <section
      ref={sectionRef}
      className="section-fade relative flex min-h-screen flex-col overflow-hidden bg-canvas px-5 pb-8 pt-5 text-ink md:px-9 md:pb-10 md:pt-6"
    >
      <div ref={cursorRef} className="hero-cursor" aria-hidden="true" />
      <div ref={cursorDotRef} className="hero-cursor-dot" aria-hidden="true" />

      <header className="flex items-center justify-between gap-4 text-[11px] uppercase tracking-[0.15em] md:text-[13px]">
        <div className="flex items-center gap-3 self-start">
          <FsLogo />
          <span className="mt-[2px] hidden text-[11px] uppercase tracking-[0.24em] md:inline">
            Femur
          </span>
        </div>
        <button
          type="button"
          onClick={onToggleDarkMode}
          className="rounded-full border border-current/10 px-4 py-2 text-[10px] tracking-[0.2em] transition-transform duration-300 hover:scale-[1.03] md:text-[11px]"
        >
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
        <div className="flex items-center gap-3 md:gap-4">
          <span className="hidden md:inline">Menu</span>
          <a
            href="https://cal.com/femurstudio/30min"
            target="_blank"
            rel="noreferrer"
            className="rounded-full bg-ink px-4 py-2 text-[10px] text-canvas transition-transform duration-300 hover:scale-[1.03] md:px-6 md:py-2.5 md:text-[11px]"
          >
            LET&apos;S TALK &rarr;
          </a>
        </div>
      </header>

      <div className="flex flex-1 items-center justify-center">
        <div className="w-full pt-20 text-center md:pt-12">
          {heroLines.map((line, index) => (
            <div key={line} className="overflow-hidden">
              <span
                ref={(element) => {
                  lineRefs.current[index] = element;
                }}
                className="hero-line relative inline-block text-[clamp(5rem,12vw,10rem)] font-extrabold uppercase leading-[0.92] tracking-[-0.03em]"
              >
                {line}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-end justify-between gap-4 text-[11px] uppercase tracking-[0.2em] text-muted">
        <div className="flex flex-col gap-1 md:flex-row md:items-center md:gap-3">
          <span>Bilaspur, IN</span>
          <span>{time}</span>
        </div>
        <div className="flex items-end gap-3">
          <span className="h-16 w-px bg-current/40" />
          <span className="origin-center rotate-90 whitespace-nowrap">Scroll</span>
        </div>
      </div>
    </section>
  );
}
