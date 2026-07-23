const YOUTUBE_VIDEO_ID = /^[\w-]{11}$/;

export const getYoutubeId = (url) => {
  if (!url) return null;
  const normalized = String(url).trim();

  const pathPatterns = [
    /(?:youtu\.be\/)([\w-]{11})/,
    /youtube\.com\/(?:embed\/|v\/|shorts\/|live\/)([\w-]{11})/,
  ];

  for (const pattern of pathPatterns) {
    const match = normalized.match(pattern);
    if (match?.[1] && YOUTUBE_VIDEO_ID.test(match[1])) return match[1];
  }

  const queryMatch = normalized.match(/[?&]v=([\w-]{11})/);
  if (queryMatch?.[1] && YOUTUBE_VIDEO_ID.test(queryMatch[1])) {
    return queryMatch[1];
  }

  return null;
};

export const getYoutubeThumbnailUrl = (url) => {
  const id = getYoutubeId(url);
  return id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : null;
};

export const canSmartEmbedLink = (link) => {
  const url = link?.url;
  const type = link?.type;
  if (!url || !type) return false;

  switch (type) {
    case "youtube":
      return Boolean(getYoutubeId(url));
    case "spotify":
      return /open\.spotify\.com\/(track|album|playlist|episode)\/[a-zA-Z0-9]+/i.test(
        url,
      );
    case "twitch":
      return /twitch\.tv\/[a-zA-Z0-9_]+/i.test(url);
    case "applemusic":
      return /music\.apple\.com\//i.test(url);
    case "soundcloud":
      return /soundcloud\.com/i.test(url);
    case "vimeo":
      return /vimeo\.com\/\d+/i.test(url);
    default:
      return false;
  }
};

export const detectLinkType = (url) => {
  if (!url) return "link";

  if (url.includes("youtube.com") || url.includes("youtu.be")) {
    return "youtube";
  }
  if (url.includes("open.spotify.com")) {
    return "spotify";
  }

  return "link";
};

export const SMART_EMBED_LINK_TYPES = [
  "youtube",
  "spotify",
  "twitch",
  "applemusic",
  "soundcloud",
  "vimeo",
];

export const shouldRenderSmartEmbed = (link, smartEmbedsEnabled) =>
  Boolean(smartEmbedsEnabled) &&
  SMART_EMBED_LINK_TYPES.includes(link?.type) &&
  canSmartEmbedLink(link);
