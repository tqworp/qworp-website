import Link from "next/link";
import { Mail } from "lucide-react";
import {
  CONTACT_EMAIL,
  PARENT_COMPANY,
  PARENT_COMPANY_URL,
  SOCIAL_LINKS,
} from "@/lib/constants";
import { QworpMark } from "@/components/brand/mark";
import { GithubIcon, LinkedinIcon } from "@/components/icons/social-icons";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

const CONTACT_LINKS = [
  { label: CONTACT_EMAIL, href: `mailto:${CONTACT_EMAIL}`, icon: Mail },
  { label: "GitHub", href: SOCIAL_LINKS.github, icon: GithubIcon },
  { label: "LinkedIn", href: SOCIAL_LINKS.linkedin, icon: LinkedinIcon },
] as const;

export function SiteFooter() {
  return (
    <footer className="border-t border-divider bg-bg-secondary">
      <div className="mx-auto max-w-3xl px-6 py-28 text-center">
        <SectionHeading
          eyebrow="Contact"
          title="Research collaboration starts here."
          description="For access requests, research partnerships, or questions about QWORP."
        />

        <Reveal delay={0.1} className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          {CONTACT_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={link.href.startsWith("http") ? "noreferrer noopener" : undefined}
              className="focus-ring inline-flex items-center gap-2.5 rounded-full border border-border bg-white/[0.03] px-5 py-2.5 text-sm font-medium text-text-secondary transition-all hover:border-white/[0.18] hover:bg-white/[0.06] hover:text-foreground"
            >
              <link.icon className="h-4 w-4" />
              {link.label}
            </Link>
          ))}
        </Reveal>
      </div>

      <div className="border-t border-divider bg-background">
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
            . India&rsquo;s first quant trading platform for retail traders.
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
      </div>
    </footer>
  );
}
