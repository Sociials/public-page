import React from "react";

const resolvePageHref = (page, username) => {
  const path = page?.publicPath;
  if (path && path !== "/" && path.split("/").filter(Boolean).length >= 2) {
    return path;
  }
  const slug = String(page?.slug || "").toLowerCase();
  const user = String(username || page?.username || "").toLowerCase();
  if (user && slug && slug !== "main") {
    return `/${user}/${slug}`;
  }
  return path || "#";
};

const PageSiteNav = ({ pages = [], username = "", textClass = "" }) => {
  if (!pages.length) return null;

  return (
    <nav
      className={`w-full mt-0.5 mb-2 md:mb-4 flex flex-wrap items-center justify-center gap-x-1 gap-y-1 text-[11px] md:text-xs font-medium ${textClass}`}
      aria-label="More pages"
    >
      {pages.map((page, index) => (
        <React.Fragment key={page.publicPath || page.slug || index}>
          {index > 0 && (
            <span className="opacity-35 select-none px-0.5" aria-hidden="true">
              ·
            </span>
          )}
          <a
            href={resolvePageHref(page, username)}
            className="opacity-75 hover:opacity-100 underline underline-offset-[3px] decoration-black/25 hover:decoration-black/60 transition-opacity"
          >
            {page.title}
          </a>
        </React.Fragment>
      ))}
    </nav>
  );
};

export default PageSiteNav;
