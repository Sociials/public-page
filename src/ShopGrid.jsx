"use client";
import React, { useState } from "react";
import {
  FaTag,
  FaFire,
  FaStar,
  FaShirt,
  FaMobileScreen,
  FaGraduationCap,
  FaBriefcase,
  FaLink,
  FaBox,
  FaArrowUpRightFromSquare,
} from "react-icons/fa6";

const BADGE_CONFIG = {
  sale: { label: "Sale", className: "bg-red-500 text-white" },
  hot: { label: "Hot", className: "bg-orange-500 text-white" },
  bestseller: { label: "Best", className: "bg-amber-500 text-white" },
};

const CATEGORY_CONFIG = {
  merch: { label: "Merch", icon: <FaShirt size={9} /> },
  digital: { label: "Digital", icon: <FaMobileScreen size={9} /> },
  course: { label: "Course", icon: <FaGraduationCap size={9} /> },
  service: { label: "Service", icon: <FaBriefcase size={9} /> },
  affiliate: { label: "Affiliate", icon: <FaLink size={9} /> },
  other: { label: "Other", icon: <FaBox size={9} /> },
};

const getDiscountPercent = (original, sale) => {
  const o = parseFloat(String(original).replace(/[^0-9.]/g, ""));
  const s = parseFloat(String(sale).replace(/[^0-9.]/g, ""));
  if (!o || !s || o <= s) return null;
  return Math.round(((o - s) / o) * 100);
};

const ProductCard = ({ item }) => {
  const badge = item.badge ? BADGE_CONFIG[item.badge] : null;
  const cat = CATEGORY_CONFIG[item.category] || CATEGORY_CONFIG.other;
  const discount =
    item.originalPrice && item.price
      ? getDiscountPercent(item.originalPrice, item.price)
      : null;

  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex h-full flex-col overflow-hidden rounded-xl border border-gray-200/90 bg-white shadow-sm transition-all duration-200 hover:border-gray-300 hover:shadow-md active:scale-[0.99]"
    >
      <div className="relative aspect-[5/4] overflow-hidden bg-gray-100">
        {item.image ? (
          <img
            src={item.image}
            alt={item.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-gray-300">
            {cat.icon}
          </div>
        )}

        {badge && (
          <span
            className={`absolute left-1.5 top-1.5 rounded-md px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-wide ${badge.className}`}
          >
            {badge.label}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-1 px-2.5 py-2">
        <p className="flex items-center gap-1 text-[9px] font-medium uppercase tracking-wide text-gray-400">
          {cat.icon}
          {cat.label}
        </p>

        <h3 className="line-clamp-1 text-[12px] font-semibold leading-tight text-gray-900">
          {item.title}
        </h3>

        {item.description ? (
          <p className="line-clamp-1 text-[10px] leading-snug text-gray-500">
            {item.description}
          </p>
        ) : null}

        <div className="mt-auto flex items-center justify-between gap-1.5 pt-1">
          <div className="min-w-0">
            {item.price ? (
              <div className="flex flex-wrap items-center gap-1">
                {item.originalPrice ? (
                  <span className="text-[9px] text-gray-400 line-through">
                    {item.originalPrice}
                  </span>
                ) : null}
                <span className="text-[12px] font-semibold text-gray-900">{item.price}</span>
                {discount ? (
                  <span className="text-[8px] font-semibold text-emerald-600">
                    -{discount}%
                  </span>
                ) : null}
              </div>
            ) : (
              <span className="text-[10px] font-medium text-gray-400">Free</span>
            )}
          </div>

          <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gray-100 text-gray-500 transition-colors group-hover:bg-gray-900 group-hover:text-white">
            <FaArrowUpRightFromSquare size={9} />
          </span>
        </div>
      </div>
    </a>
  );
};

const ShopGrid = ({ items }) => {
  const [activeCategory, setActiveCategory] = useState("all");

  const visibleItems = (items || [])
    .filter((item) => item.isActive !== false)
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

  if (visibleItems.length === 0) return null;

  const categories = [...new Set(visibleItems.map((i) => i.category || "other"))];
  const showFilter = categories.length > 1;

  const filtered =
    activeCategory === "all"
      ? visibleItems
      : visibleItems.filter((i) => (i.category || "other") === activeCategory);

  return (
    <div className="w-full">
      {showFilter && (
        <div
          className="mb-3 flex gap-1.5 overflow-x-auto pb-0.5 scrollbar-hide"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          <button
            type="button"
            onClick={() => setActiveCategory("all")}
            className={`shrink-0 rounded-full px-2.5 py-1 text-[9px] font-semibold transition-all ${
              activeCategory === "all"
                ? "bg-gray-900 text-white"
                : "bg-gray-100 text-gray-500 hover:bg-gray-200"
            }`}
          >
            All
          </button>
          {categories.map((c) => {
            const cfg = CATEGORY_CONFIG[c] || CATEGORY_CONFIG.other;
            return (
              <button
                key={c}
                type="button"
                onClick={() => setActiveCategory(c)}
                className={`inline-flex shrink-0 items-center gap-1 rounded-full px-2.5 py-1 text-[9px] font-semibold transition-all ${
                  activeCategory === c
                    ? "bg-gray-900 text-white"
                    : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                }`}
              >
                {cfg.icon}
                {cfg.label}
              </button>
            );
          })}
        </div>
      )}

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-2 sm:gap-2.5">
        {filtered.map((item) => (
          <ProductCard key={item._id} item={item} />
        ))}
      </div>

      {activeCategory !== "all" && (
        <div className="mt-3 text-center">
          <button
            type="button"
            onClick={() => setActiveCategory("all")}
            className="text-[9px] font-semibold uppercase tracking-wider text-gray-400 transition-colors hover:text-gray-700"
          >
            View all {visibleItems.length} items
          </button>
        </div>
      )}
    </div>
  );
};

export default ShopGrid;
