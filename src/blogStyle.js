export const DEFAULT_BLOG_STYLE = {
  align: "left",
  padding: "md",
  maxWidth: "medium",
  titleUnderline: true,
  titleDivider: true,
  contentCard: true,
  titleSize: "lg",
  bodySize: "md",
};

export const mergeBlogStyle = (style = {}) => ({
  ...DEFAULT_BLOG_STYLE,
  ...(style && typeof style === "object" ? style : {}),
});

const ALIGN_CLASS = {
  left: "text-left items-start",
  center: "text-center items-center",
  right: "text-right items-end",
};

const PADDING_CLASS = {
  none: "p-0",
  sm: "p-3 sm:p-4",
  md: "p-4 sm:p-6",
  lg: "p-6 sm:p-8",
};

const TITLE_SIZE_CLASS = {
  sm: "text-xl sm:text-2xl",
  md: "text-2xl sm:text-3xl",
  lg: "text-3xl sm:text-4xl",
};

const BODY_SIZE_CLASS = {
  sm: "text-sm leading-relaxed",
  md: "text-base leading-relaxed",
  lg: "text-lg leading-loose",
};

const MAX_WIDTH_CLASS = {
  narrow: "max-w-md",
  medium: "max-w-xl",
  full: "max-w-full",
};

export const getBlogLayoutClasses = (style = {}) => {
  const s = mergeBlogStyle(style);
  const align = ALIGN_CLASS[s.align] || ALIGN_CLASS.left;
  const isCenter = s.align === "center";

  return {
    wrapper: [
      "w-full mt-2 mb-10 flex flex-col",
      align,
      isCenter ? "mx-auto" : "",
      MAX_WIDTH_CLASS[s.maxWidth || "medium"] || MAX_WIDTH_CLASS.medium,
    ]
      .filter(Boolean)
      .join(" "),
    inner: [
      "w-full flex flex-col",
      align,
      s.contentCard
        ? "rounded-2xl border border-black/10 bg-white/60 backdrop-blur-sm shadow-[0_8px_30px_rgba(0,0,0,0.06)]"
        : "",
      PADDING_CLASS[s.padding] || PADDING_CLASS.md,
    ]
      .filter(Boolean)
      .join(" "),
    title: [
      "font-black break-words tracking-tight",
      TITLE_SIZE_CLASS[s.titleSize] || TITLE_SIZE_CLASS.lg,
      s.titleUnderline ? "pb-2 border-b-2 border-current/20" : "",
    ]
      .filter(Boolean)
      .join(" "),
    subtitle: "text-sm sm:text-base opacity-75 font-medium mt-3 italic",
    divider: s.titleDivider ? "w-full h-px bg-current/15 my-5" : "",
    body: [
      "whitespace-pre-wrap break-words opacity-95",
      BODY_SIZE_CLASS[s.bodySize] || BODY_SIZE_CLASS.md,
      "[overflow-wrap:anywhere]",
    ].join(" "),
  };
};
