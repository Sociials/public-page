import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  computeMasonryLayout,
  getColumnCount,
  getItemRatio,
  loadImageDimensions,
} from "./galleryLayout.js";

const GAP = 12;

function useGalleryRatios(items) {
  const [ratios, setRatios] = useState({});

  useEffect(() => {
    let cancelled = false;
    const seeded = {};

    items.forEach((item, index) => {
      if (item?.width && item?.height) {
        seeded[index] = item.width / item.height;
      } else if (item?.image) {
        seeded[index] = 1;
      }
    });

    setRatios(seeded);

    items.forEach((item, index) => {
      if (item?.width && item?.height) return;
      if (!item?.image) return;

      loadImageDimensions(item.image)
        .then(({ width, height }) => {
          if (!cancelled) {
            setRatios((prev) => ({ ...prev, [index]: width / height }));
          }
        })
        .catch(() => {
          if (!cancelled) {
            setRatios((prev) => ({ ...prev, [index]: 1 }));
          }
        });
    });

    return () => {
      cancelled = true;
    };
  }, [items]);

  return ratios;
}

function useContainerWidth(ref) {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    const update = () => {
      setWidth(node.clientWidth || 0);
    };

    update();
    const observer = new ResizeObserver(update);
    observer.observe(node);
    return () => observer.disconnect();
  }, [ref]);

  return width;
}

const MasonryTile = ({ cell, textClass, textStyle }) => {
  const { item, index, left, top, width, height, cropped } = cell;
  const captionSpace = item.caption ? 22 : 0;

  return (
    <figure
      className="absolute m-0 transition-[top,left,width,height] duration-300 ease-out"
      style={{
        left,
        top,
        width,
        height: height + captionSpace,
      }}
    >
      <div
        className="w-full overflow-hidden rounded-xl border-2 border-black shadow-[3px_3px_0px_#000] bg-gray-100"
        style={{ height }}
      >
        {item.image ? (
          <img
            src={item.image}
            alt={item.caption || `Gallery image ${index + 1}`}
            className="w-full h-full object-cover"
            loading="lazy"
            decoding="async"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 animate-pulse" />
        )}
      </div>
      {item.caption && (
        <figcaption
          className={`mt-1.5 text-[11px] font-medium opacity-80 line-clamp-2 px-0.5 ${textClass}`}
          style={textStyle}
        >
          {item.caption}
        </figcaption>
      )}
    </figure>
  );
};

const PinterestMasonryGrid = ({ items = [], textClass = "", textStyle = {} }) => {
  const containerRef = useRef(null);
  const containerWidth = useContainerWidth(containerRef);
  const ratios = useGalleryRatios(items);

  const columnCount = getColumnCount(containerWidth);

  const layout = useMemo(
    () =>
      computeMasonryLayout({
        items,
        ratios,
        containerWidth,
        columnCount,
        gap: GAP,
      }),
    [items, ratios, containerWidth, columnCount],
  );

  if (!items.length) return null;

  return (
    <div ref={containerRef} className="relative w-full" style={{ height: layout.height || 0 }}>
      {layout.cells.map((cell) => (
        <MasonryTile
          key={cell.item._id || `${cell.item.image}-${cell.index}`}
          cell={cell}
          textClass={textClass}
          textStyle={textStyle}
        />
      ))}
    </div>
  );
};

export default PinterestMasonryGrid;
