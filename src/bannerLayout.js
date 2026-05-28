/**
 * Profile banner heights + avatar overlap (half on banner, half below).
 * Avatar: 80px mobile (w-20), 125px desktop (md:w-[125px]).
 */
export const BANNER_FULL_BLEED_CLASS =
  "w-full h-32 sm:h-36 md:h-44 bg-cover bg-center";

export const BANNER_FLOATING_CLASS =
  "w-full h-28 sm:h-32 md:h-36 rounded-[20px] bg-cover bg-center border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)]";

export const BANNER_FULL_BLEED_PREVIEW_CLASS =
  "w-full h-28 bg-cover bg-center";

export const BANNER_FLOATING_PREVIEW_CLASS =
  "w-full h-24 rounded-3xl bg-cover bg-center border-4 border-black shadow-[6px_6px_0px_#000]";

/** Pull profile up by half the avatar height (centered on banner bottom edge) */
export const BANNER_PROFILE_OVERLAP_CLASS = "-mt-10 md:-mt-[62px]";
export const BANNER_PROFILE_OVERLAP_PREVIEW_CLASS = "-mt-10";
