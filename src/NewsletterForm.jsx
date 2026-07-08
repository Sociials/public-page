import React, { useState } from "react";
import { FaEnvelope, FaCheck, FaTimes } from "react-icons/fa";

const NewsletterForm = ({ user, activeTheme, apiBaseUrl = "" }) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const settings = user?.newsletterForm;

  const [isExpanded, setIsExpanded] = useState(false);

  if (!settings?.enabled) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (!apiBaseUrl) {
        throw new Error("Newsletter is not configured");
      }
      const res = await fetch(`${apiBaseUrl}/leads/submit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          pageId: user._id,
          email,
          name,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      setSubmitted(true);
      setEmail("");
      setName("");
      
      // Collapse banner automatically on successful signup after a short delay
      setTimeout(() => {
        setIsExpanded(false);
        setSubmitted(false);
      }, 3000);

    } catch (err) {
      setError(err.message || "Failed to subscribe. Please try again.");
    } finally {
      setLoading(false);
    }
  };

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
              ? "30px"
              : btn.shape === "rounded"
                ? "12px"
                : "0px",
        }
      : {};

  const containerClass = !isCustom
    ? activeTheme?.faqClass || activeTheme?.buttonClass
    : "";

  // 💎 Collapsed State Banner
  if (!isExpanded) {
    return (
      <div className="w-full mt-3 mb-1 md:mt-6 md:mb-2 px-2 flex justify-center">
        <button
          onClick={() => setIsExpanded(true)}
          style={customStyles}
          className={`w-full max-w-md py-2.5 md:py-3 px-4 md:px-6 rounded-xl border text-sm md:text-base font-bold transition-all flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 shadow-sm ${containerClass}`}
        >
          <FaEnvelope className="text-xs md:text-sm opacity-90" />
          <span>{settings.title || "Join my Newsletter"}</span>
        </button>
      </div>
    );
  }

  return (
    <div className="w-full mt-6 mb-4 px-2">
      <div
        style={customStyles}
        className={`w-full p-6 rounded-2xl transition-all flex flex-col text-center border relative ${containerClass}`}
      >
        {/* Collapse Toggle */}
        <button 
          onClick={() => setIsExpanded(false)}
          className="absolute top-3 right-3 w-6 h-6 rounded-full flex items-center justify-center bg-black/10 hover:bg-black/20 text-black transition-colors"
          title="Collapse"
        >
          <FaTimes size={12} />
        </button>

        <div className="flex justify-center mb-2">
          <div className="w-10 h-10 rounded-full bg-black/10 flex items-center justify-center">
            <FaEnvelope className="text-xl opacity-80" />
          </div>
        </div>

        <h3 className="text-lg font-bold mb-1 leading-tight">
          {settings.title || "Join my Newsletter"}
        </h3>
        {settings.description && (
          <p className="text-xs opacity-80 mb-4 font-medium max-w-xs mx-auto">
            {settings.description}
          </p>
        )}

        {submitted ? (
          <div className="flex flex-col items-center gap-2 text-green-500 py-2">
            <FaCheck size={20} />
            <p className="text-sm font-bold">
              {settings.successMessage || "Thanks for subscribing!"}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <input
              type="text"
              placeholder="Your Name (Optional)"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2.5 text-sm rounded-xl border-2 border-black/10 bg-white/80 backdrop-blur-sm focus:border-black focus:outline-none text-black font-semibold transition-colors placeholder-gray-400"
              disabled={loading}
            />
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 text-sm rounded-xl border-2 border-black/10 bg-white/80 backdrop-blur-sm focus:border-black focus:outline-none text-black font-semibold transition-colors placeholder-gray-400"
              required
              disabled={loading}
            />

            {error && (
              <p className="text-xs text-red-500 font-bold mt-1">{error}</p>
            )}

            <p className="text-[10px] sm:text-xs text-gray-500 leading-snug text-left px-1">
              By subscribing, you agree your email may be stored by Sociials and
              shared with this page&apos;s creator for their newsletter. See{" "}
              <a
                href="https://sociials.com/privacy-policy"
                target="_blank"
                rel="noopener noreferrer"
                className="underline font-semibold text-gray-700 hover:text-black"
              >
                Privacy Policy
              </a>
              {" "}(India users:{" "}
              <a
                href="https://sociials.com/privacy-policy#india-dpdp"
                target="_blank"
                rel="noopener noreferrer"
                className="underline font-semibold text-gray-700 hover:text-black"
              >
                India section
              </a>
              ).
            </p>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-black text-white text-sm font-bold rounded-xl hover:bg-gray-800 transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Subscribing..." : settings.buttonText || "Subscribe"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default NewsletterForm;
