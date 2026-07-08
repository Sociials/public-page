import React from "react";
import {
  getPageNavIcon,
  getPillClassName,
  resolvePageHref,
} from "./sitePageNav.js";

/**
 * Segmented pill navigation between a creator's pages (Links / Blog / Gallery).
 *
 * @param {object} props
 * @param {Array} props.pages
 * @param {string} [props.username]
 * @param {string} [props.textClass]
 * @param {string} [props.activeHref] - current path for active pill (editor preview)
 * @param {string} [props.pendingHref] - path being navigated to (loading state)
 * @param {React.ElementType} [props.LinkComponent] - e.g. Next.js Link on frontend
 * @param {(href: string) => void} [props.onNavigate]
 */
const PageSiteNav = ({
  pages = [],
  username = "",
  textClass = "",
  activeHref = "",
  pendingHref = null,
  LinkComponent,
  onNavigate,
}) => {
  if (!pages.length) return null;

  const LinkTag = LinkComponent || "a";

  return (
    <nav
      className="w-full mt-1 mb-2 md:mb-3 flex justify-center px-1"
      aria-label="Site pages"
    >
      <div
        className={`inline-flex max-w-full flex-wrap items-center justify-center gap-1 rounded-2xl border-2 border-black/10 bg-black/[0.04] p-1 ${textClass}`}
        role="tablist"
      >
        {pages.map((page, index) => {
          const href = resolvePageHref(page, username);
          const isActive = Boolean(activeHref && activeHref === href);
          const isPending = Boolean(pendingHref && pendingHref === href && !isActive);
          const Icon = getPageNavIcon(page);
          const pillClass = getPillClassName({ isActive, isPending, textClass: "" });

          const handleClick = (e) => {
            if (isActive) {
              e.preventDefault();
              return;
            }
            if (href !== activeHref) {
              onNavigate?.(href);
            }
          };

          return (
            <LinkTag
              key={page.publicPath || page.slug || index}
              href={href}
              onClick={handleClick}
              className={pillClass}
              role="tab"
              aria-selected={isActive}
              aria-current={isActive ? "page" : undefined}
              title={page.title}
            >
              <Icon className="shrink-0 text-[11px] opacity-80" aria-hidden />
              <span className="truncate">{page.title}</span>
            </LinkTag>
          );
        })}
      </div>
    </nav>
  );
};

export default PageSiteNav;
export { resolvePageHref, getPageNavIcon, getPillClassName } from "./sitePageNav.js";
