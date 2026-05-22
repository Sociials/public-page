"use client";
import React, { useState } from "react";
import {
    FaBolt, FaTag, FaFire, FaStar,
    FaTshirt, FaMobileAlt, FaGraduationCap, FaBriefcase, FaLink, FaBox
} from "react-icons/fa";

/* ── Config ─────────────────────────────────────────────────── */

const BADGE_CONFIG = {
    new: { label: "New", icon: <FaBolt size={9} />, dot: "bg-blue-500" },
    sale: { label: "Sale", icon: <FaTag size={9} />, dot: "bg-red-500" },
    hot: { label: "Hot", icon: <FaFire size={9} />, dot: "bg-orange-500" },
    bestseller: { label: "Bestseller", icon: <FaStar size={9} />, dot: "bg-amber-500" },
};

const CATEGORY_CONFIG = {
    merch: { label: "Merch", icon: <FaTshirt size={14} />, bg: "bg-purple-50", text: "text-purple-400" },
    digital: { label: "Digital", icon: <FaMobileAlt size={14} />, bg: "bg-sky-50", text: "text-sky-400" },
    course: { label: "Course", icon: <FaGraduationCap size={14} />, bg: "bg-emerald-50", text: "text-emerald-400" },
    service: { label: "Service", icon: <FaBriefcase size={14} />, bg: "bg-violet-50", text: "text-violet-400" },
    affiliate: { label: "Affiliate", icon: <FaLink size={14} />, bg: "bg-orange-50", text: "text-orange-400" },
    other: { label: "Other", icon: <FaBox size={14} />, bg: "bg-gray-50", text: "text-gray-400" },
};

const getDiscountPercent = (original, sale) => {
    const o = parseFloat(String(original).replace(/[^0-9.]/g, ""));
    const s = parseFloat(String(sale).replace(/[^0-9.]/g, ""));
    if (!o || !s || o <= s) return null;
    return Math.round(((o - s) / o) * 100);
};

/* ── Product Card ───────────────────────────────────────────── */

const ProductCard = ({ item }) => {
    const badge = item.badge ? BADGE_CONFIG[item.badge] : null;
    const cat = CATEGORY_CONFIG[item.category] || CATEGORY_CONFIG.other;
    const discount = item.originalPrice && item.price
        ? getDiscountPercent(item.originalPrice, item.price)
        : null;

    return (
        <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group block bg-white rounded-[20px] shadow-[0_1px_3px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.98] overflow-hidden"
        >
            {/* ── Image ── */}
            <div className="relative m-2 mb-0 rounded-2xl overflow-hidden aspect-square">
                {item.image ? (
                    <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 will-change-transform"
                        loading="lazy"
                    />
                ) : (
                    <div className={`w-full h-full ${cat.bg} flex items-center justify-center`}>
                        <div className={`${cat.text} opacity-40 scale-[2.5]`}>
                            {cat.icon}
                        </div>
                    </div>
                )}

                {/* Badge — small dot + label, top-left */}
                {badge && (
                    <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-md rounded-full px-2.5 py-1 flex items-center gap-1.5 shadow-sm">
                        <span className={`w-1.5 h-1.5 rounded-full ${badge.dot}`} />
                        <span className="text-[10px] font-semibold text-gray-800 leading-none">
                            {badge.label}
                        </span>
                    </div>
                )}
            </div>

            {/* ── Content ── */}
            <div className="px-2.5 py-2">
                <h3 className="font-semibold text-[12px] text-gray-900 leading-tight line-clamp-1">
                    {item.title}
                </h3>
                {item.description && (
                    <p className="text-[10px] text-gray-400 line-clamp-1 mt-0.5 leading-snug">{item.description}</p>
                )}

                <div className="flex items-center justify-between mt-1.5">
                    {item.price ? (
                        <div className="flex items-center gap-1.5">
                            {item.originalPrice && (
                                <span className="text-[10px] text-gray-400 line-through leading-none">
                                    {item.originalPrice}
                                </span>
                            )}
                            <span className="font-bold text-[13px] text-gray-900 leading-none">
                                {item.price}
                            </span>
                            {discount && (
                                <span className="text-[8px] font-bold text-emerald-600 bg-emerald-50 px-1 py-0.5 rounded leading-none">
                                    -{discount}%
                                </span>
                            )}
                        </div>
                    ) : (
                        <span className="text-[10px] font-medium text-gray-400 leading-none">
                            Free
                        </span>
                    )}

                    <div className="w-5 h-5 rounded-full bg-gray-100 group-hover:bg-black flex items-center justify-center transition-all duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-2.5 h-2.5 text-gray-400 group-hover:text-white transition-colors duration-300">
                            <path fillRule="evenodd" d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z" clipRule="evenodd" />
                        </svg>
                    </div>
                </div>
            </div>
        </a>
    );
};

/* ── Shop Grid ──────────────────────────────────────────────── */

const ShopGrid = ({ items, theme }) => {
    const [activeCategory, setActiveCategory] = useState("all");

    const visibleItems = (items || [])
        .filter((item) => item.isActive !== false)
        .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

    if (visibleItems.length === 0) return null;

    const categories = [...new Set(visibleItems.map((i) => i.category || "other"))];
    const showFilter = categories.length > 1;

    const filtered = activeCategory === "all"
        ? visibleItems
        : visibleItems.filter((i) => (i.category || "other") === activeCategory);

    return (
        <div className="w-full px-1">
            {/* Filter pills */}
            {showFilter && (
                <div
                    className="flex gap-1.5 overflow-x-auto pb-3 mb-2"
                    style={{ scrollbarWidth: "none", msOverflowStyle: "none", WebkitOverflowScrolling: "touch" }}
                >
                    <button
                        onClick={() => setActiveCategory("all")}
                        className={`shrink-0 px-3.5 py-[6px] rounded-full text-[11px] font-semibold transition-all duration-200 ${activeCategory === "all"
                            ? "bg-gray-900 text-white shadow-sm"
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
                                onClick={() => setActiveCategory(c)}
                                className={`shrink-0 flex items-center gap-1 px-3.5 py-[6px] rounded-full text-[11px] font-semibold transition-all duration-200 ${activeCategory === c
                                    ? "bg-gray-900 text-white shadow-sm"
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

            {/* Grid */}
            <div className="grid grid-cols-2 gap-2.5">
                {filtered.map((item) => (
                    <ProductCard key={item._id} item={item} />
                ))}
            </div>

            {/* Reset link */}
            {activeCategory !== "all" && (
                <div className="text-center mt-4">
                    <button
                        onClick={() => setActiveCategory("all")}
                        className="text-[10px] font-semibold text-gray-400 hover:text-gray-900 transition-colors uppercase tracking-widest"
                    >
                        View all {visibleItems.length} items
                    </button>
                </div>
            )}
        </div>
    );
};

export default ShopGrid;
