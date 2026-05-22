/** Font stacks for custom theme picker (must match server pageModel enum + Google Fonts loader). */
import { staticThemes } from "./staticThemes.js";

export const CUSTOM_FONT_STACKS = {
  Inter: '"Inter", ui-sans-serif, system-ui, sans-serif',
  Poppins: '"Poppins", ui-sans-serif, system-ui, sans-serif',
  Roboto: '"Roboto", ui-sans-serif, system-ui, sans-serif',
  "Courier Prime": '"Courier Prime", ui-monospace, monospace',
  "Playfair Display": '"Playfair Display", ui-serif, Georgia, serif',
  Lato: '"Lato", ui-sans-serif, system-ui, sans-serif',
  Montserrat: '"Montserrat", ui-sans-serif, system-ui, sans-serif',
  Oswald: '"Oswald", ui-sans-serif, system-ui, sans-serif',
  Raleway: '"Raleway", ui-sans-serif, system-ui, sans-serif',
  Merriweather: '"Merriweather", ui-serif, Georgia, serif',
  Nunito: '"Nunito", ui-sans-serif, system-ui, sans-serif',
  Ubuntu: '"Ubuntu", ui-sans-serif, system-ui, sans-serif',
};

export const DEFAULT_FONT_STACK = CUSTOM_FONT_STACKS.Inter;

export function resolveCustomFontStack(fontName) {
  if (!fontName) return DEFAULT_FONT_STACK;
  return CUSTOM_FONT_STACKS[fontName] || DEFAULT_FONT_STACK;
}

/** Map static theme fontClass (font-sans / font-mono / font-serif) to loaded Google families. */
export function resolveStaticFontStack(fontClass = "") {
  if (fontClass.includes("font-mono")) {
    return CUSTOM_FONT_STACKS["Courier Prime"];
  }
  if (fontClass.includes("font-serif")) {
    return CUSTOM_FONT_STACKS["Playfair Display"];
  }
  return DEFAULT_FONT_STACK;
}

const GOOGLE_FONT_SPECS = {
  Inter: "Inter:wght@100..900",
  Poppins: "Poppins:wght@100;200;300;400;500;600;700;800;900",
  Roboto: "Roboto:wght@100;300;400;500;700;900",
  "Courier Prime": "Courier+Prime",
  "Playfair Display": "Playfair+Display:wght@400..900",
  Lato: "Lato:wght@100;300;400;700;900",
  Montserrat: "Montserrat:wght@100..900",
  Oswald: "Oswald:wght@200..700",
  Raleway: "Raleway:wght@100..900",
  Merriweather: "Merriweather:wght@300;400;700;900",
  Nunito: "Nunito:wght@200..1000",
  Ubuntu: "Ubuntu:wght@300;400;500;700",
};

export function resolveThemeFontName(user) {
  if (!user) return "Inter";
  if (user.customTheme?.enabled && user.customTheme.fontFamily) {
    return user.customTheme.fontFamily;
  }

  const staticTheme =
    staticThemes.find((theme) => theme.title === user.theme) || staticThemes[0];
  const fontClass = staticTheme?.fontClass || "";

  if (fontClass.includes("font-mono")) return "Courier Prime";
  if (fontClass.includes("font-serif")) return "Playfair Display";
  return "Inter";
}

export function getGoogleFontsUrl(fontNames = []) {
  const families = [...new Set(fontNames)]
    .filter((name) => GOOGLE_FONT_SPECS[name])
    .map((name) => `family=${GOOGLE_FONT_SPECS[name]}`);

  if (families.length === 0) return null;

  return `https://fonts.googleapis.com/css2?${families.join("&")}&display=swap`;
}

export function getThemeGoogleFontsUrl(user) {
  return getGoogleFontsUrl([resolveThemeFontName(user)]);
}
