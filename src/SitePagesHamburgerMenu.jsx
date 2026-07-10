import React, { useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { FaBars, FaXmark } from "react-icons/fa6";
import { getPageNavIcon, resolvePageHref } from "./sitePageNav.js";

/**
 * Themed hamburger for switching between a creator's site pages.
 * Menu is portaled + fixed so overflow:hidden ancestors cannot swallow clicks.
 */
export default function SitePagesHamburgerMenu({
  sitePages = [],
  username = "",
  activeHref = "",
  pendingHref = null,
  LinkComponent,
  onPageNavigate,
  textClass = "",
  overlay = false,
  isCustom = false,
  customButton = null,
  size = "md",
  className = "",
}) {
  const [open, setOpen] = useState(false);
  const [menuPos, setMenuPos] = useState({ top: 0, right: 0 });
  const rootRef = useRef(null);
  const menuRef = useRef(null);
  const menuId = useId();
  const LinkTag = LinkComponent || "a";
  const isCompact = size === "sm";

  const updateMenuPosition = () => {
    const trigger = rootRef.current;
    if (!trigger) return;
    const rect = trigger.getBoundingClientRect();
    setMenuPos({
      top: rect.bottom + 8,
      right: Math.max(8, window.innerWidth - rect.right),
    });
  };

  useLayoutEffect(() => {
    if (!open) return undefined;
    updateMenuPosition();
    const onReposition = () => updateMenuPosition();
    window.addEventListener("resize", onReposition);
    window.addEventListener("scroll", onReposition, true);
    return () => {
      window.removeEventListener("resize", onReposition);
      window.removeEventListener("scroll", onReposition, true);
    };
  }, [open]);

  useEffect(() => {
    if (!open) return undefined;
    const onPointerDown = (e) => {
      const inTrigger = rootRef.current?.contains(e.target);
      const inMenu = menuRef.current?.contains(e.target);
      if (!inTrigger && !inMenu) setOpen(false);
    };
    const onKeyDown = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  useEffect(() => {
    setOpen(false);
  }, [activeHref]);

  if (sitePages.length <= 1) return null;

  const btn = customButton || {};
  const accent = isCustom ? btn.backgroundColor || "#15F5BA" : "#15F5BA";
  const accentText = isCustom ? btn.textColor || "#000000" : "#000000";

  const useGlass = overlay;
  const useButtonPanel = isCustom && !overlay;

  const triggerRadius =
    isCustom && btn.shape === "sharp"
      ? "0px"
      : isCustom && btn.shape === "rounded"
        ? "10px"
        : "9999px";

  const customTriggerStyle = useButtonPanel
    ? {
        backgroundColor:
          btn.style === "outline" ? "transparent" : btn.backgroundColor || "#000",
        color:
          btn.style === "outline"
            ? btn.backgroundColor || "#000"
            : btn.textColor || "#fff",
        border:
          btn.style?.includes("shadow")
            ? "2px solid black"
            : `2px solid ${btn.backgroundColor || "#000"}`,
        borderRadius: triggerRadius,
        boxShadow:
          btn.style === "hard-shadow"
            ? `3px 3px 0px ${btn.shadowColor || "#000"}`
            : btn.style === "soft-shadow"
              ? `0 3px 10px ${btn.shadowColor || "#000"}40`
              : "none",
      }
    : undefined;

  const buttonSize = isCompact ? "h-7 w-7" : "h-9 w-9";
  const iconSize = isCompact ? 12 : 16;

  const glassTriggerClass =
    "rounded-full bg-black/30 backdrop-blur-md border border-white/15 text-white hover:bg-black/50 hover:scale-105 active:scale-95";

  const defaultTriggerClass = `rounded-full transition-all duration-200 hover:bg-black/5 active:scale-95 ${textClass}`;

  const navigateTo = (href, e) => {
    if (!href || href === "#" || href === activeHref) {
      e?.preventDefault();
      return;
    }
    if (onPageNavigate) {
      e?.preventDefault();
      setOpen(false);
      onPageNavigate(href);
      return;
    }
    setOpen(false);
  };

  const panelRadius =
    isCustom && btn.shape === "sharp"
      ? "0px"
      : isCustom && btn.shape === "rounded"
        ? "14px"
        : "18px";

  const buttonPanelStyle = useButtonPanel
    ? {
        backgroundColor:
          btn.style === "outline" ? "rgba(255,255,255,0.92)" : btn.backgroundColor || "#000",
        color:
          btn.style === "outline"
            ? btn.backgroundColor || "#000"
            : btn.textColor || "#fff",
        border:
          btn.style?.includes("shadow")
            ? "2px solid black"
            : `2px solid ${btn.backgroundColor || "#000"}`,
        borderRadius: panelRadius,
        boxShadow:
          btn.style === "hard-shadow"
            ? `4px 4px 0px ${btn.shadowColor || "#000"}`
            : btn.style === "soft-shadow"
              ? `0 10px 28px ${btn.shadowColor || "#000"}35`
              : "none",
      }
    : undefined;

  const glassPanelClass =
    "rounded-[18px] border border-white/20 bg-black/40 text-white shadow-[0_12px_40px_rgba(0,0,0,0.35)] backdrop-blur-xl";

  const frostPanelClass =
    "rounded-[18px] border border-black/10 bg-white/55 text-black shadow-[0_12px_40px_rgba(0,0,0,0.12)] backdrop-blur-xl";

  const panelClass = useGlass
    ? glassPanelClass
    : useButtonPanel
      ? ""
      : frostPanelClass;

  const menu =
    open &&
    typeof document !== "undefined" &&
    createPortal(
      <div
        ref={menuRef}
        id={menuId}
        role="menu"
        style={{
          ...buttonPanelStyle,
          position: "fixed",
          top: menuPos.top,
          right: menuPos.right,
          zIndex: 9999,
        }}
        className={`w-[min(16rem,calc(100vw-2rem))] overflow-hidden p-1.5 ${panelClass}`}
      >
        <p
          className={`px-3 pb-1.5 pt-2 text-[9px] font-black uppercase tracking-[0.2em] ${
            useGlass ? "text-white/50" : "opacity-45"
          }`}
        >
          Pages
        </p>
        <div className="flex flex-col gap-0.5">
          {sitePages.map((page) => {
            const href = resolvePageHref(page, username);
            const isActive = activeHref === href;
            const isPending = pendingHref === href && !isActive;
            const Icon = getPageNavIcon(page);

            const itemClass = useGlass
              ? isActive
                ? "bg-white/20 text-white"
                : "text-white/80 hover:bg-white/10 hover:text-white"
              : useButtonPanel
                ? ""
                : isActive
                  ? "bg-black/10 text-black"
                  : "text-black/70 hover:bg-black/5 hover:text-black";

            return (
              <LinkTag
                key={page.publicPath || page.slug || page.title}
                href={href}
                role="menuitem"
                onClick={(e) => navigateTo(href, e)}
                className={`flex items-center gap-3 rounded-xl px-2.5 py-2.5 text-sm font-semibold transition-all ${
                  isPending ? "pointer-events-none opacity-40" : ""
                } ${itemClass}`}
                style={
                  useButtonPanel
                    ? isActive
                      ? {
                          backgroundColor:
                            btn.style === "outline"
                              ? `${accent}22`
                              : "rgba(255,255,255,0.18)",
                          fontWeight: 800,
                        }
                      : { opacity: 0.78 }
                    : undefined
                }
                aria-current={isActive ? "page" : undefined}
                aria-busy={isPending || undefined}
              >
                <span
                  className={`inline-flex h-8 w-8 shrink-0 items-center justify-center text-[13px] ${
                    useGlass || !useButtonPanel
                      ? isActive
                        ? useGlass
                          ? "rounded-full bg-white text-black"
                          : "rounded-full bg-black text-white"
                        : useGlass
                          ? "rounded-full bg-white/15 text-white"
                          : "rounded-full bg-black/10 text-black/70"
                      : "rounded-lg"
                  }`}
                  style={
                    useButtonPanel
                      ? isActive
                        ? {
                            backgroundColor: accent,
                            color: accentText,
                            borderRadius:
                              triggerRadius === "9999px" ? "9999px" : "8px",
                          }
                        : {
                            backgroundColor: "rgba(0,0,0,0.08)",
                            borderRadius: "8px",
                          }
                      : undefined
                  }
                >
                  <Icon aria-hidden />
                </span>
                <span className="truncate">{page.title}</span>
              </LinkTag>
            );
          })}
        </div>
      </div>,
      document.body,
    );

  return (
    <div ref={rootRef} className={`relative ${className}`}>
      <button
        type="button"
        aria-label={open ? "Close pages menu" : "Open pages menu"}
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((value) => !value)}
        style={customTriggerStyle}
        className={`inline-flex ${buttonSize} items-center justify-center transition-all duration-200 ${
          useGlass
            ? glassTriggerClass
            : useButtonPanel
              ? "hover:brightness-110 active:scale-95"
              : defaultTriggerClass
        }`}
      >
        {open ? (
          <FaXmark size={iconSize} aria-hidden />
        ) : (
          <FaBars size={iconSize} aria-hidden />
        )}
      </button>
      {menu}
    </div>
  );
}
