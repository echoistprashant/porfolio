import { notFound } from "next/navigation";
import { WorkCategoryPage as WorkCategoryTemplate } from "@/components/work-category-page";
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

  return <WorkCategoryTemplate category={category} projects={projects} />;
}
