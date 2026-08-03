import { BrandMark } from "@/components/brand/mark";
import { GithubIcon, LinkedinIcon } from "@/components/icons/social-icons";
import { SITE_URL, SOCIAL_LINKS } from "@/lib/constants";

// Matches qworp-vyuha-redesign.html's <footer> exactly (lines 502-526),
// including the literal "© 2026 Vyuha" — not computed from Date(), since
// the source file hardcodes it and that's the copy that was approved.
export function SiteFooter() {
  return (
    <footer>
      <div className="container footer-inner">
        <div className="footer-left">
          <BrandMark size={26} />
          <p>
            <a href={SITE_URL} style={{ color: "var(--purple)" }} target="_blank" rel="noopener">
              Vyuha
            </a>{" "}
            — creators of QWORP, India&#39;s first quant trading platform for retail traders.
          </p>
        </div>
        <div className="footer-right">
          <a
            className="icon-link"
            href={SOCIAL_LINKS.github}
            target="_blank"
            rel="noopener"
            aria-label="GitHub"
          >
            <GithubIcon />
          </a>
          <a
            className="icon-link"
            href={SOCIAL_LINKS.linkedin}
            target="_blank"
            rel="noopener"
            aria-label="LinkedIn"
          >
            <LinkedinIcon />
          </a>
          <span className="footer-copy">© 2026 Vyuha</span>
        </div>
      </div>
    </footer>
  );
}
