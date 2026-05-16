import type { ProjectCategory } from "@/data/project-catalog";

type CategoryCoverProps = {
  category: ProjectCategory;
};

export function CategoryCover({ category }: CategoryCoverProps) {
  return (
    <div className={`relative h-full w-full bg-gradient-to-br ${category.accent}`}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.72),_transparent_45%),radial-gradient(circle_at_bottom_right,_rgba(0,0,0,0.08),_transparent_40%)]" />
      <div className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-4 text-[#111111]">
        <div>
          <div className="text-[10px] uppercase tracking-[0.24em] text-black/45">
            Category
          </div>
          <div className="mt-2 max-w-[10ch] text-[1.9rem] font-semibold uppercase leading-[0.92] tracking-[-0.05em]">
            {category.label}
          </div>
        </div>
        <span className="text-[11px] uppercase tracking-[0.24em] text-black/55">
          ↗
        </span>
      </div>
    </div>
  );
}
