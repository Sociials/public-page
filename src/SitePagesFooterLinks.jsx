import React from "react";
import { resolvePageHref } from "./sitePageNav.js";

/**
 * Simple footer text links between a creator's site pages.
 */
export default function SitePagesFooterLinks({
  sitePages = [],
  username = "",
  activeHref = "",
  pendingHref = null,
  LinkComponent,
  onPageNavigate,
  textClass = "",
  className = "",
}) {
  const LinkTag = LinkComponent || "a";

  if (sitePages.length <= 1) return null;

  const navigateTo = (href, e) => {
    if (!href || href === activeHref) {
      e?.preventDefault();
      return;
    }
    onPageNavigate?.(href);
  };

  return (
    <nav
      className={`mb-3 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 px-4 text-center text-[11px] ${textClass} ${className}`}
      aria-label="Site pages"
    >
      {sitePages.map((page, index) => {
        const href = resolvePageHref(page, username);
        const isActive = activeHref === href;
        const isPending = pendingHref === href && !isActive;

        return (
          <React.Fragment key={page.publicPath || page.slug || page.title}>
            {index > 0 && (
              <span className="opacity-30" aria-hidden>
                ·
              </span>
            )}
            <LinkTag
              href={href}
              onClick={(e) => navigateTo(href, e)}
              className={`font-semibold transition-colors underline-offset-2 hover:underline ${
                isActive ? "opacity-100" : "opacity-50 hover:opacity-100"
              } ${isPending ? "pointer-events-none opacity-30" : ""}`}
              aria-current={isActive ? "page" : undefined}
              aria-busy={isPending || undefined}
            >
              {page.title}
            </LinkTag>
          </React.Fragment>
        );
      })}
    </nav>
  );
}
