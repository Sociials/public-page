import { getThemeGoogleFontsUrl } from "./fonts.js";

export default function ThemeFontLoader({ user }) {
  const href = getThemeGoogleFontsUrl(user);
  if (!href) return null;

  return (
    <link rel="stylesheet" href={href} data-theme-font="true" />
  );
}
