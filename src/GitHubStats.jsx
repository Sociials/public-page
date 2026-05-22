import React from "react";
import { FaGithub, FaStar, FaCodeBranch, FaUsers, FaChartLine } from "react-icons/fa6";

const GitHubStats = ({ githubData, theme }) => {
  if (!githubData || !githubData.connected || !githubData.settings?.enabled) {
    return null;
  }

  const { stats, username } = githubData;
  const settings = githubData.settings || {};

  const getBrightness = (hex) => {
    if (!hex) return 200;
    hex = hex.replace('#', '');
    if (hex.length === 3) hex = hex.split('').map(c => c + c).join('');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    return (r * 299 + g * 587 + b * 114) / 1000;
  };

  const pageBg = theme?.isCustom
    ? theme?.background?.color
    : theme?.customTheme?.background?.color;
  const isDark = pageBg ? getBrightness(pageBg) < 128 : false;

  const chartUrl = `https://ghchart.rshah.org/${isDark ? "4ADE80" : "219138"}/${username}`;

  const fmt = (n) => {
    if (!n) return "0";
    if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
    return String(n);
  };

  return (
    <a
      href={`https://github.com/${username}`}
      target="_blank"
      rel="noopener noreferrer"
      className="block w-full mt-4 px-2 md:px-0 group"
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <div
        className={`overflow-hidden rounded-2xl p-4 transition-all duration-300 group-hover:scale-[0.99] group-active:scale-[0.97] ${
          isDark
            ? "bg-[#0d1117] border border-[#30363d] text-[#e6edf3]"
            : "bg-white/60 backdrop-blur-xl border border-black/6 text-[#1f2328] shadow-[0_1px_2px_rgba(0,0,0,0.04)]"
        }`}
      >
        {/* Header */}
        <div className="flex items-center gap-2.5 mb-3">
          <FaGithub size={18} className={isDark ? "text-white" : "text-[#1f2328]"} />
          <span className="font-semibold text-sm tracking-tight">{username}</span>
        </div>

        {/* Stats row — icon + number */}
        {settings.showStats && (
          <div className="flex items-center gap-4 mb-3">
            {[
              { icon: <FaStar size={12} />, value: stats.stars },
              { icon: <FaCodeBranch size={12} />, value: stats.repos },
              { icon: <FaUsers size={12} />, value: stats.followers },
              { icon: <FaChartLine size={12} />, value: stats.contributions || 0 },
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-1.5">
                <span className={isDark ? "text-[#7d8590]" : "text-[#656d76]"}>{item.icon}</span>
                <span className="text-sm font-bold tabular-nums">{fmt(item.value)}</span>
              </div>
            ))}
          </div>
        )}

        {/* Languages */}
        {stats.topLanguages?.length > 0 && settings.showLanguages && (
          <div className={`text-[11px] font-medium mb-3 truncate ${isDark ? "text-[#7d8590]" : "text-[#656d76]"}`}>
            {stats.topLanguages.slice(0, 5).join(" · ")}
          </div>
        )}

        {/* Contribution Graph */}
        {settings.showContributionGraph && (
          <div
            className={`w-full overflow-x-auto overflow-y-hidden rounded-lg p-2.5 ${
              isDark ? "bg-[#161b22]" : "bg-[#f6f8fa]"
            }`}
            style={{ direction: "rtl" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="min-w-[650px] pr-2" style={{ direction: "ltr" }}>
              <img
                src={chartUrl}
                alt="GitHub Contribution Graph"
                className="w-full h-auto object-contain"
                style={isDark ? { filter: "brightness(1.1)" } : {}}
              />
            </div>
          </div>
        )}
      </div>
    </a>
  );
};

export default GitHubStats;
