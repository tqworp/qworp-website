import Link from "next/link";
import { QworpMark } from "@/components/brand/mark";
import { PARENT_COMPANY, PARENT_COMPANY_URL, SOCIAL_LINKS } from "@/lib/constants";

export function SiteFooter() {
  return (
    <footer className="border-t border-divider bg-background">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-6 py-12 text-center">
        <div className="flex items-center gap-2.5">
          <QworpMark className="h-6 w-6 text-foreground" />
          <span className="text-sm font-semibold tracking-tight text-foreground">QWORP</span>
        </div>
        <p className="text-sm text-text-muted">
          Built by{" "}
          <Link
            href={PARENT_COMPANY_URL}
            target="_blank"
            rel="noreferrer"
            className="focus-ring rounded text-text-secondary hover:text-foreground"
          >
            {PARENT_COMPANY}
          </Link>
          . Engineering Intelligent Markets.
        </p>
        <div className="flex items-center gap-6 text-xs text-text-muted">
          <Link
            href={SOCIAL_LINKS.github}
            target="_blank"
            rel="noreferrer"
            className="focus-ring rounded hover:text-foreground"
          >
            GitHub
          </Link>
          <Link
            href={SOCIAL_LINKS.linkedin}
            target="_blank"
            rel="noreferrer"
            className="focus-ring rounded hover:text-foreground"
          >
            LinkedIn
          </Link>
          <span>© {new Date().getFullYear()} QWORP</span>
        </div>
      </div>
    </footer>
  );
}
