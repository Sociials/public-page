import React from "react";

export const DISCLOSURE_PRESETS = {
  affiliate:
    "Some links on this page are affiliate links. I may earn a commission at no extra cost to you.",
  amazon: "As an Amazon Associate I earn from qualifying purchases.",
  sponsored: "This page contains paid partnerships or sponsored content.",
};

export function resolveDisclosureText(disclosure) {
  if (!disclosure?.enabled) return null;
  const preset = disclosure.preset || "affiliate";
  return DISCLOSURE_PRESETS[preset] || DISCLOSURE_PRESETS.affiliate;
}

export default function AffiliateDisclosure({ disclosure, className = "", style = {} }) {
  const text = resolveDisclosureText(disclosure);
  if (!text) return null;

  return (
    <p
      className={`text-center text-[11px] leading-snug text-gray-500 px-3 ${className}`}
      style={style}
    >
      {text}
    </p>
  );
}
