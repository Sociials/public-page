"use client";
import React from "react";
import { FaArrowUpRightFromSquare, FaCode } from "react-icons/fa6";
import { TechStackBadge } from "./techStackIcons.jsx";

const ProjectCard = ({ link, theme, onClick }) => {
  const rawUrl = link?.url || "";
  const safeUrl = rawUrl.startsWith("http") ? rawUrl : `https://${rawUrl}`;
  const techStack = Array.isArray(link?.techStack)
    ? link.techStack.filter(Boolean)
    : [];

  const isCustom = theme?.isCustom;
  const btnConfig = theme?.button;
  const accentColor = isCustom ? btnConfig.backgroundColor : undefined;

  return (
    <a
      href={safeUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={onClick}
      style={isCustom ? { fontFamily: theme.fontFamily } : undefined}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200/80 bg-gradient-to-b from-white via-white to-gray-100/70 shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition-all duration-200 hover:border-gray-300/90 hover:shadow-[0_4px_14px_rgba(15,23,42,0.06)] active:scale-[0.995]"
    >
      <div className="relative aspect-[16/9] overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100/80">
        {link.thumbnail ? (
          <>
            <img
              src={link.thumbnail}
              alt={link.title}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              loading="lazy"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-white/10" />
          </>
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-gray-50 via-white to-gray-100">
            <FaCode
              size={22}
              className="text-gray-300"
              style={accentColor ? { color: `${accentColor}55` } : undefined}
            />
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-1 px-3.5 py-3">
        <div className="flex items-start justify-between gap-2">
          <h3
            className="line-clamp-1 text-[13px] font-semibold leading-tight text-gray-800"
            style={isCustom ? { color: btnConfig.textColor } : undefined}
          >
            {link.title}
          </h3>
          <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-gray-400 opacity-0 transition-all duration-200 group-hover:opacity-100">
            <FaArrowUpRightFromSquare size={9} />
          </span>
        </div>

        {link.description ? (
          <p className="line-clamp-2 text-[11px] leading-relaxed text-gray-500/90">
            {link.description}
          </p>
        ) : null}

        {techStack.length > 0 ? (
          <div className="mt-1.5 flex flex-wrap gap-1.5">
            {techStack.slice(0, 6).map((tech) => (
              <TechStackBadge key={tech} tech={tech} accentColor={accentColor} />
            ))}
          </div>
        ) : null}
      </div>
    </a>
  );
};

const LinkGroupProjects = ({ links = [], theme, onLinkClick }) => {
  if (!links.length) return null;

  return (
    <div className="grid grid-cols-1 gap-2.5">
      {links.map((link) => (
        <ProjectCard
          key={link._id}
          link={link}
          theme={theme}
          onClick={() => onLinkClick?.(link)}
        />
      ))}
    </div>
  );
};

export default LinkGroupProjects;
