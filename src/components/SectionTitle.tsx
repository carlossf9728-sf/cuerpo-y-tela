import Link from "next/link";

export function SectionTitle({
  eyebrow,
  title,
  href,
  linkLabel,
}: {
  eyebrow: string;
  title: string;
  href?: string;
  linkLabel?: string;
}) {
  return (
    <div className="mb-10 flex items-end justify-between gap-6">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h2 className="mt-2 font-display text-4xl leading-none md:text-5xl">{title}</h2>
      </div>
      {href && (
        <Link href={href} className="hidden shrink-0 text-sm text-arcilla hover:underline md:block">
          {linkLabel ?? "Ver todo"} →
        </Link>
      )}
    </div>
  );
}
