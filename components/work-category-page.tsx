"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import {
  type ProjectCategory,
  type ProjectEntry
} from "@/data/project-catalog";

type WorkCategoryPageView = "list" | "grid";

type WorkCategoryPageProps = {
  category: ProjectCategory;
  projects: ProjectEntry[];
};

function formatIndex(index: number) {
  return String(index + 1).padStart(2, "0");
}

export function WorkCategoryPage({
  category,
  projects
}: WorkCategoryPageProps) {
  const [view, setView] = useState<WorkCategoryPageView>("list");

  const eyebrow = useMemo(() => {
    switch (category.slug) {
      case "web-apps":
        return "Digital products and brand systems";
      case "mobile-apps":
        return "Native and cross-platform experiences";
      case "crm-systems":
        return "Operational systems and internal platforms";
      case "automation":
        return "Workflow tooling and AI-enabled delivery";
      default:
        return "Selected work";
    }
  }, [category.slug]);

  return (
    <main className="work-category-page min-h-screen overflow-hidden bg-[#d8cec0] text-[#171411]">
      <div className="relative">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[28rem] bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.45),_transparent_55%),linear-gradient(180deg,_rgba(255,255,255,0.18),_transparent)]" />

        <div className="mx-auto flex w-full max-w-[1380px] flex-col px-4 pb-12 pt-4 sm:px-6 sm:pb-16 sm:pt-5 md:px-10 md:pb-20 md:pt-6 lg:px-12">
          <header className="mb-10 flex flex-col gap-10 border-b border-black/10 pb-8 sm:mb-12 lg:mb-16 lg:flex-row lg:items-start lg:justify-between lg:gap-12">
            <div className="max-w-4xl">
              <div className="mb-8 flex flex-wrap items-center gap-3 text-[10px] uppercase tracking-[0.24em] text-black/55 sm:text-[11px]">
                <Link
                  href="/"
                  className="rounded-full border border-black/10 px-3 py-2 transition-colors hover:border-black/25 hover:text-black"
                >
                  Back Home
                </Link>
                <span className={`rounded-full bg-gradient-to-r px-3 py-2 text-black ${category.accent}`}>
                  {eyebrow}
                </span>
              </div>

              <p className="mb-4 text-[11px] uppercase tracking-[0.28em] text-black/45 sm:text-[12px]">
                Femur Project Index
              </p>
              <h1 className="max-w-[9ch] text-[clamp(3.4rem,10vw,8.5rem)] font-extrabold uppercase leading-[0.88] tracking-[-0.06em]">
                {category.label}
              </h1>
            </div>

            <div className="flex w-full max-w-xl flex-col gap-6 pt-1 lg:items-end">
              <p className="max-w-[34rem] text-base leading-7 text-black/70 sm:text-lg sm:leading-8 lg:text-right">
                {category.blurb}
              </p>
              <div className="grid w-full gap-3 border border-black/10 bg-white/30 p-4 backdrop-blur-sm sm:grid-cols-3">
                <div>
                  <div className="text-[10px] uppercase tracking-[0.24em] text-black/45 sm:text-[11px]">
                    Entries
                  </div>
                  <div className="mt-2 text-2xl font-semibold tracking-[-0.04em]">
                    {projects.length}
                  </div>
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-[0.24em] text-black/45 sm:text-[11px]">
                    Format
                  </div>
                  <div className="mt-2 text-2xl font-semibold tracking-[-0.04em]">
                    {view}
                  </div>
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-[0.24em] text-black/45 sm:text-[11px]">
                    Scope
                  </div>
                  <div className="mt-2 text-2xl font-semibold tracking-[-0.04em]">
                    Public
                  </div>
                </div>
              </div>
            </div>
          </header>

          <section className="mb-8 flex flex-col gap-5 border-b border-black/10 pb-5 sm:mb-10 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap items-center gap-3 text-[11px] uppercase tracking-[0.24em] text-black/55">
              <span className="rounded-full border border-black/10 px-3 py-2">
                {category.label}
              </span>
              <span className="rounded-full border border-black/10 px-3 py-2">
                {projects.length} projects
              </span>
            </div>

            <div className="inline-flex w-fit rounded-full border border-black/10 bg-white/35 p-1">
              <button
                type="button"
                onClick={() => setView("list")}
                className={`rounded-full px-4 py-2 text-[11px] uppercase tracking-[0.24em] transition-colors ${
                  view === "list"
                    ? "bg-black text-white"
                    : "text-black/55 hover:text-black"
                }`}
              >
                List
              </button>
              <button
                type="button"
                onClick={() => setView("grid")}
                className={`rounded-full px-4 py-2 text-[11px] uppercase tracking-[0.24em] transition-colors ${
                  view === "grid"
                    ? "bg-black text-white"
                    : "text-black/55 hover:text-black"
                }`}
              >
                Grid
              </button>
            </div>
          </section>

          {view === "list" ? (
            <ol className="flex flex-col">
              {projects.map((project, index) => (
                <li
                  key={`${project.name}-${index}`}
                  className="group border-b border-black/10 py-6 sm:py-8"
                >
                  <article className="grid gap-6 md:grid-cols-[84px_minmax(0,1.6fr)_minmax(0,1fr)] md:items-start md:gap-8">
                    <div className="text-[11px] uppercase tracking-[0.24em] text-black/38">
                      {formatIndex(index)}
                    </div>

                    <div>
                      <div className="mb-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px] uppercase tracking-[0.24em] text-black/45">
                        <span>{project.domain}</span>
                        {project.client ? <span>{project.client}</span> : null}
                      </div>
                      <h2 className="max-w-[12ch] text-[clamp(2rem,4.8vw,4.25rem)] font-semibold uppercase leading-[0.9] tracking-[-0.05em] transition-transform duration-300 group-hover:translate-x-1">
                        {project.name}
                      </h2>
                    </div>

                    <div className="flex h-full flex-col justify-between gap-6">
                      <p className="max-w-xl text-sm leading-7 text-black/68 sm:text-[15px] sm:leading-8">
                        {project.summary}
                      </p>

                      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-black/10 pt-4 text-[11px] uppercase tracking-[0.2em] text-black/48">
                        <span>{project.sourceLabel}</span>
                        <a
                          href={project.sourceUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-black transition-opacity hover:opacity-60"
                        >
                          Source ↗
                        </a>
                      </div>
                    </div>
                  </article>
                </li>
              ))}
            </ol>
          ) : (
            <section className="grid gap-4 sm:gap-5 lg:grid-cols-2">
              {projects.map((project, index) => (
                <article
                  key={`${project.name}-${index}`}
                  className="group flex min-h-[320px] flex-col justify-between border border-black/10 bg-white/30 p-5 backdrop-blur-sm transition-transform duration-300 hover:-translate-y-1 sm:p-6"
                >
                  <div className="mb-10 flex items-start justify-between gap-4">
                    <div className="text-[11px] uppercase tracking-[0.24em] text-black/45">
                      {project.domain}
                    </div>
                    <div className="text-[11px] uppercase tracking-[0.24em] text-black/38">
                      {formatIndex(index)}
                    </div>
                  </div>

                  <div>
                    <h2 className="max-w-[12ch] text-[clamp(2rem,4vw,3.6rem)] font-semibold uppercase leading-[0.92] tracking-[-0.05em]">
                      {project.name}
                    </h2>
                    <p className="mt-4 max-w-xl text-sm leading-7 text-black/68 sm:text-[15px] sm:leading-8">
                      {project.summary}
                    </p>
                  </div>

                  <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-black/10 pt-4 text-[11px] uppercase tracking-[0.2em] text-black/48">
                    <span>{project.client ?? project.sourceLabel}</span>
                    <a
                      href={project.sourceUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-black transition-opacity hover:opacity-60"
                    >
                      Open Source ↗
                    </a>
                  </div>
                </article>
              ))}
            </section>
          )}
        </div>
      </div>
    </main>
  );
}
