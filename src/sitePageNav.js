import { FaImages, FaLink, FaPen } from "react-icons/fa";

export const resolvePageHref = (page, username) => {
  const path = page?.publicPath;
  if (path && path !== "/") {
    const segments = path.split("/").filter(Boolean);
    if (segments.length >= 2) return path;
    if (segments.length === 1) return path;
  }
  const slug = String(page?.slug || "main").toLowerCase();
  const user = String(username || page?.username || "").toLowerCase();
  if (!user) return path || "#";
  if (slug === "main" || page?.isPrimary) return `/${user}`;
  return `/${user}/${slug}`;
};

export const getPageNavIcon = (page) => {
  if (page?.pageType === "gallery") return FaImages;
  if (page?.pageType === "blog") return FaPen;
  return FaLink;
};

export const getPillClassName = ({ isActive, isPending, textClass = "" }) => {
  const base =
    "inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-full border-2 text-[10px] sm:text-[11px] font-black uppercase tracking-wide transition-all shrink-0 max-w-[9.5rem] sm:max-w-[11rem]";

  if (isActive) {
    return `${base} border-black bg-[#15F5BA] text-black shadow-[2px_2px_0px_#000] ${textClass}`;
  }
  if (isPending) {
    return `${base} border-black/25 bg-white/70 opacity-60 ${textClass}`;
  }
  return `${base} border-black/15 bg-white/90 hover:border-black hover:bg-white hover:shadow-[2px_2px_0px_rgba(0,0,0,0.15)] active:scale-[0.98] ${textClass}`;
};
