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
  const isOutline = btnConfig.style === "outline";

  return {
    backgroundColor: isOutline ? "transparent" : bg,
    color: isOutline ? bg : fg,
    borderColor: bg,
  };
};

export const getCustomButtonStyle = (btnConfig = {}, { radius, shadow } = {}) => {
  const colors = getCustomButtonColors(btnConfig);
  return {
    backgroundColor: colors.backgroundColor,
    color: colors.color,
    border: btnConfig.style?.includes("shadow")
      ? "2px solid black"
      : `2px solid ${colors.borderColor}`,
    borderRadius: radius,
    boxShadow: shadow,
  };
};

// Full class strings so Tailwind @source picks them up from this file.
export const CUSTOM_BTN_INTERACT_CLASS =
  "transition-[filter] duration-200 ease-out hover:brightness-125 active:brightness-90";

export const STATIC_BTN_INTERACT_CLASS =
  "transition-[filter] duration-200 ease-out hover:brightness-125 active:brightness-90";
