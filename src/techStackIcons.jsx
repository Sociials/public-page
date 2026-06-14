import {
  SiAngular,
  SiCss,
  SiDocker,
  SiDjango,
  SiExpress,
  SiFirebase,
  SiFlutter,
  SiGit,
  SiGithub,
  SiGo,
  SiGraphql,
  SiHtml5,
  SiJavascript,
  SiKotlin,
  SiKubernetes,
  SiLinux,
  SiMongodb,
  SiMysql,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiPrisma,
  SiPython,
  SiReact,
  SiRedis,
  SiRust,
  SiSupabase,
  SiTailwindcss,
  SiTypescript,
  SiVuedotjs,
  SiVite,
} from "react-icons/si";
import { FaAws, FaCode } from "react-icons/fa6";

const normalizeTechKey = (name) =>
  String(name || "")
    .trim()
    .toLowerCase()
    .replace(/\.js$/i, "js")
    .replace(/[^a-z0-9+#]/g, "");

const TECH_ICON_MAP = {
  react: SiReact,
  reactjs: SiReact,
  next: SiNextdotjs,
  nextjs: SiNextdotjs,
  node: SiNodedotjs,
  nodejs: SiNodedotjs,
  javascript: SiJavascript,
  js: SiJavascript,
  typescript: SiTypescript,
  ts: SiTypescript,
  vue: SiVuedotjs,
  vuejs: SiVuedotjs,
  angular: SiAngular,
  python: SiPython,
  django: SiDjango,
  mongodb: SiMongodb,
  mongo: SiMongodb,
  postgres: SiPostgresql,
  postgresql: SiPostgresql,
  mysql: SiMysql,
  redis: SiRedis,
  graphql: SiGraphql,
  tailwind: SiTailwindcss,
  tailwindcss: SiTailwindcss,
  docker: SiDocker,
  kubernetes: SiKubernetes,
  k8s: SiKubernetes,
  aws: FaAws,
  go: SiGo,
  golang: SiGo,
  rust: SiRust,
  kotlin: SiKotlin,
  flutter: SiFlutter,
  express: SiExpress,
  expressjs: SiExpress,
  firebase: SiFirebase,
  supabase: SiSupabase,
  prisma: SiPrisma,
  git: SiGit,
  github: SiGithub,
  html: SiHtml5,
  html5: SiHtml5,
  css: SiCss,
  css3: SiCss,
  vite: SiVite,
  linux: SiLinux,
};

export const getTechStackIcon = (name) => {
  const key = normalizeTechKey(name);
  return TECH_ICON_MAP[key] || FaCode;
};

export const TechStackBadge = ({ tech, accentColor }) => {
  const Icon = getTechStackIcon(tech);

  return (
    <span
      className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium ring-1"
      style={
        accentColor
          ? {
              color: accentColor,
              backgroundColor: `${accentColor}0a`,
              boxShadow: `inset 0 0 0 1px ${accentColor}22`,
            }
          : {
              color: "#4b5563",
              backgroundColor: "rgba(255,255,255,0.72)",
              boxShadow: "inset 0 0 0 1px rgba(229,231,235,0.85)",
            }
      }
    >
      <Icon size={10} className="shrink-0 opacity-75" aria-hidden />
      <span className="truncate">{tech}</span>
    </span>
  );
};
