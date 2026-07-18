import { Reveal } from "@/components/ui/reveal";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
}: {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "center" | "left";
}) {
  const alignClass = align === "center" ? "mx-auto text-center items-center" : "text-left items-start";

  return (
    <Reveal className={`flex max-w-2xl flex-col ${alignClass}`}>
      <span className="text-xs font-medium uppercase tracking-[0.2em] text-primary">
        {eyebrow}
      </span>
      <h2 className="text-balance mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="text-balance mt-4 text-base leading-relaxed text-text-secondary sm:text-lg">
          {description}
        </p>
      ) : null}
    </Reveal>
  );
}
