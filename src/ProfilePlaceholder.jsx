import React from "react";

export default function ProfilePlaceholder({ name, className = "" }) {
  const initial = String(name || "You").match(/[a-z0-9]/i)?.[0]?.toUpperCase() || "Y";
  return <svg viewBox="0 0 100 100" className={className} role="img" aria-label="Profile initials">
    <circle cx="50" cy="50" r="49" fill="#c9dacc" />
    <circle cx="50" cy="50" r="41" fill="none" stroke="#e5eee4" strokeWidth="1" />
    <text x="50" y="53" textAnchor="middle" dominantBaseline="middle" fill="#294a3b" fontFamily="Inter,Arial,sans-serif" fontWeight="500" fontSize="35">{initial}</text>
  </svg>;
}
