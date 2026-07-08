import React from "react";
import { FaExclamationTriangle } from "react-icons/fa";

/**
 * Age verification screen for public pages marked as 18+ by the creator.
 */
const AdultContentGate = ({
  username,
  onConfirm,
  onLeave,
  homeLogoSrc = "/logo.png",
}) => {
  const handle = username ? `@${username}` : "this page";

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[#F3F2EC] px-4 py-10">
      <div className="w-full max-w-md">
        {onLeave && (
          <button
            type="button"
            onClick={onLeave}
            className="mb-6 mx-auto flex items-center justify-center rounded-xl border-2 border-black bg-white px-4 py-2 shadow-[3px_3px_0px_#000] transition hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_#000] active:translate-y-0 active:shadow-none"
            aria-label="Go to Sociials home"
          >
            <img src={homeLogoSrc} alt="Sociials" className="h-7 w-auto" />
          </button>
        )}

        <div className="rounded-3xl border-3 border-black bg-white p-8 text-center shadow-[8px_8px_0px_#000]">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border-2 border-black bg-amber-50 shadow-[3px_3px_0px_#000]">
            <FaExclamationTriangle className="text-2xl text-amber-600" aria-hidden />
          </div>

          <p className="text-xs font-black uppercase tracking-[0.2em] text-amber-700">
            18+ Content
          </p>
          <h1 className="mt-2 text-xl font-black uppercase tracking-tight text-black">
            Age verification required
          </h1>
          <p className="mt-3 text-sm font-semibold leading-relaxed text-gray-600">
            {handle} may contain material intended for adults. You must be 18 or older to
            continue.
          </p>

          <div className="mt-6 flex flex-col gap-3">
            <button
              type="button"
              onClick={onConfirm}
              className="w-full rounded-xl border-2 border-black bg-[#15F5BA] px-4 py-3 text-sm font-black uppercase tracking-wide text-black shadow-[4px_4px_0px_#000] transition hover:-translate-y-0.5 hover:shadow-[5px_5px_0px_#000] active:translate-y-0 active:shadow-none"
            >
              I am 18 or older — enter
            </button>
            <button
              type="button"
              onClick={onLeave}
              className="w-full rounded-xl border-2 border-black bg-white px-4 py-3 text-sm font-bold text-gray-700 transition hover:bg-gray-50"
            >
              Leave page
            </button>
          </div>

          <p className="mt-5 text-[11px] font-semibold leading-relaxed text-gray-500">
            By entering, you confirm you are of legal age in your location to view adult
            content.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdultContentGate;
