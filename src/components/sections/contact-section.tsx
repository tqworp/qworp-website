import Link from "next/link";
import { Mail } from "lucide-react";
import { CONTACT_EMAIL, SOCIAL_LINKS } from "@/lib/constants";
import { GithubIcon, LinkedinIcon } from "@/components/icons/social-icons";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

const CONTACT_LINKS = [
  { label: CONTACT_EMAIL, href: `mailto:${CONTACT_EMAIL}`, icon: Mail },
  { label: "GitHub", href: SOCIAL_LINKS.github, icon: GithubIcon },
  { label: "LinkedIn", href: SOCIAL_LINKS.linkedin, icon: LinkedinIcon },
] as const;

export function ContactSection() {
  return (
    <section id="contact" className="relative border-t border-divider bg-bg-secondary py-28">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <SectionHeading
          eyebrow="Contact"
          title="Let's build something durable."
          description="For partnerships, research collaboration, or questions about our work."
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
    </section>
  );
}
