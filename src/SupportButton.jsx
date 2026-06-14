"use client";
import React from "react";
import {
  FaCoffee,
  FaPaypal,
  FaHeart,
  FaMugHot,
  FaPatreon,
} from "react-icons/fa";

const PLATFORM_CONFIG = {
  buymeacoffee: {
    icon: FaCoffee,
    label: "Buy me a coffee",
    accent: "#FFDD00",
  },
  "ko-fi": {
    icon: FaMugHot,
    label: "Ko-fi",
    accent: "#13C3FF",
  },
  paypal: {
    icon: FaPaypal,
    label: "PayPal",
    accent: "#0070BA",
  },
  patreon: {
    icon: FaPatreon,
    label: "Patreon",
    accent: "#FF424D",
  },
  default: {
    icon: FaHeart,
    label: "Support",
    accent: "#FF90E8",
  },
};

export const getPaymentUrl = (platform, username) => {
  if (!username) return "#";
  switch (platform) {
    case "buymeacoffee":
      return `https://www.buymeacoffee.com/${username}`;
    case "ko-fi":
      return `https://ko-fi.com/${username}`;
    case "paypal":
      return `https://paypal.me/${username}`;
    case "patreon":
      return `https://patreon.com/${username}`;
    default:
      return username.startsWith("http")
        ? username
        : `https://${username}`;
  }
};

const getPlatformConfig = (platform) =>
  PLATFORM_CONFIG[platform] || PLATFORM_CONFIG.default;

const SupportButton = ({
  monetization,
  overlay = false,
  iconHoverClass = "",
  iconSize,
  size = "md",
  className = "",
}) => {
  if (!monetization?.enabled || !monetization.username) return null;

  const config = getPlatformConfig(monetization.platform);
  const Icon = config.icon;
  const resolvedIconSize = iconSize ?? (size === "sm" ? 14 : 18);
  const sizeClass = size === "sm" ? "h-7 w-7" : "h-9 w-9";

  const chromeClass = overlay
    ? "rounded-full bg-black/30 backdrop-blur-md border border-white/15 text-white hover:bg-black/50 hover:scale-105 active:scale-95"
    : `rounded-full hover:bg-black/5 active:scale-95 ${iconHoverClass}`;

  return (
    <a
      href={getPaymentUrl(monetization.platform, monetization.username)}
      target="_blank"
      rel="noopener noreferrer"
      title={config.label}
      aria-label={config.label}
      className={`inline-flex items-center justify-center transition-all duration-200 ${sizeClass} ${chromeClass} ${className}`}
    >
      <Icon size={resolvedIconSize} style={{ color: config.accent }} aria-hidden />
    </a>
  );
};

export default SupportButton;
