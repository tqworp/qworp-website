import { CONTACT_EMAIL, SOCIAL_LINKS } from "@/lib/constants";

// Matches qworp-vyuha-redesign.html lines 482-498 exactly.
export function ContactSection() {
  return (
    <section id="contact">
      <div className="container">
        <div className="contact-box" data-reveal="">
          <div>
            <span className="eyebrow">Get In Touch</span>
            <h2>Research collaboration starts here.</h2>
            <p>For access requests, research partnerships, or questions about QWORP.</p>
          </div>
          <div className="contact-links">
            <a href={`mailto:${CONTACT_EMAIL}`} className="btn btn-primary">
              {CONTACT_EMAIL}
            </a>
            <a href={SOCIAL_LINKS.github} target="_blank" rel="noopener" className="btn btn-outline">
              GitHub
            </a>
            <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener" className="btn btn-outline">
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
