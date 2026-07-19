/** Curated full-theme palettes — one click sets background + profile + button colors. */
export const COLOR_PALETTES = [
  {
    id: "sociials",
    label: "Sociials",
    background: { type: "color", value: "#F3F2EC" },
    textColor: "#000000",
    bioColor: "#374151",
    button: { backgroundColor: "#15F5BA", textColor: "#000000", shadowColor: "#000000" },
  },
  {
    id: "midnight",
    label: "Midnight",
    background: { type: "color", value: "#0f172a" },
    textColor: "#f8fafc",
    bioColor: "#94a3b8",
    button: { backgroundColor: "#38bdf8", textColor: "#0f172a", shadowColor: "#000000" },
  },
  {
    id: "sunset",
    label: "Sunset",
    background: {
      type: "gradient",
      value: "linear-gradient(160deg, #ff6b6b 0%, #feca57 50%, #ff9ff3 100%)",
    },
    textColor: "#1a1a1a",
    bioColor: "#4a3728",
    button: { backgroundColor: "#ffffff", textColor: "#c0392b", shadowColor: "#000000" },
  },
  {
    id: "forest",
    label: "Forest",
    background: { type: "color", value: "#1a2f1a" },
    textColor: "#d4e4bc",
    bioColor: "#8fbc8f",
    button: { backgroundColor: "#95b86b", textColor: "#1a2f1a", shadowColor: "#0d1a0d" },
  },
  {
    id: "lavender",
    label: "Lavender",
    background: { type: "gradient", value: "linear-gradient(180deg, #ede9fe 0%, #fae8ff 100%)" },
    textColor: "#4c1d95",
    bioColor: "#6b21a8",
    button: { backgroundColor: "#ffffff", textColor: "#5b21b6", shadowColor: "#7c3aed" },
  },
  {
    id: "noir",
    label: "Noir",
    background: { type: "color", value: "#000000" },
    textColor: "#ffffff",
    bioColor: "#a3a3a3",
    button: { backgroundColor: "transparent", textColor: "#ffffff", shadowColor: "#ffffff" },
  },
  {
    id: "ocean",
    label: "Ocean",
    background: { type: "gradient", value: "linear-gradient(135deg, #0c4a6e 0%, #0369a1 50%, #06b6d4 100%)" },
    textColor: "#e0f2fe",
    bioColor: "#7dd3fc",
    button: { backgroundColor: "rgba(255,255,255,0.2)", textColor: "#ffffff", shadowColor: "#0c4a6e" },
  },
  {
    id: "brutal",
    label: "Brutal",
    background: { type: "color", value: "#E0E722" },
    textColor: "#000000",
    bioColor: "#1a1a1a",
    button: { backgroundColor: "#FF00A8", textColor: "#ffffff", shadowColor: "#000000" },
  },
];

export const GRADIENT_PRESETS = [
  { id: "peach", label: "Peach", value: "linear-gradient(180deg, #ffecd2 0%, #fcb69f 100%)" },
  { id: "aurora", label: "Aurora", value: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" },
  { id: "mint", label: "Mint", value: "linear-gradient(120deg, #d4fc79 0%, #96e6a1 100%)" },
  { id: "rose", label: "Rose", value: "linear-gradient(160deg, #f093fb 0%, #f5576c 100%)" },
  { id: "slate", label: "Slate", value: "linear-gradient(180deg, #1e293b 0%, #0f172a 100%)" },
  { id: "candy", label: "Candy", value: "linear-gradient(135deg, #f6d365 0%, #fda085 100%)" },
];

const DEFAULT_GRADIENT_STOPS = [
  { color: "#ffecd2", position: 0 },
  { color: "#fcb69f", position: 100 },
];

export function parseLinearGradient(value) {
  const fallback = { angle: 180, stops: DEFAULT_GRADIENT_STOPS.map((s) => ({ ...s })) };
  if (!value || !String(value).includes("linear-gradient")) return fallback;

  const match = String(value).match(/linear-gradient\(\s*(\d+(?:\.\d+)?)deg\s*,\s*(.+)\s*\)/i);
  if (!match) return fallback;

  const angle = Math.round(Number(match[1]));
  const stops = [];
  const stopPattern = /(#[0-9a-fA-F]{3,8})\s+(\d+(?:\.\d+)?)%/gi;
  let stopMatch;
  while ((stopMatch = stopPattern.exec(match[2])) !== null) {
    stops.push({
      color: normalizeHex(stopMatch[1]),
      position: Math.round(Number(stopMatch[2])),
    });
  }

  if (stops.length < 2) return fallback;
  return { angle, stops };
}

export function buildLinearGradient({ angle = 180, stops = DEFAULT_GRADIENT_STOPS }) {
  const sorted = [...stops].sort((a, b) => a.position - b.position);
  const parts = sorted.map((stop) => `${normalizeHex(stop.color)} ${stop.position}%`).join(", ");
  return `linear-gradient(${angle}deg, ${parts})`;
}

export const CUSTOM_BUTTON_STYLES = [
  { id: "solid", label: "Solid" },
  { id: "outline", label: "Outline" },
  { id: "hard-shadow", label: "Hard Shadow" },
  { id: "soft-shadow", label: "Soft Shadow" },
  { id: "glass", label: "Glass", proOnly: true },
  { id: "brutal", label: "Brutal", proOnly: true },
  { id: "dashed", label: "Dashed", proOnly: true },
];

const HEX_RE = /^#?([0-9a-f]{3}|[0-9a-f]{6})$/i;

export function normalizeHex(color = "#000000") {
  const raw = String(color).trim();
  const match = raw.match(HEX_RE);
  if (!match) return "#000000";
  let hex = match[1];
  if (hex.length === 3) {
    hex = hex
      .split("")
      .map((c) => c + c)
      .join("");
  }
  return `#${hex.toLowerCase()}`;
}

function hexToRgb(hex) {
  const normalized = normalizeHex(hex).slice(1);
  return {
    r: parseInt(normalized.slice(0, 2), 16),
    g: parseInt(normalized.slice(2, 4), 16),
    b: parseInt(normalized.slice(4, 6), 16),
  };
}

function relativeLuminance({ r, g, b }) {
  const channel = (v) => {
    const s = v / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
}

export function getContrastRatio(foreground, background) {
  const l1 = relativeLuminance(hexToRgb(foreground));
  const l2 = relativeLuminance(hexToRgb(background));
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

/** Sample a solid color from background config for contrast checks. */
export function resolveBackgroundSampleColor(background = {}) {
  if (background.type === "color") {
    return normalizeHex(background.value || "#F3F2EC");
  }
  if (background.type === "gradient" && background.value) {
    const matches = background.value.match(/#[0-9a-fA-F]{3,8}/g);
    if (matches?.length) {
      return normalizeHex(matches[Math.floor(matches.length / 2)]);
    }
  }
  return "#888888";
}

export function getContrastWarnings(customConfig = {}) {
  const warnings = [];
  const bgSample = resolveBackgroundSampleColor(customConfig.background);
  const { usernameColor, bioColor } = resolveProfileTextColors(customConfig);
  const btn = customConfig.button || {};

  if (customConfig.background?.type === "gradient") {
    warnings.push({
      level: "info",
      message: "Gradient backgrounds vary — check username and bio readability in preview.",
    });
  }

  const usernameRatio = getContrastRatio(usernameColor, bgSample);
  if (usernameRatio < 3) {
    warnings.push({
      level: "warn",
      message: `Username contrast is low (${usernameRatio.toFixed(1)}:1). Aim for at least 3:1.`,
    });
  }

  const bioRatio = getContrastRatio(bioColor, bgSample);
  if (bioRatio < 4.5) {
    warnings.push({
      level: "warn",
      message: `Bio text contrast is low (${bioRatio.toFixed(1)}:1). Aim for at least 4.5:1.`,
    });
  }

  if (btn.style === "solid" || btn.style === "glass" || btn.style === "brutal") {
    const btnRatio = getContrastRatio(btn.textColor || "#ffffff", btn.backgroundColor || "#000000");
    if (btnRatio < 4.5) {
      warnings.push({
        level: "warn",
        message: `Button text contrast is low (${btnRatio.toFixed(1)}:1).`,
      });
    }
  }

  return warnings;
}

export function resolveProfileTextColors(customConfig = {}) {
  const fallback = customConfig.button?.textColor || "#000000";
  const usernameColor = customConfig.textColor || fallback;
  const bioColor = customConfig.bioColor || customConfig.textColor || fallback;
  return { usernameColor, bioColor };
}

export function resolveCustomPageBackgroundStyle(background = {}) {
  if (background.type === "image" && background.image) {
    return {
      backgroundColor: "#0a0a0a",
      backgroundImage: `url(${background.image})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
    };
  }
  if (background.type === "gradient" && background.value) {
    return { background: background.value };
  }
  return { backgroundColor: background.value || "#F3F2EC" };
}
