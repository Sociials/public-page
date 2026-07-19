/** Detect Instagram / TikTok / Facebook / other in-app webviews. */
export function isInAppBrowser() {
  if (typeof navigator === "undefined") return false;
  const ua = navigator.userAgent || navigator.vendor || "";

  return (
    /Instagram/i.test(ua) ||
    /FBAN|FBAV|FB_IAB|Facebook/i.test(ua) ||
    /TikTok|BytedanceWebview|musical_ly/i.test(ua) ||
    /Twitter/i.test(ua) ||
    /LinkedInApp/i.test(ua) ||
    /Snapchat/i.test(ua) ||
    /Line\//i.test(ua) ||
    (/iPhone|iPad|iPod/i.test(ua) && !/Safari/i.test(ua)) ||
    (/Android/i.test(ua) && /; wv\)/i.test(ua))
  );
}

const isInternalScheme = (url) =>
  /^(tel:|mailto:|sms:|#)/i.test(String(url || "").trim());

/**
 * In in-app browsers, open the system browser (Safari / Chrome) for better checkout & logins.
 * Returns true if navigation was handled here (caller should rely on preventDefault).
 */
export function navigateExternalLink(event, url) {
  if (!url || url === "#" || isInternalScheme(url)) return false;
  if (!isInAppBrowser()) return false;

  event?.preventDefault?.();

  const fullUrl = /^https?:\/\//i.test(url) ? url : `https://${url}`;
  const ua = navigator.userAgent || "";
  const isIOS = /iPhone|iPad|iPod/i.test(ua);
  const isAndroid = /Android/i.test(ua);

  if (isIOS) {
    window.location.href = fullUrl.replace(/^https?:\/\//, "x-safari-https://");
    window.setTimeout(() => {
      window.open(fullUrl, "_blank", "noopener,noreferrer");
    }, 400);
    return true;
  }

  if (isAndroid) {
    const path = fullUrl.replace(/^https?:\/\//, "");
    window.location.href = `intent://${path}#Intent;scheme=https;package=com.android.chrome;S.browser_fallback_url=${encodeURIComponent(fullUrl)};end`;
    return true;
  }

  window.open(fullUrl, "_blank", "noopener,noreferrer");
  return true;
}
