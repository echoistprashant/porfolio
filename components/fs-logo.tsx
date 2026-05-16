type FsLogoProps = {
  className?: string;
  label?: string;
  size?: "sm" | "md";
};

const sizeClasses = {
  sm: {
    frame: "h-10 w-10",
    letters: "text-[1.75rem]"
  },
  md: {
    frame: "h-14 w-14",
    letters: "text-[2.5rem]"
  }
} as const;

export function FsLogo({
  className = "",
  label = "Femur Studio",
  size = "sm"
}: FsLogoProps) {
  const scale = sizeClasses[size];

  return (
    <div
      aria-label={label}
      className={`relative inline-flex items-center justify-center overflow-hidden bg-black text-white ${scale.frame} ${className}`}
    >
      <span className="sr-only">{label}</span>
      <span
        aria-hidden="true"
        className={`relative font-serif leading-none tracking-[-0.08em] ${scale.letters}`}
      >
        <span className="absolute -left-[0.26em] top-[-0.28em]">F</span>
        <span className="absolute left-[0.02em] top-[0.08em]">S</span>
      </span>
    </div>
  );
}
