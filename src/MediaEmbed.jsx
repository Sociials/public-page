import React from "react";
import { LazyIframe } from "./ProfileScrollContainer.jsx";
import {
  FaYoutube,
  FaInstagram,
  FaTiktok,
  FaSpotify,
  FaTwitter,
  FaLinkedin,
  FaGithub,
  FaTwitch,
  FaSoundcloud,
  FaLink,
  FaArrowUpRightFromSquare,
} from "react-icons/fa6";
import { getYoutubeId } from "./linkDetector.js";

const getId = (url, type) => {
  if (!url) return null;

  switch (type) {
    case "youtube":
      return getYoutubeId(url);
    case "spotify": {
      const match = url.match(
        /open\.spotify\.com\/(track|album|playlist|episode)\/([a-zA-Z0-9]+)/,
      );
      return match ? { subType: match[1], id: match[2] } : null;
    }
    case "twitch": {
      const match = url.match(/twitch\.tv\/([a-zA-Z0-9_]+)/);
      return match ? match[1] : null;
    }
    case "applemusic": {
      const match = url.match(
        /music\.apple\.com\/([a-z]{2})\/(album|playlist)\/([^/]+)\/([0-9]+)/,
      );
      return match
        ? { country: match[1], type: match[2], path: match[3], id: match[4] }
        : null;
    }
    case "soundcloud": {
      return url;
    }
    case "vimeo": {
      const match = url.match(/vimeo\.com\/([0-9]+)/);
      return match ? match[1] : null;
    }
    default:
      return null;
  }
};

const MediaEmbed = ({ link, theme }) => {
  const { url, type, title } = link;
  const fontStyle = theme?.isCustom ? { fontFamily: theme.fontFamily } : {};
  const isStaticTheme = !theme?.isCustom;

  // --- RENDERERS ---

  // 1. YOUTUBE (Retro Monitor)
  if (type === "youtube") {
    const videoId = getId(url, "youtube");
    if (!videoId) return null;

    return (
      <div className="w-full mb-4">
        {/* The Monitor itself stays retro (Black/Gray) to look like a TV */}
        <div
          className={`bg-black p-1 pb-4 shadow-[4px_4px_0px_rgba(0,0,0,0.2)] ${
            isStaticTheme ? "rounded-t-xl rounded-b-lg" : "rounded-t-[20px] rounded-b-[10px]"
          }`}
        >
          <div className="flex justify-between items-center px-3 py-1 mb-1">
            <div className="flex gap-1.5">
              <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
              <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
            </div>
            {/* We apply the custom font here for subtle integration */}
            <div
              style={fontStyle}
              className="text-[8px] text-white/50 uppercase tracking-widest"
            >
              Live Feed
            </div>
          </div>
          <div className="relative w-full aspect-video bg-gray-900 rounded-[12px] overflow-hidden border-4 border-gray-800">
            <LazyIframe
              src={`https://www.youtube.com/embed/${videoId}`}
              title="YouTube"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="relative w-full aspect-video"
            />
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 bg-[length:100%_2px,3px_100%] opacity-20"></div>
          </div>
        </div>
        {title && <TitleBadge title={title} theme={theme} />}
      </div>
    );
  }

  // 2. SPOTIFY (Cassette/Vinyl)
  if (type === "spotify") {
    const data = getId(url, "spotify");
    if (!data) return null;

    return (
      <div className="w-full mb-4 group">
        <div
          className={`relative bg-white border-2 border-black overflow-hidden shadow-[4px_4px_0px_#1DB954] transition-all hover:translate-y-[-2px] ${
            isStaticTheme ? "rounded-xl" : "rounded-[20px]"
          }`}
        >
          <div className="absolute -right-6 -top-6 w-24 h-24 bg-black rounded-full border-4 border-white flex items-center justify-center animate-[spin_6s_linear_infinite]">
            <div className="w-8 h-8 bg-[#1DB954] rounded-full border-2 border-white"></div>
          </div>
          <div className="relative z-10">
            <iframe
              style={{ borderRadius: "12px" }}
              src={`https://open.spotify.com/embed/${data.subType}/${data.id}?utm_source=generator&theme=0`}
              width="100%"
              height="152"
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>
    );
  }

  // 3. TWITCH (Stream Wrapper)
  if (type === "twitch") {
    const channelId = getId(url, "twitch");
    if (!channelId) return null;

    return (
      <div className="w-full mb-4">
        <div
          className={`bg-[#9146FF] p-1.5 border-2 border-black shadow-[4px_4px_0px_#000] ${
            isStaticTheme ? "rounded-lg" : "rounded-xl"
          }`}
        >
          <div className="aspect-video w-full rounded-lg overflow-hidden border-2 border-black bg-black">
            <LazyIframe
              src={`https://player.twitch.tv/?channel=${channelId}&parent=${typeof window !== "undefined" ? window.location.hostname : "localhost"}`}
              title="Twitch"
              allowFullScreen
              className="aspect-video w-full"
            />
          </div>
        </div>
      </div>
    );
  }

  // 4. APPLE MUSIC
  if (type === "applemusic") {
    const embedUrl = url.replace("music.apple.com", "embed.music.apple.com");

    return (
      <div className="w-full mb-4">
        <div
          className={`bg-white border-2 border-black overflow-hidden shadow-[4px_4px_0px_#FA243C] ${
            isStaticTheme ? "rounded-xl" : "rounded-[18px]"
          }`}
        >
          <iframe
            allow="autoplay *; encrypted-media *; fullscreen *; clipboard-write"
            frameBorder="0"
            height="175"
            style={{
              width: "100%",
              maxWidth: "660px",
              overflow: "hidden",
              background: "transparent",
            }}
            sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation"
            src={embedUrl}
          ></iframe>
        </div>
      </div>
    );
  }

  // 5. SOUNDCLOUD
  if (type === "soundcloud") {
    return (
      <div className="w-full mb-4">
        <div
          className={`bg-[#ff5500] p-1 border-2 border-black shadow-[4px_4px_0px_#000] ${
            isStaticTheme ? "rounded-lg" : "rounded-[10px]"
          }`}
        >
          <iframe
            width="100%"
            height="166"
            scrolling="no"
            frameBorder="no"
            allow="autoplay"
            src={`https://w.soundcloud.com/player/?url=${encodeURIComponent(url)}&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true`}
          ></iframe>
        </div>
      </div>
    );
  }

  // 6. VIMEO
  if (type === "vimeo") {
    const videoId = getId(url, "vimeo");
    if (!videoId) return null;

    return (
      <div className="w-full mb-4">
        <div
          className={`bg-[#1AB7EA] p-1 pb-3 border-2 border-black shadow-[4px_4px_0px_#000] ${
            isStaticTheme ? "rounded-md" : "rounded-lg"
          }`}
        >
          <div className="flex items-center gap-1 px-2 mb-1">
            <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
            <div className="w-1.5 h-1.5 bg-white/50 rounded-full"></div>
            <span
              style={fontStyle}
              className="text-[8px] font-black uppercase text-white ml-auto"
            >
              HD Cinema
            </span>
          </div>
          <div className="aspect-video w-full rounded border-2 border-black bg-black overflow-hidden relative">
            <iframe
              src={`https://player.vimeo.com/video/${videoId}`}
              className="w-full h-full"
              frameBorder="0"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
        {title && <TitleBadge title={title} theme={theme} />}
      </div>
    );
  }

  return null;
};

// --- UPDATED TITLE BADGE ---
// Now accepts 'theme' to match the custom button styles
const TitleBadge = ({ title, theme }) => {
  const isCustom = theme?.isCustom;
  const btnConfig = theme?.button;

  // Default Preset Style
  let badgeClass =
    "bg-white border-2 border-black shadow-[2px_2px_0px_#000] rounded-full";
  let badgeStyle = {};

  if (isCustom) {
    badgeClass = ""; // Clear preset class
    badgeStyle = {
      backgroundColor:
        btnConfig.style === "outline" ? "white" : btnConfig.backgroundColor,
      color:
        btnConfig.style === "outline"
          ? btnConfig.backgroundColor
          : btnConfig.textColor,
      border: btnConfig.style.includes("shadow")
        ? "2px solid black"
        : `2px solid ${btnConfig.backgroundColor}`,
      fontFamily: theme.fontFamily,
      // We use a smaller border radius than buttons for badges usually, or match 'rounded'
      borderRadius:
        btnConfig.shape === "pill"
          ? "99px"
          : btnConfig.shape === "rounded"
            ? "8px"
            : "0px",
      boxShadow:
        btnConfig.style === "hard-shadow"
          ? `2px 2px 0px ${btnConfig.shadowColor}`
          : btnConfig.style === "soft-shadow"
            ? `0 2px 8px ${btnConfig.shadowColor}40`
            : "none",
    };
  }

  return (
    <div className="mt-2 text-center">
      <span
        style={badgeStyle}
        className={`px-3 py-1 text-[10px] font-black uppercase tracking-wide inline-block ${badgeClass}`}
      >
        {title}
      </span>
    </div>
  );
};

export default MediaEmbed;
