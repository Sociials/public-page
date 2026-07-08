import React from "react";
import { FaGithub, FaStar, FaCodeBranch, FaUsers, FaChartLine } from "react-icons/fa6";

const C = {
  bg: "#0D1117",
  surface: "#161B22",
  border: "#30363D",
  text: "#E6EDF3",
  muted: "#8B949E",
};

const fmt = (n) => {
  if (!n) return "0";
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return String(n);
};

const GitHubStats = ({ githubData }) => {
  if (!githubData || !githubData.connected || !githubData.settings?.enabled) {
    return null;
  }

  const { stats, username } = githubData;
  const settings = githubData.settings || {};
  const chartUrl = `https://ghchart.rshah.org/3FB950/${username}`;

  const statItems = [
    { label: "Repos", value: stats.repos, icon: FaCodeBranch },
    { label: "Followers", value: stats.followers, icon: FaUsers },
    { label: "Activity", value: stats.contributions || 0, icon: FaChartLine },
  ];

  return (
    <div className="w-full mt-5 mb-1">
      <div className="flex items-center gap-1.5 mb-2">
        <FaGithub size={11} style={{ color: C.muted }} />
        <span
          className="text-[10px] font-bold tracking-widest uppercase"
          style={{ color: C.muted }}
        >
          GitHub
        </span>
      </div>

      <a
        href={`https://github.com/${username}`}
        target="_blank"
        rel="noopener noreferrer"
        className="group block w-full overflow-hidden rounded-xl border transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(0,0,0,0.35)]"
        style={{
          textDecoration: "none",
          backgroundColor: C.bg,
          borderColor: C.border,
          color: C.text,
        }}
      >
        <div className="px-3.5 py-3.5 sm:px-4">
          {/* Header */}
          <div className="flex items-center justify-between gap-3 mb-3">
            <div className="min-w-0">
              <p
                className="text-sm font-bold tracking-tight truncate"
                style={{ color: C.text }}
              >
                @{username}
              </p>
              {stats.topLanguages?.length > 0 && settings.showLanguages && (
                <p
                  className="text-[10px] font-medium truncate mt-0.5"
                  style={{ color: C.muted }}
                >
                  {stats.topLanguages.slice(0, 3).join(" · ")}
                </p>
              )}
            </div>

            {settings.showStats && (
              <div
                className="flex shrink-0 items-center gap-1 rounded-md border px-2 py-1"
                style={{ backgroundColor: C.surface, borderColor: C.border }}
              >
                <FaStar size={9} className="text-amber-400" />
                <span
                  className="text-[11px] font-bold tabular-nums"
                  style={{ color: C.text }}
                >
                  {fmt(stats.stars)}
                </span>
              </div>
            )}
          </div>

          {/* Stats — icon + number only */}
          {settings.showStats && (
            <div
              className="flex items-center mb-3 rounded-lg border overflow-hidden"
              style={{ backgroundColor: C.surface, borderColor: C.border }}
            >
              {statItems.map(({ label, value, icon: Icon }, idx) => (
                <div
                  key={label}
                  className="flex flex-1 items-center justify-center gap-1.5 px-3 py-2.5"
                  style={idx > 0 ? { borderLeft: `1px solid ${C.border}` } : undefined}
                >
                  <Icon size={11} style={{ color: C.muted }} />
                  <span
                    className="text-sm font-bold tabular-nums"
                    style={{ color: C.text }}
                  >
                    {fmt(value)}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Contribution graph — fills card width, scrolls when wider */}
          {settings.showContributionGraph && (
            <div
              className="w-full overflow-x-auto overflow-y-hidden rounded-lg border py-2.5 scrollbar-hide touch-pan-x scroll-smooth"
              style={{
                backgroundColor: C.surface,
                borderColor: C.border,
                direction: "rtl",
                scrollbarWidth: "none",
                msOverflowStyle: "none",
                WebkitOverflowScrolling: "touch",
              }}
              onClick={(e) => e.stopPropagation()}
              onMouseDown={(e) => e.stopPropagation()}
              onTouchStart={(e) => e.stopPropagation()}
            >
              <img
                src={chartUrl}
                alt="GitHub contribution graph"
                className="block shrink-0 opacity-90 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  direction: "ltr",
                  width: "max(100%, 620px)",
                  height: 96,
                  maxWidth: "none",
                  objectFit: "contain",
                  objectPosition: "left center",
                }}
                draggable={false}
              />
            </div>
          )}
        </div>
      </a>
    </div>
  );
};

export default GitHubStats;
