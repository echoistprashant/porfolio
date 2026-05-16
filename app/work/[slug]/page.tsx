import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getCategoryBySlug,
  getProjectsForCategory,
  projectCategories,
  type ProjectCategorySlug
} from "@/data/project-catalog";

type WorkCategoryPageProps = {
  params: {
    slug: string;
  };
};

export function generateStaticParams() {
  return projectCategories.map((category) => ({ slug: category.slug }));
}

export default function WorkCategoryPage({ params }: WorkCategoryPageProps) {
  const category = getCategoryBySlug(params.slug);

  if (!category) {
    notFound();
  }

  const projects = getProjectsForCategory(category.slug as ProjectCategorySlug);

  return (
    <main className="min-h-screen bg-[#0A0A0A] px-5 py-8 text-white md:px-9 md:py-10">
      <div className="mx-auto flex w-full max-w-[1320px] flex-col gap-12">
        <header className="flex flex-col gap-8 border-b border-white/10 pb-8 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <Link
              href="/"
              className="mb-6 inline-flex text-[11px] uppercase tracking-[0.24em] text-white/60 transition-colors hover:text-white"
            >
              Back Home
            </Link>
            <p className="mb-3 text-[11px] uppercase tracking-[0.3em] text-white/45">
              Femur Project Index
            </p>
            <h1 className="text-[clamp(3.25rem,9vw,7rem)] font-extrabold uppercase leading-[0.92] tracking-[-0.04em]">
              {category.label}
            </h1>
          </div>
          <p className="max-w-xl text-sm leading-7 text-white/68 md:text-base">
            {category.blurb}
          </p>
        </header>

        <section className="grid gap-5 md:grid-cols-2">
          {projects.map((project, index) => (
            <article
              key={`${project.name}-${index}`}
              className="flex min-h-[260px] flex-col justify-between rounded-[28px] border border-white/10 bg-white/[0.04] p-6 transition-transform duration-300 hover:-translate-y-1"
            >
              <div>
                <div className="mb-6 flex items-center justify-between gap-4">
                  <span className="text-[11px] uppercase tracking-[0.22em] text-white/45">
                    {project.domain}
                  </span>
                  {project.client ? (
                    <span className="text-[11px] uppercase tracking-[0.18em] text-white/35">
                      {project.client}
                    </span>
                  ) : null}
                </div>
                <h2 className="max-w-[16ch] text-3xl font-extrabold uppercase leading-[0.96] tracking-[-0.04em]">
                  {project.name}
                </h2>
                <p className="mt-5 max-w-2xl text-sm leading-7 text-white/70 md:text-[15px]">
                  {project.summary}
                </p>
              </div>

              <div className="mt-8 flex items-center justify-between gap-4 border-t border-white/10 pt-5 text-[11px] uppercase tracking-[0.18em] text-white/50">
                <span>{project.sourceLabel}</span>
                <a
                  href={project.sourceUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-white transition-opacity hover:opacity-70"
                >
                  Source ↗
                </a>
              </div>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}
