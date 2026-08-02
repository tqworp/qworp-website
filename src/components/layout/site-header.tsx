"use client";

import { useState } from "react";
import { BrandMark } from "@/components/brand/mark";
import { GithubIcon, MenuIcon } from "@/components/icons/social-icons";
import { NAV_LINKS, SOCIAL_LINKS } from "@/lib/constants";

// Structure matches qworp-vyuha-redesign.html's <header> exactly (lines
// 275-314) — the only change is the vanilla burgerBtn/mobilePanel toggle
// becoming React state instead of a manual classList.toggle('open').
export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header>
      <div className="container nav-inner">
        <a href="#top" className="brand">
          <BrandMark className="brand-mark" size={30} />
          <span className="brand-text">
            <span className="name">VYUHA</span>
          </span>
        </a>
        <nav className="links">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>
        <div className="nav-right">
          <a
            className="icon-link"
            href={SOCIAL_LINKS.github}
            target="_blank"
            rel="noopener"
            aria-label="GitHub"
          >
            <GithubIcon />
          </a>
          <a href="#contact" className="btn btn-primary">
            Request Access
          </a>
          <button
            className="burger"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <MenuIcon />
          </button>
        </div>
      </div>
      <div className={`mobile-panel${open ? " open" : ""}`}>
        {NAV_LINKS.map((link) => (
          <a key={link.href} href={link.href} onClick={() => setOpen(false)}>
            {link.label}
          </a>
        ))}
        <a href={SOCIAL_LINKS.github} target="_blank" rel="noopener" onClick={() => setOpen(false)}>
          GitHub ↗
        </a>
      </div>
    </header>
  );
}
