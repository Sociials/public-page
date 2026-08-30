export const PROFILE_SHAPES = [
  { id: "circle", label: "Circle", hint: "Classic round" },
  { id: "squircle", label: "Soft square", hint: "Rounded tile" },
  { id: "capsule", label: "Pill", hint: "Wide oval" },
  { id: "hexagon", label: "Hexagon", hint: "Six sides" },
  { id: "diamond", label: "Diamond", hint: "Four points" },
  { id: "octagon", label: "Octagon", hint: "Cut corners" },
  { id: "shield", label: "Shield", hint: "Pointed base" },
  { id: "arch", label: "Arch", hint: "Rounded top" },
  { id: "clover", label: "Clover", hint: "Four petals" },
  { id: "teardrop", label: "Teardrop", hint: "Soft point" },
  { id: "pebble", label: "Blob", hint: "Organic edge" },
  { id: "star", label: "Star", hint: "Pointed burst" },
];

const CLIP = {
  hexagon: "polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%)",
  diamond: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
  octagon:
    "polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)",
  shield: "polygon(50% 0%, 94% 14%, 94% 58%, 50% 100%, 6% 58%, 6% 14%)",
  arch: "polygon(6% 100%, 6% 42%, 18% 18%, 50% 2%, 82% 18%, 94% 42%, 94% 100%)",
  clover:
    "polygon(50% 8%, 61% 28%, 84% 18%, 78% 42%, 96% 50%, 78% 58%, 84% 82%, 61% 72%, 50% 92%, 39% 72%, 16% 82%, 22% 58%, 4% 50%, 22% 42%, 16% 18%, 39% 28%)",
  teardrop: "polygon(50% 0%, 92% 42%, 78% 100%, 22% 100%, 8% 42%)",
  pebble: "polygon(22% 10%, 68% 2%, 98% 34%, 86% 78%, 52% 100%, 12% 86%, 2% 48%, 10% 18%)",
  star: "polygon(50% 0%, 61% 32%, 98% 32%, 68% 54%, 79% 90%, 50% 70%, 21% 90%, 32% 54%, 2% 32%, 39% 32%)",
};

const clip = (path) => ({
  borderRadius: 0,
  clipPath: path,
  WebkitClipPath: path,
});

export const normalizeProfileShape = (shape) => {
  const legacy = {
    loop: "pebble",
    flower: "clover",
    bloom: "clover",
    oval: "capsule",
    rounded: "squircle",
    burst: "star",
    sunwave: "star",
    petal: "teardrop",
  };
  const next = legacy[shape] || shape;
  return PROFILE_SHAPES.some((item) => item.id === next) ? next : "pebble";
};

export function getProfileShapeStyle(shape = "pebble") {
  switch (normalizeProfileShape(shape)) {
    case "circle":
      return clip("circle(50% at 50% 50%)");
    case "squircle":
      return { borderRadius: "28%", clipPath: "none", WebkitClipPath: "none" };
    case "capsule":
      return { borderRadius: "999px", clipPath: "none", WebkitClipPath: "none" };
    case "hexagon":
      return clip(CLIP.hexagon);
    case "diamond":
      return clip(CLIP.diamond);
    case "octagon":
      return clip(CLIP.octagon);
    case "shield":
      return clip(CLIP.shield);
    case "arch":
      return clip(CLIP.arch);
    case "clover":
      return clip(CLIP.clover);
    case "teardrop":
      return clip(CLIP.teardrop);
    case "star":
      return clip(CLIP.star);
    case "pebble":
    default:
      return clip(CLIP.pebble);
  }
}

export function getProfileShapeAspect(shape = "pebble") {
  const normalized = normalizeProfileShape(shape);
  if (normalized === "capsule") return "extra-wide";
  if (normalized === "shield" || normalized === "arch" || normalized === "teardrop") {
    return "tall";
  }
  return "square";
}

export function getProfileShapeFrameClass(shape = "pebble", { preview = false } = {}) {
  const aspect = getProfileShapeAspect(shape);
  if (preview) {
    if (aspect === "extra-wide") return "h-24 w-40";
    if (aspect === "tall") return "h-36 w-24";
    return "h-28 w-28";
  }
  if (aspect === "extra-wide") return "h-36 w-56 md:h-44 md:w-72";
  if (aspect === "tall") return "h-52 w-36 md:h-64 md:w-44";
  return "h-44 w-44 md:h-52 md:w-52";
}

export function getProfileShapeThumbClass(shape = "pebble") {
  const aspect = getProfileShapeAspect(shape);
  if (aspect === "extra-wide") return "h-10 w-[4.5rem]";
  if (aspect === "tall") return "h-14 w-10";
  return "h-14 w-14";
}
