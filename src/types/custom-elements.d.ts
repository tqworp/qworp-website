// JSX typings for the three vanilla Web Components defined in
// public/js/vyuha-motion.js (VyuhaHero, QworpEngine, VyuhaMarketSignal).
// They're plain custom elements with string attributes — no React props,
// no children beyond what each component renders into its own Shadow DOM.
import type { DetailedHTMLProps, HTMLAttributes } from "react";

type CustomElementProps = DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>;

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "vyuha-hero": CustomElementProps & {
        eyebrow?: string;
        headline?: string;
        description?: string;
        domains?: string;
        mechanisms?: string;
        exchanges?: string;
      };
      "qworp-engine": CustomElementProps;
      "vyuha-market-signal": CustomElementProps;
    }
  }
}

export {};
