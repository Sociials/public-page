import React from "react";

/** Minimal share-sheet icon (arrow up from tray) — used on profile chrome and editors. */
const ShareIcon = ({ size = 20, className = "", strokeWidth = 1.75 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <path d="M12 16V4" />
    <path d="m7 9 5-5 5 5" />
    <path d="M5 20h14a1 1 0 0 0 1-1v-5" />
  </svg>
);

export default ShareIcon;
