// Ince cizgi ikon seti, refs/icons-ref.png stilinde: tek kontur, murekkep mavisi.
import type { SVGProps } from "react";

const base: SVGProps<SVGSVGElement> = {
  viewBox: "0 0 48 48",
  fill: "none",
  stroke: "var(--ink-blue)",
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
};

export function IconNetwork(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <circle cx="24" cy="8" r="3.4" />
      <circle cx="10" cy="17" r="3.4" />
      <circle cx="38" cy="17" r="3.4" />
      <circle cx="10" cy="33" r="3.4" />
      <circle cx="38" cy="33" r="3.4" />
      <circle cx="24" cy="42" r="3.4" />
      <path d="M21 10.2 13 15M27 10.2 35 15M10 20.4v9.2M38 20.4v9.2M13 35.2l8 4.6M35 35.2l-8 4.6M13.2 18.8l21.6 12.4M34.8 18.8 13.2 31.2M24 11.4v27.2" />
    </svg>
  );
}

export function IconSnake(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M14 30c-4 0-7-3-7-7s3-7 7-7h9c4 0 7-3 7-7" />
      <path d="M34 18c4 0 7 3 7 7s-3 7-7 7h-9c-4 0-7 3-7 7" />
      <circle cx="12.5" cy="20.5" r="1" fill="var(--ink-blue)" />
      <circle cx="35.5" cy="27.5" r="1" fill="var(--ink-blue)" />
    </svg>
  );
}

export function IconPhone(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <rect x="14" y="6" width="20" height="36" rx="3.5" />
      <path d="M21 10h6" />
      <circle cx="24" cy="37" r="1.6" />
    </svg>
  );
}

export function IconBulb(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M24 8a10 10 0 0 0-5.6 18.3c1.3.9 1.6 2 1.6 3.7h8c0-1.7.3-2.8 1.6-3.7A10 10 0 0 0 24 8Z" />
      <path d="M20 34h8M21 38h6M24 30v-6l-2.6-2.6M24 24l2.6-2.6" />
    </svg>
  );
}

export function IconNotebook(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <rect x="13" y="7" width="24" height="34" rx="3" />
      <path d="M20 15h11M20 21h11M20 27h11M20 33h7" />
      <path d="M10 12h4M10 19h4M10 26h4M10 33h4" />
    </svg>
  );
}

export function IconMail(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <rect x="7" y="12" width="34" height="24" rx="2.5" />
      <path d="m8.5 14.5 15.5 12 15.5-12" />
    </svg>
  );
}
