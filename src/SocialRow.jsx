import React from "react";
import { FaFacebook, FaTwitch, FaDiscord, FaSnapchat, FaPinterest, FaSpotify, FaTelegram, FaReddit, FaWhatsapp } from "react-icons/fa";
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
import {
  CUSTOM_BTN_INTERACT_CLASS,
  STATIC_BTN_INTERACT_CLASS,
  ensureButtonInteractStyles,
  getCustomButtonStyle,
} from "./buttonInteraction.js";
import { navigateExternalLink } from "./openExternalBrowser.js";
import {
  SOCIAL_ROW_ROOT_CLASS,
  resolveSocialRowJustifyClass,
} from "./socialRowLayout.js";

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
  twitch: { icon: FaTwitch, prefix: "https://twitch.tv/" },
  discord: { icon: FaDiscord, prefix: "https://discord.gg/" },
  snapchat: { icon: FaSnapchat, prefix: "https://www.snapchat.com/add/" },
  pinterest: { icon: FaPinterest, prefix: "https://www.pinterest.com/" },
  spotify: { icon: FaSpotify, prefix: "https://open.spotify.com/user/" },
  telegram: { icon: FaTelegram, prefix: "https://t.me/" },
  reddit: { icon: FaReddit, prefix: "https://www.reddit.com/user/" },
  whatsapp: { icon: FaWhatsapp, prefix: "https://wa.me/" },
};

/** Resolve stored username or full URL into a clickable href. */
export const resolveSocialHref = (platform, value, prefix) => {
  if (!value || typeof value !== "string") return null;
  const trimmed = value.trim();
  if (!trimmed) return null;

  if (platform === "email") {
    const email = trimmed.replace(/^mailto:/i, "");
    return email ? `mailto:${email}` : null;
  }

  if (/^https?:\/\//i.test(trimmed)) return trimmed;

  const handle = trimmed.replace(/^@+/, "");
  if (!handle || !prefix) return null;
  return prefix + handle;
};

const SocialRow = React.memo(function SocialRow({ socials, theme, align = "center" }) {
  const isCustom = theme?.isCustom;
  const btnConfig = theme?.button;

  React.useEffect(() => {
    ensureButtonInteractStyles();
  }, []);

  const interactClass = isCustom
    ? CUSTOM_BTN_INTERACT_CLASS
    : STATIC_BTN_INTERACT_CLASS;

  const buttonClass = isCustom
    ? interactClass
    : `${theme?.buttonClass || "bg-white border-2 border-black shadow-[4px_4px_0px_#000]"} ${interactClass}`;

  const customStyle = isCustom
    ? getCustomButtonStyle(btnConfig, {
        radius:
          btnConfig.shape === "pill"
            ? "50%"
            : btnConfig.shape === "rounded"
              ? "8px"
              : "0px",
        shadow:
          btnConfig.style === "hard-shadow"
            ? `3px 3px 0px ${btnConfig.shadowColor}`
            : btnConfig.style === "soft-shadow"
              ? `0 3px 10px ${btnConfig.shadowColor}40`
              : "none",
      })
    : {};

  const justifyClass = resolveSocialRowJustifyClass(align);

  return (
    <div className={`${SOCIAL_ROW_ROOT_CLASS} ${justifyClass}`}>
      {Object.entries(socials || {}).map(([platform, handle]) => {
        if (!handle) return null;

        const config = iconMap[platform];
        if (!config) return null;

        const Icon = config.icon;
        const url = resolveSocialHref(platform, handle, config.prefix);
        if (!url) return null;

        return (
          <a
            key={platform}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => navigateExternalLink(e, url)}
            style={customStyle}
            className={`
              ${buttonClass}
              group relative flex items-center justify-center 
              !w-9 !h-9 md:!w-10 md:!h-10 !p-0 
              ${!isCustom ? "!rounded-full" : ""} 
            `}
          >
            <Icon className="text-sm md:text-base transition-opacity duration-200 group-hover:opacity-90" />
          </a>
        );
      })}
    </div>
  );
});

export default SocialRow;
