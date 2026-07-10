import React from "react";
import ShareIcon from "./ShareIcon.jsx";
import {
  FaYoutube,
  FaInstagram,
  FaTiktok,
  FaSpotify,
  FaTwitter,
  FaLinkedin,
  FaGithub,
  FaTwitch,
  FaSoundcloud,
  FaLink,
  FaCheck,
  FaWhatsapp,
  FaPhone,
  FaCalendarCheck,
} from "react-icons/fa6";
import { getLinkAnchorProps, resolveLinkHref } from "./linkHref.js";
import {
  CUSTOM_BTN_INTERACT_CLASS,
  STATIC_BTN_INTERACT_CLASS,
  ensureButtonInteractStyles,
  getCustomButtonColors,
  getCustomButtonStyle,
} from "./buttonInteraction.js";

// 1. Helper to get YouTube Thumbnail URL
const getYouTubeThumbnail = (url) => {
  if (!url) return null;
  const regExp =
    /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[7].length === 11
    ? `https://img.youtube.com/vi/${match[7]}/hqdefault.jpg`
    : null;
};

// 2. Icon Mapper
const getPlatformIcon = (type) => {
  switch (type) {
    case "youtube":
      return <FaYoutube className="text-[#FF0000]" />;
    case "instagram":
      return <FaInstagram className="text-[#E1306C]" />;
    case "tiktok":
      return <FaTiktok className="text-black" />;
    case "spotify":
      return <FaSpotify className="text-[#1DB954]" />;
    case "twitter":
      return <FaTwitter className="text-[#1DA1F2]" />;
    case "linkedin":
      return <FaLinkedin className="text-[#0077B5]" />;
    case "github":
      return <FaGithub className="text-black" />;
    case "twitch":
      return <FaTwitch className="text-[#9146FF]" />;
    case "whatsapp":
      return <FaWhatsapp className="text-[#25D366]" />;
    case "phone":
      return <FaPhone className="text-[#15F5BA]" />;
    case "booking":
      return <FaCalendarCheck className="text-[#FF6B6B]" />;
    case "soundcloud":
      return <FaSoundcloud className="text-[#FF5500]" />;
    default:
      return <FaLink className="text-gray-600" />;
  }
};

const LinkCard = React.memo(function LinkCard({ link, theme, onClick, layout = "default" }) {
  const [copied, setCopied] = React.useState(false);

  React.useEffect(() => {
    ensureButtonInteractStyles();
  }, []);

  // Safe URL + anchor attributes (tel: / wa.me supported)
  const anchorProps = getLinkAnchorProps(link);
  const safeUrl = anchorProps.href;

  // --- SHARE HANDLER ---
  const handleShare = (e) => {
    e.preventDefault(); // Stop link navigation
    e.stopPropagation(); // Stop event bubbling

    if (navigator.share) {
      // Mobile native share
      navigator
        .share({
          title: link.title,
          url: safeUrl,
        })
        .catch((err) => console.log("Share cancelled", err));
    } else {
      // Desktop clipboard fallback
      navigator.clipboard.writeText(safeUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // ---------------------------------------------------------
  // LOGIC: DETERMINE IF WE SHOW "BIG THUMBNAIL MODE"
  // ---------------------------------------------------------
  let displayImage = link.thumbnail; // Priority 1: User uploaded cover image

  // Priority 2: Auto-detect YouTube thumbnail if no custom cover exists
  if (!displayImage && link.type === "youtube") {
    displayImage = getYouTubeThumbnail(resolveLinkHref(link?.url));
  }

  // --- HELPER: RENDER ICON (Custom Image OR Default SVG) ---
  const renderIcon = (context) => {
    // 1. Custom Uploaded Icon
    if (link.icon) {
      const sizing =
        context === "row"
          ? "w-full h-full object-cover" // Full fill for rich row
          : "w-8 h-8 rounded-full object-cover"; // Small bubble for others

      return <img src={link.icon} alt="icon" className={sizing} />;
    }

    // 2. Default Platform Icon
    const icon = getPlatformIcon(link.type);

    // Standard button: inherit theme text color (no brand red/etc.)
    if (context === "button") {
      return React.cloneElement(icon, { className: "" });
    }

    return icon;
  };

  // --- THEME RESOLUTION LOGIC ---
  const isCustom = theme?.isCustom;
  const btnConfig = theme?.button;

  const staticMediaBorderStyle =
    !isCustom && displayImage ? { borderRadius: "12px" } : undefined;

  const interactClass = isCustom
    ? CUSTOM_BTN_INTERACT_CLASS
    : STATIC_BTN_INTERACT_CLASS;

  // 1. Base Classes (no lift animation — interactClass handles hover)
  let buttonClass = isCustom
    ? interactClass
    : `${theme?.buttonClass || "bg-white border-2 border-black shadow-[4px_4px_0px_#000]"} ${interactClass}`;

  const customColors = isCustom ? getCustomButtonColors(btnConfig) : null;

  // 2. Custom Style Object
  const customStyle = isCustom
    ? {
        ...getCustomButtonStyle(btnConfig, {
          radius:
            btnConfig.shape === "pill"
              ? displayImage
                ? "22px"
                : "999px"
              : btnConfig.shape === "rounded"
                ? "12px"
                : "0px",
          shadow:
            btnConfig.style === "hard-shadow"
              ? `4px 4px 0px ${btnConfig.shadowColor}`
              : btnConfig.style === "soft-shadow"
                ? `0 4px 15px ${btnConfig.shadowColor}40`
                : "none",
        }),
        fontFamily: theme.fontFamily,
      }
    : {};

  // --- SHARE BUTTON COMPONENT (Reusable) ---
  const ShareButton = ({ className, iconClassName }) => (
    <div
      role="button"
      onClick={handleShare}
      className={`
        z-20 flex items-center justify-center cursor-pointer transition-all active:scale-90
        ${className}
      `}
      title="Share Link"
    >
      {copied ? (
        <FaCheck className="text-green-500" />
      ) : (
        <ShareIcon size={16} strokeWidth={2} className={iconClassName} />
      )}
    </div>
  );

  if (link.type === "header") {
    return (
      <a
        target="_self"
        rel="noopener noreferrer"
        style={
          isCustom
            ? { color: btnConfig.textColor, fontFamily: theme.fontFamily }
            : {}
        }
        className={`block w-full mb-4 py-2 px-3 text-center font-bold text-lg ${!isCustom ? theme.color : ""
          }`}
      >
        {link.title}
      </a>
    );
  }

  const marginClass = layout === "carousel" ? "mb-0" : "mb-4";

  // Compact card for link-group carousels — fixed size, no flex stretch
  if (layout === "carousel") {
    const carouselStyle = isCustom
      ? {
          ...customStyle,
          borderRadius: btnConfig.shape === "pill" ? "20px" : "16px",
        }
      : { borderRadius: "16px" };

    return (
      <a
        href={safeUrl}
        target={anchorProps.target}
        rel={anchorProps.rel}
        onClick={onClick}
        style={carouselStyle}
        className={`
          relative block w-full h-[168px] sm:h-[180px] overflow-hidden group
          ${interactClass}
          ${isCustom ? "" : "border-2 border-black shadow-[3px_3px_0px_#000] bg-white"}
        `}
      >
        {displayImage ? (
          <img
            src={displayImage}
            alt=""
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div
            className="absolute inset-0"
            style={
              isCustom
                ? { backgroundColor: btnConfig.backgroundColor, opacity: 0.9 }
                : { background: "linear-gradient(135deg, #1a1a1a 0%, #444 100%)" }
            }
          />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

        <div className="absolute top-2.5 right-2.5 w-7 h-7 rounded-lg bg-white/15 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white text-xs">
          {renderIcon("badge")}
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-3 z-10">
          <div className="min-w-0">
            <span
              className="font-bold text-white text-sm leading-snug line-clamp-2 drop-shadow-sm"
              style={isCustom ? { fontFamily: theme.fontFamily } : {}}
            >
              {link.title}
            </span>
            {link.description ? (
              <p className="text-[10px] text-white/75 line-clamp-1 mt-0.5">
                {link.description}
              </p>
            ) : null}
          </div>
        </div>
      </a>
    );
  }

  // ---------------------------------------------------------
  // RENDER OPTION A: VISUAL VARIANTS (Background, Stacked, List)
  // ---------------------------------------------------------
  if (displayImage) {
    const variant = link.displayVariant || "background";

    // 1. BACKGROUND VARIANT (Default)
    if (variant === "background") {
      return (
        <a
          href={safeUrl}
          target={anchorProps.target}
          rel={anchorProps.rel}
          onClick={onClick}
          style={isCustom ? customStyle : staticMediaBorderStyle}
          className={`
            relative block w-full ${marginClass} !p-0 overflow-hidden group 
            aspect-[16/9] sm:aspect-[2/1] 
            ${interactClass}
            ${buttonClass}
          `}
        >
          {/* Background Image */}
          <img
            src={displayImage}
            alt={link.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />

          {/* Gradient Overlay - Stronger at bottom for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          {/* Corner Logo Badge - Cleaned up */}
          <div className="absolute top-3 right-3 bg-white/10 backdrop-blur-md p-2 rounded-lg border border-white/20 shadow-sm flex items-center justify-center transition-transform group-hover:scale-110">
            {renderIcon("badge")}
          </div>

          {/* Title & share */}
          <div className="absolute bottom-0 left-0 right-0 p-5 flex items-end justify-between z-10 gap-4">
            <div className="flex-1 min-w-0">
              <span
                className="font-bold text-white text-lg leading-tight line-clamp-2 text-left drop-shadow-sm"
                style={isCustom ? { fontFamily: theme.fontFamily } : {}}
              >
                {link.title}
              </span>
            </div>

            <div
              onClick={handleShare}
              className="w-10 h-10 shrink-0 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-md text-white border border-white/20 hover:bg-white hover:text-black transition-all cursor-pointer active:scale-95"
            >
              {copied ? <FaCheck /> : <ShareIcon size={14} strokeWidth={2} />}
            </div>
          </div>
        </a>
      );
    }

    // 2. STACKED VARIANT
    if (variant === "stacked") {
      return (
        <a
          href={safeUrl}
          target={anchorProps.target}
          rel={anchorProps.rel}
          onClick={onClick}
          style={isCustom ? customStyle : staticMediaBorderStyle}
          className={`
            block w-full ${marginClass} !p-0 overflow-hidden group 
            ${interactClass}
            flex flex-col
            ${buttonClass}
          `}
        >
          {/* Top Image */}
          <div className="w-full aspect-[2/1] bg-gray-100 relative overflow-hidden">
            <img
              src={displayImage}
              alt={link.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />

            {/* Overlay Gradient for contrast if needed, or just clean image */}
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors" />

            {/* Type Badge (Top Left) */}
            <div className="absolute top-2 left-2 bg-black/60 backdrop-blur-md text-white px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider shadow-sm">
              {link.type}
            </div>

            {/* Share (Bottom Right of Image) */}
            <div className="absolute bottom-2 right-2 flex items-center">
              <div
                onClick={handleShare}
                className="p-1.5 rounded-full bg-white/90 backdrop-blur-sm text-black hover:bg-white hover:scale-110 transition-all shadow-sm cursor-pointer"
                title="Share"
              >
                {copied ? <FaCheck size={10} className="text-green-600" /> : <ShareIcon size={10} strokeWidth={2} />}
              </div>
            </div>
          </div>

          {/* Bottom Content - Minimal */}
          <div className="px-4 py-3 text-left flex flex-col justify-center min-h-[60px]">
            <span className="font-bold text-base leading-tight line-clamp-1">
              {link.title}
            </span>
            {link.description && (
              <p className="text-xs opacity-70 line-clamp-1 leading-relaxed font-medium mt-1">
                {link.description}
              </p>
            )}
          </div>
        </a>
      );
    }

    // 3. LIST VARIANT
    if (variant === "list") {
      return (
        <a
          href={safeUrl}
          target={anchorProps.target}
          rel={anchorProps.rel}
          onClick={onClick}
          style={isCustom ? customStyle : staticMediaBorderStyle}
          className={`
            flex items-center w-full ${marginClass} !p-3 overflow-hidden group gap-4
            ${interactClass}
            ${buttonClass}
          `}
        >
          {/* Left Thumbnail - Fixed Size, Rounded matches internal container logic or standard */}
          <div className="w-16 h-16 shrink-0 rounded-lg overflow-hidden bg-gray-100 shadow-sm relative">
            <img
              src={displayImage}
              alt={link.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            {/* Small Type Icon overlay */}
            <div className="absolute bottom-0 right-0 bg-white/90 p-1 rounded-tl-lg">
              {renderIcon("badge")}
            </div>
          </div>

          {/* Right Content */}
          <div className="flex-1 min-w-0 text-left flex flex-col justify-center">
            <h3 className="font-bold text-base leading-tight truncate">
              {link.title}
            </h3>
            {link.description && (
              <p className="text-xs opacity-70 line-clamp-1 leading-relaxed mt-0.5">
                {link.description}
              </p>
            )}
            {!link.description && (
              <p className="text-[10px] opacity-50 uppercase font-bold tracking-wider mt-1">{link.type}</p>
            )}
          </div>

          {/* Right Action */}
          <div className="flex items-center pr-2">
            <div
              onClick={handleShare}
              className="p-2 rounded-full hover:bg-black/5 opacity-0 group-hover:opacity-100 transition-all cursor-pointer"
            >
              {copied ? <FaCheck className="text-green-600" /> : <ShareIcon size={14} strokeWidth={2} />}
            </div>
          </div>
        </a>
      );
    }
  }

  // ---------------------------------------------------------
  // RENDER OPTION B: RICH ROW (Icon Left | Text Middle)
  // ---------------------------------------------------------
  const isRichPlatform = [
    "instagram",
    "tiktok",
    "spotify",
    "twitter",
    "github",
    "linkedin",
    "whatsapp",
    "phone",
    "booking",
  ].includes(link.type);

  if (isRichPlatform) {
    const staticRichRowStyle =
      !isCustom && link.icon ? { borderRadius: "12px" } : undefined;
    return (
      <a
        href={safeUrl}
        target={anchorProps.target}
        rel={anchorProps.rel}
        onClick={onClick}
        style={isCustom ? customStyle : staticRichRowStyle}
        className={`
          flex items-center w-full ${marginClass} !p-0 overflow-hidden group
          ${interactClass}
          ${buttonClass}
        `}
      >
        {/* Left Icon Block */}
        <div
          className={`w-14 h-14 flex items-center justify-center text-xl border-r-2 overflow-hidden ${!isCustom ? "bg-gray-50 border-black/5" : ""
            }`}
          style={
            isCustom ? { borderColor: customColors?.color, opacity: 0.8 } : {}
          }
        >
          {renderIcon("row")}
        </div>

        {/* Middle Text */}
        <div className="flex-1 px-4 text-left overflow-hidden">
          <p className="font-bold text-sm truncate">{link.title}</p>
          <p className="text-[10px] uppercase tracking-widest font-bold opacity-60">
            {link.type === "booking" ? "book a call" : link.type}
          </p>
        </div>

        {/* Right Actions */}
        <div className="flex items-center pr-3 opacity-60 group-hover:opacity-100 transition-opacity">
          <ShareButton className="p-2 hover:bg-black/5 rounded-full" />
        </div>
      </a>
    );
  }

  // ---------------------------------------------------------
  // RENDER OPTION C: STANDARD BUTTON (Fallback + Icon)
  // ---------------------------------------------------------
  return (
    <a
      href={safeUrl}
      target={anchorProps.target}
      rel={anchorProps.rel}
      onClick={onClick}
      style={customStyle}
      className={`
        relative block w-full ${marginClass} py-4 px-6 text-center font-bold text-lg 
        ${interactClass}
        flex items-center justify-center group
        ${buttonClass}
      `}
    >
      {/* Icon: Pinned Absolute Left */}
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl flex items-center justify-center">
        {renderIcon("button")}
      </div>

      {/* Title: Centered */}
      <span className="w-full truncate px-8">{link.title}</span>

      {/* Share: Pinned Absolute Right (Show on hover/group-focus on desktop, or always visible) */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2">
        <ShareButton
          className={`p-2 rounded-full hover:bg-black/5 ${isCustom && btnConfig.style === "solid" ? "hover:bg-white/20" : ""}`}
        />
      </div>
    </a>
  );
});

export default LinkCard;
