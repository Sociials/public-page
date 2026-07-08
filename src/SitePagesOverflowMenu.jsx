import React, { useEffect, useId, useRef, useState } from "react";
import { FaEllipsis } from "react-icons/fa6";
import { resolvePageHref } from "./sitePageNav.js";

/**
 * Three-dot overflow menu for switching between a creator's site pages.
 */
export default function SitePagesOverflowMenu({
  sitePages = [],
  username = "",
  activeHref = "",
  pendingHref = null,
  LinkComponent,
  onPageNavigate,
  textClass = "",
  size = "md",
  className = "",
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);
  const menuId = useId();
  const LinkTag = LinkComponent || "a";
  const isCompact = size === "sm";

  useEffect(() => {
    if (!open) return undefined;
    const onPointerDown = (e) => {
      if (rootRef.current && !rootRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        setOpen(false);
      }
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

  const buttonSize = isCompact ? "h-7 w-7" : "h-8 w-8";
  const iconSize = isCompact ? 12 : 14;

  const navigateTo = (href, e) => {
    if (!href || href === activeHref) {
      e?.preventDefault();
      return;
    }
    setOpen(false);
    onPageNavigate?.(href);
  };

  return (
    <div ref={rootRef} className={`relative ${className}`}>
      <button
        type="button"
        aria-label="More pages"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((value) => !value)}
        className={`inline-flex ${buttonSize} items-center justify-center rounded-full opacity-40 transition-opacity hover:opacity-80 ${textClass}`}
      >
        <FaEllipsis size={iconSize} aria-hidden />
      </button>

      {open && (
        <div
          id={menuId}
          role="menu"
          className="absolute right-0 top-[calc(100%+4px)] z-50 min-w-[5.5rem] rounded-md bg-white py-1 shadow-[0_2px_12px_rgba(0,0,0,0.1)] ring-1 ring-black/5"
        >
          {sitePages.map((page) => {
            const href = resolvePageHref(page, username);
            const isActive = activeHref === href;
            const isPending = pendingHref === href && !isActive;

            return (
              <LinkTag
                key={page.publicPath || page.slug || page.title}
                href={href}
                role="menuitem"
                onClick={(e) => navigateTo(href, e)}
                className={`block truncate px-3 py-1 text-[11px] transition-colors ${
                  isActive ? "font-medium text-black" : "text-gray-500 hover:text-black"
                } ${isPending ? "pointer-events-none opacity-30" : ""}`}
                aria-current={isActive ? "page" : undefined}
                aria-busy={isPending || undefined}
              >
                {page.title}
              </LinkTag>
            );
          })}
        </div>
      )}
    </div>
  );
}
