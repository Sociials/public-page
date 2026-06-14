import React from "react";
import { FaUserCircle, FaLock } from "react-icons/fa";

/**
 * Minimal public view when an owner's trial/subscription has lapsed.
 * Server sets `user.locked === true` and strips links, shop, theme, etc.
 */
const LockedPageView = ({ user, onGoHome, homeLogoSrc = "/logo.png" }) => {
  const profilePic = user?.profilePicture;
  const username = user?.username || "user";
  const displayTitle = user?.title?.trim();

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[#F3F2EC] px-4 py-10">
      <div className="w-full max-w-md">
        {onGoHome && (
          <button
            type="button"
            onClick={onGoHome}
            className="mb-6 mx-auto flex items-center justify-center rounded-xl border-2 border-black bg-white px-4 py-2 shadow-[3px_3px_0px_#000] transition hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_#000] active:translate-y-0 active:shadow-none"
            aria-label="Go to Sociials home"
          >
            <img src={homeLogoSrc} alt="Sociials" className="h-7 w-auto" />
          </button>
        )}

        <div className="rounded-3xl border-3 border-black bg-white p-8 text-center shadow-[8px_8px_0px_#000]">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border-2 border-black bg-red-50 shadow-[3px_3px_0px_#000]">
            <FaLock className="text-2xl text-red-600" aria-hidden />
          </div>

          <div className="mb-5 flex flex-col items-center">
            {profilePic ? (
              <img
                src={profilePic}
                alt={`${username}'s profile picture`}
                className="h-20 w-20 rounded-full border-3 border-black object-cover shadow-[3px_3px_0px_#000]"
                width={80}
                height={80}
              />
            ) : (
              <FaUserCircle className="h-20 w-20 text-gray-300" aria-hidden />
            )}
            <p className="mt-3 text-lg font-black text-black">@{username}</p>
            {displayTitle && (
              <p className="mt-1 text-sm font-bold text-gray-600">{displayTitle}</p>
            )}
          </div>

          <h1 className="text-xl font-black uppercase tracking-tight text-black">
            Page offline
          </h1>
          <p className="mt-3 text-sm font-semibold leading-relaxed text-gray-600">
            This page is temporarily unavailable. The owner needs to renew their Sociials
            plan to bring it back online.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LockedPageView;
