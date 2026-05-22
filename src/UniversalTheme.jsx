import React, { useState, useEffect, useRef } from "react";
import {
  FaCheck,
  FaUserCircle,
  FaChevronDown,
  FaCoffee,
  FaPaypal,
  FaHeart,
  FaMugHot,
  FaPatreon,
} from "react-icons/fa";

import { resolveCustomFontStack, resolveStaticFontStack } from "./fonts.js";
import ThemeFontLoader from "./ThemeFontLoader.jsx";
import ProfileScrollContainer from "./ProfileScrollContainer.jsx";
import { staticThemes } from "./staticThemes.js";
import SocialRow from "./SocialRow.jsx";
import LinkCard from "./LinkCard.jsx";
import LinkGroupCarousel from "./LinkGroupCarousel.jsx";
import MediaEmbed from "./MediaEmbed.jsx";
import ShopGrid from "./ShopGrid.jsx";
import ShopViewToggle from "./ShopViewToggle.jsx";
import InstagramFeed from "./InstagramFeed.jsx";
import YouTubeFeed from "./YouTubeFeed.jsx";
import NewsletterForm from "./NewsletterForm.jsx";
import GitHubStats from "./GitHubStats.jsx";
import { buildLinkBlocks } from "./linkBlocks.js";
import PageBlogView from "./PageBlogView.jsx";
import PageGalleryView from "./PageGalleryView.jsx";
import PageSiteNav from "./PageSiteNav.jsx";
import ShareIcon from "./ShareIcon.jsx";
import HighlightsRow from "./HighlightsRow.jsx";
import StoryViewer from "./StoryViewer.jsx";

/**
 * Public bio page shell. Wire app-specific behavior via props.
 * @param {object} props
 * @param {object} props.user - Sanitized page document from /public-api/:username
 * @param {() => void} [props.onGoHome] - Logo / CTA navigation (e.g. marketing home)
 * @param {string} [props.homeLogoSrc="/logo.png"]
 * @param {(pageId: string) => void} [props.onTrackView]
 * @param {({ pageId: string, linkId: string }) => void} [props.onTrackClick]
 * @param {string} [props.apiBaseUrl] - API origin for newsletter submit
 * @param {({ isOpen: boolean, onClose: () => void, pageId: string, username: string }) => React.ReactNode} [props.renderReportModal]
 */
const UniversalTheme = ({
  user,
  onGoHome,
  homeLogoSrc = "/logo.png",
  onTrackView,
  onTrackClick,
  apiBaseUrl = "",
  renderReportModal,
}) => {
  const [isCopied, setIsCopied] = useState(false);
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [activeStoryIndex, setActiveStoryIndex] = useState(null); // Changed to Index
  const [viewMode, setViewMode] = useState("links"); // New state

  if (!user?.username) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center p-8 text-center text-gray-600">
        Profile could not be loaded.
      </div>
    );
  }

  const pageType = user.pageType || "links";
  const showLinksContent = pageType === "links";
  const isSubPage = Boolean(user.isSubPage);

  const isCustom = Boolean(user?.customTheme?.enabled);
  const hideBranding = Boolean(user?.branding?.hidden);
  const customConfig = user?.customTheme ?? {};
  const customBackground = customConfig.background ?? {};
  const customButton = customConfig.button ?? {};

  const staticTheme =
    staticThemes.find((t) => t.title === user?.theme) || staticThemes[0];

  const pageFontStack = isCustom
    ? resolveCustomFontStack(customConfig.fontFamily)
    : resolveStaticFontStack(staticTheme.fontClass);

  const effectiveTheme = isCustom
    ? { isCustom: true, ...customConfig, fontFamily: pageFontStack }
    : { ...staticTheme, fontFamily: pageFontStack };

  const customContainerStyle = isCustom
    ? {
        backgroundColor:
          customBackground.type === "color"
            ? customBackground.value || "#F3F2EC"
            : "transparent",
        color: customButton.textColor || "#000000",
      }
    : {};

  const globalFontStyle = { fontFamily: pageFontStack };

  const outerBgClass = isCustom ? "bg-gray-100" : staticTheme.bgClass;
  // If custom, we DON'T want a text class from static theme. 
  // We rely on 'customContainerStyle' to inherit color.
  // BUT we need to ensure specific elements reset/inherit properly.
  const textClass = isCustom ? "" : staticTheme.color;
  const fontClass = isCustom ? "" : staticTheme.fontClass;
  const iconHoverClass = isCustom ? "hover:opacity-70" : staticTheme.color;


  const themeFontFamily = { fontFamily: pageFontStack };
  const bgEffect = customBackground.effect || "normal";
  const backgroundLayerStyle =
    isCustom && customBackground.type === "image" && customBackground.image
      ? {
        backgroundImage: `url(${customBackground.image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        filter: bgEffect === "blur" ? "blur(4px)" : "none",
        transform: bgEffect === "blur" ? "scale(1.05)" : "scale(1)",
      }
      : null;
  const backgroundOverlayStyle =
    bgEffect === "dark-gradient"
      ? { background: "linear-gradient(to bottom, rgba(0,0,0,0.15), rgba(0,0,0,0.6))" }
      : bgEffect === "blur"
        ? { background: "rgba(0,0,0,0.18)" }
        : { background: "rgba(0,0,0,0.06)" };

  const highlightAccent = isCustom
    ? customButton.backgroundColor || "#15F5BA"
    : "#15F5BA";
  const highlightCtaText = isCustom ? customButton.textColor || "#000000" : "#000000";

  const onTrackViewRef = useRef(onTrackView);
  onTrackViewRef.current = onTrackView;

  useEffect(() => {
    const pageId = user?._id;
    if (pageId) {
      onTrackViewRef.current?.(pageId);
    }
  }, [user?._id]);

  const handleLinkClick = (link) => {
    if (onTrackClick && user?._id && link?._id) {
      onTrackClick({ pageId: user._id, linkId: link._id });
    }
  };

  const handleShare = async () => {
    const shareData = {
      title: `Check out ${user.username}'s page`,
      text: user.bio,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        return;
      } catch (err) {
        console.log("Share cancelled");
      }
    }

    try {
      await navigator.clipboard.writeText(shareData.url);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy", err);
    }
  };

  const sortedLinks = user?.links
    ? user.links.slice().sort((a, b) => a.order - b.order)
    : [];

  const linkBlocks = buildLinkBlocks(sortedLinks);

  const renderStandardLink = (link) => {
    if (user.smartEmbeds) {
      if (
        [
          "youtube",
          "spotify",
          "twitch",
          "applemusic",
          "soundcloud",
          "vimeo",
        ].includes(link.type)
      ) {
        return (
          <div key={link._id} onClick={() => handleLinkClick(link)}>
            <MediaEmbed link={link} theme={effectiveTheme} />
          </div>
        );
      }
    }

    return (
      <LinkCard
        key={link._id}
        link={link}
        theme={effectiveTheme}
        onClick={() => handleLinkClick(link)}
      />
    );
  };

  const renderGroupTitle = (group) => (
    <div
      className={`block w-full mb-2 mt-1 py-1 px-1 text-center font-bold text-base ${!isCustom ? textClass : ""}`}
      style={
        isCustom
          ? { color: customButton.textColor, fontFamily: pageFontStack }
          : {}
      }
    >
      {group.title}
    </div>
  );

  const currentProfilePic = user?.profilePicture;

  const getPaymentUrl = (platform, username) => {
    if (!username) return "#";
    switch (platform) {
      case "buymeacoffee":
        return `https://www.buymeacoffee.com/${username}`;
      case "ko-fi":
        return `https://ko-fi.com/${username}`;
      case "paypal":
        return `https://paypal.me/${username}`;
      case "patreon":
        return `https://patreon.com/${username}`;
      default:
        return username.startsWith("http")
          ? username
          : `https://${username}`;
    }
  };

  const getPlatformConfig = (platform) => {
    switch (platform) {
      case "buymeacoffee":
        return {
          icon: <FaCoffee size={16} />,
          label: "Buy me a coffee",
          style: "bg-[#FFDD00] text-black border-black",
        };
      case "ko-fi":
        return {
          icon: <FaMugHot size={16} />,
          label: "Ko-fi",
          style: "bg-[#13C3FF] text-black border-black",
        };
      case "paypal":
        return {
          icon: <FaPaypal size={16} />,
          label: "PayPal",
          style: "bg-[#0070BA] text-white border-black",
        };
      case "patreon":
        return {
          icon: <FaPatreon size={16} />,
          label: "Patreon",
          style: "bg-[#FF424D] text-white border-black",
        };
      default:
        return {
          icon: <FaHeart size={16} />,
          label: "Support",
          style: "bg-[#FF90E8] text-black border-black",
        };
    }
  };

  const hasBanner = user?.banner?.enabled && user?.banner?.image;
  const isFloatingBanner = hasBanner && user.banner.style === "floating";
  const isFullBleedBanner = hasBanner && !isFloatingBanner;

  const renderTopChrome = (className = "", { overlay = false } = {}) => (
    <div
      className={`w-full flex justify-between items-center px-4 ${overlay ? "" : textClass} ${className}`}
    >
      {!hideBranding ? (
        <button
          className="w-9 h-9 flex items-center justify-center rounded-full bg-black/30 backdrop-blur-md border border-white/15 hover:bg-black/50 hover:scale-105 active:scale-95 transition-all duration-200"
          onClick={() => onGoHome?.()}
          title="Create your own page"
        >
          <img src={homeLogoSrc} alt="Sociials" className="w-5 h-5 object-contain" />
        </button>
      ) : (
        <div />
      )}

      <div className="flex items-center gap-3">
        {user?.monetization?.enabled &&
          user.monetization.username &&
          (() => {
            const config = getPlatformConfig(user.monetization.platform);
            return (
              <a
                href={getPaymentUrl(
                  user.monetization.platform,
                  user.monetization.username,
                )}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center justify-center w-10 h-10 rounded-full border-2 shadow-[3px_3px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 hover:shadow-[5px_5px_0px_rgba(0,0,0,1)] active:translate-y-0 active:shadow-[1px_1px_0px_rgba(0,0,0,1)] transition-all duration-200 ${config.style}`}
                title={config.label}
              >
                {React.cloneElement(config.icon, { size: 18 })}
              </a>
            );
          })()}

        <button
          onClick={handleShare}
          className={
            overlay
              ? "p-2 rounded-full bg-black/30 backdrop-blur-md border border-white/15 hover:bg-black/50 transition flex items-center gap-2 text-white"
              : `p-2 rounded-full transition flex items-center gap-2 ${iconHoverClass}`
          }
          aria-label="Share profile"
        >
          {isCopied ? (
            <FaCheck size={20} className="text-[#15F5BA]" />
          ) : (
            <ShareIcon size={18} strokeWidth={2} />
          )}
        </button>
      </div>
    </div>
  );

  return (
    <div
      style={globalFontStyle}
      className={`h-screen w-full flex flex-col items-center justify-center transition-all duration-300 ${outerBgClass}`}
    >
      <ThemeFontLoader user={user} />
      {renderReportModal?.({
        isOpen: isReportOpen,
        onClose: () => setIsReportOpen(false),
        pageId: user?._id,
        username: user?.username,
      })}

      <div
        style={customContainerStyle}
        className={`w-full max-w-md flex flex-col 
        relative
        h-screen md:h-[calc(100vh-4rem)] 
        overflow-hidden 
        md:rounded-[40px] md:my-8 
        transition-all duration-300
        ${isCustom ? "shadow-2xl" : ""}`}
      >
      <ProfileScrollContainer
        className="h-full w-full"
        backgroundLayerStyle={backgroundLayerStyle}
        backgroundOverlayStyle={backgroundOverlayStyle}
      >
          <div className="relative z-10 w-full flex flex-col min-h-full">

        {/* Full-bleed banner (centered / discord) */}
        {isFullBleedBanner && (
          <div className="w-full shrink-0 relative z-0">
            <div className="relative">
              <div
                className="w-full h-28 md:h-52 bg-cover bg-center"
                style={{ backgroundImage: `url(${user.banner.image})` }}
              />
              <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-black/15 shadow-[0_1px_3px_rgba(0,0,0,0.15)]" />
              {renderTopChrome("absolute top-0 left-0 right-0 z-20 pt-4 pb-2", {
                overlay: true,
              })}
            </div>
          </div>
        )}

        {/* Floating pill banner — chrome overlays the banner */}
        {isFloatingBanner && (
          <div className="w-full shrink-0 relative z-0 px-4 pt-2 md:pt-3">
            <div className="relative w-full">
              <div
                className="w-full h-28 md:h-44 rounded-[20px] bg-cover bg-center border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)]"
                style={{ backgroundImage: `url(${user.banner.image})` }}
              />
              {renderTopChrome("absolute top-0 left-0 right-0 z-20 pt-2.5 px-1 md:pt-3", {
                overlay: true,
              })}
            </div>
          </div>
        )}

        {/* Top nav when no banner */}
        {!hasBanner && renderTopChrome("pt-5 pb-2 mb-1 md:pt-8 md:pb-4 md:mb-2")}

        {/* --- PROFILE SECTION (overlaps banner for centered/discord) --- */}
        <article 
          className={`flex flex-col relative z-10 w-full min-w-0 px-4
            ${
              user?.banner?.enabled && user?.banner?.image
                ? user.banner.style === "discord"
                  ? "-mt-10 md:-mt-[62px] px-5 md:px-6 items-start text-left"
                  : user.banner.style === "centered"
                    ? "-mt-10 md:-mt-[62px] items-center text-center"
                    : "mt-2 md:mt-4 items-center text-center"
                : "items-center text-center pt-1 md:pt-0"
            }
            ${textClass}
          `}
        >
          <div className="shrink-0">
            {currentProfilePic ? (
              <img
                src={currentProfilePic}
                alt={`${user?.username || "User"}'s profile picture on Sociials`}
                className={`w-20 h-20 md:w-[125px] md:h-[125px] rounded-full object-cover shadow-lg md:shadow-xl ${
                  user?.banner?.enabled && user?.banner?.image && user.banner.style !== "floating"
                    ? "border-[3px] md:border-[5px] border-white ring-1 ring-black/10"
                    : "border-[3px] md:border-4 border-white/80"
                }`}
                width={125}
                height={125}
                loading="eager"
              />
            ) : (
              <FaUserCircle className="w-20 h-20 md:w-[125px] md:h-[125px] text-gray-400" aria-label="Default profile icon" />
            )}
          </div>

          <h1
            style={themeFontFamily}
            className={`mt-2 md:mt-4 leading-tight break-all text-base font-bold md:text-2xl ${textClass}`}
          >
            @{user?.username || "username"}
          </h1>

          {isSubPage && user?.title && pageType !== "blog" && pageType !== "gallery" && (
            <h2
              style={themeFontFamily}
              className={`mt-1 md:mt-2 text-base md:text-xl font-black break-words max-w-sm ${textClass}`}
            >
              {user.title}
            </h2>
          )}

          {user?.primaryPagePath && (
            <a
              href={user.primaryPagePath}
              className={`mt-2 text-sm font-bold underline opacity-80 hover:opacity-100 ${textClass}`}
            >
              ← All links
            </a>
          )}

          {user?.bio && (
            <p 
              className={`mt-1.5 md:mt-3 text-sm md:text-base opacity-90 break-words max-w-sm mx-auto md:mx-0 whitespace-pre-wrap leading-snug md:leading-relaxed font-medium line-clamp-3 md:line-clamp-none
                ${
                  user?.banner?.enabled && user?.banner?.image && user.banner.style === "discord"
                    ? "text-left mx-0"
                    : "text-center mx-auto"
                }
              `}
              style={themeFontFamily}
            >
              {user.bio}
            </p>
          )}
          {/* --- SOCIAL ICONS (inside article to follow banner alignment) --- */}
          {user?.socials && (
            <div className="mt-2.5 md:mt-4 mb-0.5 w-full">
              <SocialRow socials={user.socials} theme={effectiveTheme} />
            </div>
          )}
          {showLinksContent && user?.sitePages?.length > 0 && (
            <PageSiteNav
              pages={user.sitePages}
              username={user.username}
              textClass={textClass}
            />
          )}
        </article>

        {/* Content wrapper with horizontal padding */}
        <div className="px-4">

        {!showLinksContent && pageType === "blog" && (
          <PageBlogView
            user={user}
            textClass={textClass}
            fontClass={fontClass}
            themeFontFamily={themeFontFamily}
            isCustom={isCustom}
            customButton={customButton}
          />
        )}

        {!showLinksContent && pageType === "gallery" && (
          <PageGalleryView
            user={user}
            textClass={textClass}
            fontClass={fontClass}
            themeFontFamily={themeFontFamily}
            isCustom={isCustom}
            customButton={customButton}
          />
        )}

        {showLinksContent && (
          <>
        {user?.highlights?.items?.length > 0 && (
          <HighlightsRow
            items={user.highlights.items}
            title={user.highlights.title}
            textClass={textClass}
            themeFontFamily={themeFontFamily}
            accentColor={highlightAccent}
            onItemClick={setActiveStoryIndex}
          />
        )}

        {/* --- YOUTUBE FEED (TOP POSITION) --- */}
        {user?.integrations?.youtube?.connected && user?.integrations?.youtube?.feedSettings?.position === "top" && (
          <YouTubeFeed user={user} />
        )}

        {/* --- GITHUB STATS (TOP POSITION) --- */}
        {user?.integrations?.github?.connected && user?.integrations?.github?.settings?.position === "top" && (
          <GitHubStats githubData={user.integrations.github} theme={effectiveTheme} />
        )}

        {user?.shop?.filter(s => s.isActive !== false)?.length > 0 && (
          <ShopViewToggle
            viewMode={viewMode}
            onChange={setViewMode}
            className="mt-3 mb-4 md:mt-6 md:mb-6 px-4"
          />
        )}

        {/* --- E. MAIN CONTENT (LINKS OR SHOP) --- */}
        {viewMode === 'shop' ? (
          <div className="w-full mt-2 mb-8">
            <ShopGrid items={user.shop} />
          </div>
        ) : (
          <div className="w-full min-w-0 flex flex-col gap-3 md:gap-4 mt-1 md:mt-2 mb-6 md:mb-8">
            {linkBlocks.map((block) => {
              if (block.kind === "featured") {
                return (
                  <div key="featured-links" className="w-full mb-1">
                    <div
                      className={`text-[10px] font-black uppercase tracking-[0.2em] mb-2 text-center opacity-60 ${!isCustom ? textClass : ""}`}
                      style={
                        isCustom
                          ? { color: customButton.textColor, fontFamily: pageFontStack }
                          : {}
                      }
                    >
                      Featured
                    </div>
                    <div className="flex flex-col gap-3">
                      {block.links.map((link) => renderStandardLink(link))}
                    </div>
                  </div>
                );
              }

              if (block.kind === "header") {
                return (
                  <LinkCard
                    key={block.link._id}
                    link={block.link}
                    theme={effectiveTheme}
                    onClick={() => handleLinkClick(block.link)}
                  />
                );
              }

              if (block.kind === "group") {
                return (
                  <div key={block.group._id} className="w-full min-w-0 mb-2">
                    {renderGroupTitle(block.group)}
                    {block.layout === "carousel" ? (
                      <LinkGroupCarousel
                        links={block.children}
                        theme={effectiveTheme}
                        onLinkClick={handleLinkClick}
                      />
                    ) : (
                      <div className="flex flex-col gap-3 pl-0">
                        {block.children.map((child) => renderStandardLink(child))}
                      </div>
                    )}
                  </div>
                );
              }

              return renderStandardLink(block.link);
            })}

            {(!user?.links || user.links.length === 0) && (
              <div
                className={`text-center opacity-50 py-10 font-mono text-sm ${textClass}`}
              >
                No links added yet.
              </div>
            )}
          </div>
        )}

        {/* --- NEWSLETTER FORM (after links — keeps CTAs above the fold) --- */}
        <NewsletterForm user={user} activeTheme={effectiveTheme} apiBaseUrl={apiBaseUrl} />

        {/* --- INSTAGRAM FEED --- */}
        {user?.integrations?.instagram?.connected && (
          <InstagramFeed user={user} />
        )}

        {/* --- YOUTUBE FEED (BOTTOM POSITION) --- */}
        {user?.integrations?.youtube?.connected && (user?.integrations?.youtube?.feedSettings?.position === "bottom" || !user?.integrations?.youtube?.feedSettings?.position) && (
          <YouTubeFeed user={user} />
        )}

        {/* --- GITHUB STATS (BOTTOM POSITION) --- */}
        {user?.integrations?.github?.connected && (user?.integrations?.github?.settings?.position === "bottom" || !user?.integrations?.github?.settings?.position) && (
          <GitHubStats githubData={user.integrations.github} theme={effectiveTheme} />
        )}

        {/* --- F. FAQ ACCORDION --- */}
        {user?.faq?.length > 0 && (
          <div className="w-full mb-8">
            <h3
              className={`text-center font-bold mb-3 uppercase tracking-widest text-[0.65rem] opacity-70 ${textClass}`}
            >
              F.A.Q.
            </h3>
            <div className="flex flex-col gap-3">
              {user.faq.map((item, i) => (
                <FAQItem
                  key={i}
                  question={item.question}
                  answer={item.answer}
                  activeTheme={effectiveTheme}
                />
              ))}
            </div>
          </div>
        )}

          </>
        )}

        </div>{/* end px-4 content wrapper */}

        {/* --- G. FOOTER CTA --- */}
        <div className="mt-auto flex flex-col items-center justify-center pb-6">
          {!hideBranding && (
            <button
              className="group relative mb-4 inline-flex items-center justify-center gap-2"
              onClick={() => onGoHome?.()}
            >
              <div className="absolute inset-0 bg-black rounded-full translate-y-1 translate-x-1 transition-transform group-hover:translate-y-1.5 group-hover:translate-x-1.5" />
              <div className="relative bg-white border-2 border-black rounded-full px-6 py-3 font-black text-xs tracking-widest uppercase text-black flex items-center gap-2 transition-transform active:translate-y-1 active:translate-x-1 group-hover:-translate-y-0.5 group-hover:-translate-x-0.5">
                <span className="w-2 h-2 bg-[#15F5BA] rounded-full animate-pulse" />
                Join Sociials Now
              </div>
            </button>
          )}

          <button
            onClick={() => setIsReportOpen(true)}
            className={`text-[10px] uppercase tracking-widest font-bold opacity-40 hover:opacity-100 hover:text-red-500 transition-colors ${textClass}`}
          >
            Report This Page
          </button>
        </div>

          </div>
      </ProfileScrollContainer>

      {activeStoryIndex !== null && user?.highlights?.items && (
        <StoryViewer
          stories={user.highlights.items}
          startIndex={activeStoryIndex}
          onClose={() => setActiveStoryIndex(null)}
          accentColor={highlightAccent}
          ctaTextColor={highlightCtaText}
        />
      )}
      </div>
    </div>
  );
};

const FAQItem = ({ question, answer, activeTheme }) => {
  const [isOpen, setIsOpen] = useState(false);
  const isCustom = activeTheme?.isCustom;
  const btn = activeTheme?.button ?? {};

  const customStyles =
    isCustom && btn.backgroundColor
      ? {
          backgroundColor: btn.backgroundColor,
          color: btn.textColor || "#000000",
          border: btn.style?.includes("shadow")
            ? "2px solid black"
            : `2px solid ${btn.backgroundColor}`,
          boxShadow: btn.style?.includes("shadow")
            ? `4px 4px 0px ${btn.shadowColor || "#000000"}`
            : "none",
          borderRadius:
            btn.shape === "pill"
              ? "16px"
              : btn.shape === "rounded"
                ? "12px"
                : "0px",
        }
      : {};

  const containerClass = !isCustom
    ? activeTheme?.faqClass || activeTheme?.buttonClass
    : "";

  return (
    <div
      style={customStyles}
      className={`w-full overflow-hidden transition-all flex flex-col ${containerClass}`}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center p-4 text-left hover:brightness-95 transition-all"
        style={
          isCustom && btn.style === "outline"
            ? { color: btn.backgroundColor }
            : {}
        }
      >
        <span className="font-bold text-sm pr-4 inherit leading-snug">
          {question}
        </span>
        <FaChevronDown
          className={`text-xs transition-transform duration-300 opacity-70 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
      >
        <div
          className="p-4 pt-0 text-sm opacity-90 font-medium leading-relaxed border-t border-black/10"
          style={{ borderColor: isCustom ? btn.textColor : "" }}
        >
          {answer}
        </div>
      </div>
    </div>
  );
};
export default UniversalTheme;
