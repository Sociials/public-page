import React from "react";
import { getBlogLayoutClasses, mergeBlogStyle } from "./blogStyle.js";

const PageBlogView = ({
  user,
  textClass,
  fontClass,
  themeFontFamily,
  isCustom,
  customButton,
}) => {
  const subtitle = user?.pageContent?.subtitle || "";
  const body = user?.pageContent?.body || "";
  const title = user?.title || "Untitled";
  const style = mergeBlogStyle(user?.pageContent?.style);
  const layout = getBlogLayoutClasses(style);

  const textStyle =
    isCustom && customButton?.textColor
      ? { color: customButton.textColor, fontFamily: themeFontFamily?.fontFamily }
      : themeFontFamily;

  return (
    <article className={layout.wrapper} style={textStyle}>
      <div className={layout.inner}>
        <header className={`w-full min-w-0 max-w-full flex flex-col ${style.align === "center" ? "items-center" : style.align === "right" ? "items-end" : "items-start"}`}>
          <h2 className={`${layout.title} w-full min-w-0 ${fontClass} ${textClass}`} style={textStyle}>
            {title}
          </h2>
          {subtitle && (
            <p className={`${layout.subtitle} ${textClass}`} style={textStyle}>
              {subtitle}
            </p>
          )}
        </header>

        {layout.divider && (subtitle || body) && (
          <div
            className={layout.divider}
            style={style.align === "center" ? { marginInline: "auto" } : undefined}
            aria-hidden="true"
          />
        )}

        {body ? (
          <div className={`${layout.body} ${textClass}`} style={textStyle}>
            {body}
          </div>
        ) : (
          <p className={`${layout.body} opacity-50 py-6 font-mono ${textClass}`} style={textStyle}>
            No content yet.
          </p>
        )}
      </div>
    </article>
  );
};

export default PageBlogView;
