/**
 * Social row layout classes — full strings for Tailwind @source inline() in app CSS.
 */
export const SOCIAL_ROW_ROOT_CLASS = "flex flex-wrap w-full gap-2 md:gap-3 mt-0";

export const SOCIAL_ROW_JUSTIFY_LEFT = "justify-start";
export const SOCIAL_ROW_JUSTIFY_CENTER = "justify-center";
export const SOCIAL_ROW_JUSTIFY_RIGHT = "justify-end";

export const resolveSocialRowJustifyClass = (align = "center") => {
  if (align === "left") return SOCIAL_ROW_JUSTIFY_LEFT;
  if (align === "right") return SOCIAL_ROW_JUSTIFY_RIGHT;
  return SOCIAL_ROW_JUSTIFY_CENTER;
};
