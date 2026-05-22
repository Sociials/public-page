/** Only true panoramas break to a full-width row (2-col) or double span (3+ cols). */
export const GALLERY_FULL_ROW_RATIO = 1.85;
export const GALLERY_PORTRAIT_RATIO = 0.88;
/** ~1.5 tile heights — keeps vertical shots compact so neighbors can sit beside them. */
export const GALLERY_MAX_PORTRAIT_HEIGHT_FACTOR = 1.52;
export const GALLERY_PORTRAIT_WIDTH_SCALE = 0.94;

export const getItemRatio = (item) => {
  if (item?.width && item?.height) {
    return item.width / item.height;
  }
  if (item?.aspectRatio) {
    return item.aspectRatio;
  }
  return 1;
};

export const isFullRowGalleryImage = (ratio, columnCount = 2) =>
  Number(ratio) >= GALLERY_FULL_ROW_RATIO && columnCount >= 2;

export const loadImageDimensions = (url) =>
  new Promise((resolve, reject) => {
    if (!url) {
      reject(new Error("Missing image url"));
      return;
    }
    const img = new Image();
    img.onload = () => {
      resolve({
        width: img.naturalWidth,
        height: img.naturalHeight,
        aspectRatio: img.naturalWidth / img.naturalHeight,
      });
    };
    img.onerror = () => reject(new Error("Failed to load image"));
    img.src = url;
  });

export const getColumnCount = (containerWidth) => {
  if (containerWidth >= 960) return 4;
  if (containerWidth >= 640) return 3;
  return 2;
};

const pickShortestColumn = (colHeights) => {
  let col = 0;
  let minHeight = colHeights[0];
  for (let i = 1; i < colHeights.length; i += 1) {
    if (colHeights[i] < minHeight) {
      minHeight = colHeights[i];
      col = i;
    }
  }
  return col;
};

const computeTileHeight = (colWidth, ratio) => {
  let height = colWidth / ratio;

  if (ratio < GALLERY_PORTRAIT_RATIO) {
    const maxHeight = colWidth * GALLERY_MAX_PORTRAIT_HEIGHT_FACTOR;
    height = Math.min(height, maxHeight);
  }

  return height;
};

/**
 * Balanced 2-column masonry: portraits stay shorter, landscapes fill the open column
 * beside them. Only panoramas span a full row.
 */
export const computeMasonryLayout = ({
  items = [],
  ratios = {},
  containerWidth = 0,
  columnCount = 2,
  gap = 12,
}) => {
  if (!containerWidth || !items.length) {
    return { cells: [], height: 0, columnWidth: 0 };
  }

  const colWidth = (containerWidth - gap * (columnCount - 1)) / columnCount;
  const colHeights = Array(columnCount).fill(0);
  const cells = [];

  items.forEach((item, index) => {
    const ratio = Math.max(0.05, ratios[index] ?? getItemRatio(item) ?? 1);
    const fullRow = isFullRowGalleryImage(ratio, columnCount);

    if (fullRow) {
      const spanCols = columnCount >= 3 ? 2 : columnCount;
      const width = colWidth * spanCols + gap * (spanCols - 1);
      const height = width / ratio;
      const top = Math.max(...colHeights, 0);
      const left = 0;

      cells.push({ item, index, left, top, width, height, wide: true, col: 0 });
      const next = top + height + gap;
      for (let i = 0; i < columnCount; i += 1) {
        colHeights[i] = next;
      }
      return;
    }

    const col = pickShortestColumn(colHeights);
    let width = colWidth;
    let left = col * (colWidth + gap);
    const top = colHeights[col];
    let height = computeTileHeight(colWidth, ratio);
    const naturalHeight = colWidth / ratio;
    const isPortrait = ratio < GALLERY_PORTRAIT_RATIO;

    if (isPortrait) {
      width = colWidth * GALLERY_PORTRAIT_WIDTH_SCALE;
      left += (colWidth - width) / 2;
    }

    cells.push({
      item,
      index,
      left,
      top,
      width,
      height,
      wide: false,
      col,
      cropped: height < naturalHeight - 1,
      isPortrait,
    });
    colHeights[col] += height + gap;
  });

  const height = Math.max(0, ...colHeights, 0) - (cells.length ? gap : 0);

  return { cells, height, columnWidth: colWidth };
};

/** @deprecated use computeMasonryLayout */
export const getBentoSpan = (ratio) => {
  const r = Number(ratio);
  if (!r || r <= 0) return { col: 1, row: 1, kind: "square" };
  if (r >= 1.55) return { col: 2, row: 1, kind: "landscape-wide" };
  if (r >= 1.15) return { col: 2, row: 1, kind: "landscape" };
  if (r <= 0.78) return { col: 1, row: 2, kind: "portrait" };
  return { col: 1, row: 1, kind: "square" };
};

export const getBentoSpanFromItem = (item) => getBentoSpan(getItemRatio(item));

/** @deprecated */
export const isWideGalleryImage = (ratio) => isFullRowGalleryImage(ratio, 2);
