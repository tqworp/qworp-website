import Link from "next/link";
import { SITE_NAME, SITE_TAGLINE, SOCIAL_LINKS } from "@/lib/constants";
import { VyuhasMark } from "@/components/brand/mark";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-divider">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-6 py-12 text-center sm:flex-row sm:justify-between sm:text-left">
        <div className="flex items-center gap-2.5">
          <VyuhasMark className="h-5 w-5 text-text-muted" />
          <div>
            <p className="text-sm font-medium text-foreground">{SITE_NAME}</p>
            <p className="text-xs text-text-muted">{SITE_TAGLINE}</p>
          </div>
        </div>

        <div className="flex items-center gap-6 text-xs text-text-muted">
          <Link
            href={SOCIAL_LINKS.github}
            target="_blank"
            rel="noreferrer noopener"
            className="focus-ring rounded-sm transition-colors hover:text-text-secondary"
          >
            GitHub
          </Link>
          <Link
            href={SOCIAL_LINKS.linkedin}
            target="_blank"
            rel="noreferrer noopener"
            className="focus-ring rounded-sm transition-colors hover:text-text-secondary"
          >
            LinkedIn
          </Link>
          <span>&copy; {year} {SITE_NAME}</span>
        </div>
      </div>
    </footer>
  );
}
