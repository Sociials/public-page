const STORAGE_PREFIX = "sociials-age-verified:";

export const getAgeGateStorageKey = (username) =>
  `${STORAGE_PREFIX}${String(username || "").toLowerCase()}`;

export const isAgeVerified = (username) => {
  if (typeof window === "undefined" || !username) return false;
  try {
    return sessionStorage.getItem(getAgeGateStorageKey(username)) === "1";
  } catch {
    return false;
  }
};

export const setAgeVerified = (username) => {
  if (typeof window === "undefined" || !username) return;
  try {
    sessionStorage.setItem(getAgeGateStorageKey(username), "1");
  } catch {
    // Ignore storage failures; gate will reappear next visit.
  }
};
