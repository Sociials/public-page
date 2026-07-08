export const resolveLinkHref = (url) => {
  if (!url) return "#";
  const trimmed = String(url).trim();
  if (/^(https?:\/\/|tel:|mailto:)/i.test(trimmed)) return trimmed;
  return `https://${trimmed}`;
};

/** Anchor props for public link cards — tel links open in same tab on mobile. */
export const getLinkAnchorProps = (link) => {
  const href = resolveLinkHref(link?.url);
  const isTel = link?.type === "phone" || href.startsWith("tel:");
  return {
    href,
    target: isTel ? undefined : "_blank",
    rel: isTel ? undefined : "noopener noreferrer",
  };
};
