import React from "react";
import { FaFacebook } from "react-icons/fa";
import {
  FaInstagram,
  FaXTwitter,
  FaTiktok,
  FaLinkedin,
  FaGithub,
  FaEnvelope,
  FaYoutube,
} from "react-icons/fa6";
import { SiBluesky, SiThreads } from "react-icons/si";

const iconMap = {
  youtube: { icon: FaYoutube, prefix: "https://youtube.com/" },
  instagram: { icon: FaInstagram, prefix: "https://instagram.com/" },
  twitter: { icon: FaXTwitter, prefix: "https://twitter.com/" },
  tiktok: { icon: FaTiktok, prefix: "https://tiktok.com/@" },
  linkedin: { icon: FaLinkedin, prefix: "https://linkedin.com/in/" },
  github: { icon: FaGithub, prefix: "https://github.com/" },
  facebook: { icon: FaFacebook, prefix: "https://www.facebook.com/" },
  threads: { icon: SiThreads, prefix: "https://www.threads.com/@" },
  bluesky: { icon: SiBluesky, prefix: "https://bsky.app/profile/" },
  email: { icon: FaEnvelope, prefix: "mailto:" },
};

const SocialRow = React.memo(function SocialRow({ socials, theme }) {
  // --- THEME RESOLUTION LOGIC ---
  const isCustom = theme?.isCustom;
  const btnConfig = theme?.button;

  // 1. Fallback / Base Classes
  // If custom, we only want the transitions. If preset, we use the buttonClass.
  const buttonClass = isCustom
    ? "transition-transform hover:-translate-y-1 hover:shadow-none"
    : theme?.buttonClass ||
      "bg-white border-2 border-black shadow-[4px_4px_0px_#000]";

  // 2. Custom Style Object (Only for Custom Theme)
  const customStyle = isCustom
    ? {
        backgroundColor:
          btnConfig.style === "outline"
            ? "transparent"
            : btnConfig.backgroundColor,
        color:
          btnConfig.style === "outline"
            ? btnConfig.backgroundColor
            : btnConfig.textColor,
        border: btnConfig.style.includes("shadow")
          ? "2px solid black"
          : `2px solid ${btnConfig.backgroundColor}`,
        // Social Icons: Pill = Circle (50%), Rounded = 8px, Sharp = 0px
        borderRadius:
          btnConfig.shape === "pill"
            ? "50%"
            : btnConfig.shape === "rounded"
              ? "8px"
              : "0px",
        // Shadows (Slightly smaller for social icons looks better, but keeping consistent logic)
        boxShadow:
          btnConfig.style === "hard-shadow"
            ? `3px 3px 0px ${btnConfig.shadowColor}`
            : btnConfig.style === "soft-shadow"
              ? `0 3px 10px ${btnConfig.shadowColor}40`
              : "none",
      }
    : {};

  return (
    <div className="flex flex-wrap justify-center gap-2 md:gap-3 mt-0">
      {Object.entries(socials).map(([platform, handle]) => {
        if (!handle) return null;

        const config = iconMap[platform];
        const Icon = config.icon;
        const url = config.prefix + handle;

        return (
          <a
            key={platform}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            style={customStyle}
            className={`
              ${buttonClass}
              group relative flex items-center justify-center 
              !w-9 !h-9 md:!w-10 md:!h-10 !p-0 
              ${!isCustom ? "!rounded-full" : ""} 
            `}
          >
            {/* Note: We conditionally apply !rounded-full only if NOT custom. 
                If custom, the inline style.borderRadius takes over. */}

            <Icon className="text-sm md:text-base group-hover:scale-110 transition-transform" />
          </a>
        );
      })}
    </div>
  );
});

export default SocialRow;
