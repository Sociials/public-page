/**
 * Safe hover for theme buttons.
 * Uses Tailwind utilities only (no injected CSS, no ::after, no position on children)
 * so icon centering stays intact and hover always ships in the CSS bundle.
 */

/** Remove legacy injected stylesheets that broke layout / hid hover */
export const ensureButtonInteractStyles = () => {
  if (typeof document === "undefined") return;
  document.getElementById("sociials-btn-interact-styles")?.remove();
  document.getElementById("sociials-btn-interact-styles-v2")?.remove();
  document.getElementById("sociials-btn-interact-styles-v3")?.remove();
};

export const getCustomButtonColors = (btnConfig = {}) => {
  const bg = btnConfig.backgroundColor || "#000000";
  const fg = btnConfig.textColor || "#FFFFFF";
  const style = btnConfig.style || "solid";

  if (style === "outline" || style === "dashed") {
    return {
      backgroundColor: "transparent",
      color: style === "dashed" ? fg : bg,
      borderColor: bg,
    };
  }

  if (style === "glass") {
    return {
      backgroundColor: "rgba(255, 255, 255, 0.22)",
      color: fg,
      borderColor: "rgba(255, 255, 255, 0.35)",
    };
  }

  return {
    backgroundColor: bg,
    color: fg,
    borderColor: bg,
  };
};

export const getCustomButtonStyle = (btnConfig = {}, { radius, shadow } = {}) => {
  const colors = getCustomButtonColors(btnConfig);
  const style = btnConfig.style || "solid";
  const shadowColor = btnConfig.shadowColor || "#000000";

  const base = {
    backgroundColor: colors.backgroundColor,
    color: colors.color,
    borderRadius: radius,
    fontFamily: btnConfig.fontFamily,
  };

  if (style === "glass") {
    return {
      ...base,
      border: `1px solid ${colors.borderColor}`,
      backdropFilter: "blur(12px)",
      WebkitBackdropFilter: "blur(12px)",
      boxShadow: shadow || "0 4px 20px rgba(0,0,0,0.12)",
    };
  }

  if (style === "brutal") {
    return {
      ...base,
      border: "3px solid #000000",
      boxShadow: shadow || `6px 6px 0px ${shadowColor}`,
    };
  }

  if (style === "dashed") {
    return {
      ...base,
      border: `2px dashed ${colors.borderColor}`,
      boxShadow: shadow || "none",
    };
  }

  if (style === "outline") {
    return {
      ...base,
      border: `2px solid ${colors.borderColor}`,
      boxShadow: shadow || "none",
    };
  }

  if (style === "hard-shadow") {
    return {
      ...base,
      border: "2px solid #000000",
      boxShadow: shadow || `4px 4px 0px ${shadowColor}`,
    };
  }

  if (style === "soft-shadow") {
    return {
      ...base,
      border: "none",
      boxShadow: shadow || `0 4px 15px ${shadowColor}40`,
    };
  }

  return {
    ...base,
    border: `2px solid ${colors.borderColor}`,
    boxShadow: shadow || "none",
  };
};

// Full class strings so Tailwind @source picks them up from this file.
export const CUSTOM_BTN_INTERACT_CLASS =
  "transition-[filter] duration-200 ease-out hover:brightness-125 active:brightness-90";

export const STATIC_BTN_INTERACT_CLASS =
  "transition-[filter] duration-200 ease-out hover:brightness-125 active:brightness-90";
