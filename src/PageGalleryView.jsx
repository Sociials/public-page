import React from "react";
import PinterestMasonryGrid from "./PinterestMasonryGrid.jsx";

const PageGalleryView = ({ user, textClass, fontClass, themeFontFamily, isCustom, customButton, profileTextColors }) => {
  const items = (user?.gallery || [])
    .slice()
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  const title = user?.title || "Gallery";

  const textStyle =
    isCustom && profileTextColors?.usernameColor
      ? { color: profileTextColors.usernameColor, fontFamily: themeFontFamily?.fontFamily }
      : isCustom && customButton?.textColor
        ? { color: customButton.textColor, fontFamily: themeFontFamily?.fontFamily }
        : themeFontFamily;

  return (
    <div className="w-full mt-4 mb-8">
      <h2
        className={`text-2xl font-black mb-4 break-words ${fontClass} ${textClass}`}
        style={textStyle}
      >
        {title}
      </h2>
      {items.length > 0 ? (
        <PinterestMasonryGrid items={items} textClass={textClass} textStyle={textStyle} />
      ) : (
        <p className={`text-center opacity-50 py-8 text-sm font-mono ${textClass}`}>
          No images yet.
        </p>
      )}
    </div>
  );
};

export default PageGalleryView;
