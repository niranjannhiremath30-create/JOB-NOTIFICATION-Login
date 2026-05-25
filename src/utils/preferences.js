import { userStorageKey } from './userStorage';

function storageKey() {
  return userStorageKey('jobTrackerPreferences');
}

const DEFAULT = {
  roleKeywords: "",
  preferredLocations: [],
  preferredMode: [],
  experienceLevel: "",
  skills: "",
  minMatchScore: 40,
};

export function getPreferences() {
  try {
    const raw = localStorage.getItem(storageKey());
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return { ...DEFAULT, ...parsed };
  } catch {
    return null;
  }
}

export function savePreferences(prefs) {
  const data = {
    roleKeywords: prefs.roleKeywords || "",
    preferredLocations: prefs.preferredLocations || [],
    preferredMode: prefs.preferredMode || [],
    experienceLevel: prefs.experienceLevel || "",
    skills: prefs.skills || "",
    minMatchScore: Math.min(100, Math.max(0, Number(prefs.minMatchScore) || 40)),
  };
  localStorage.setItem(storageKey(), JSON.stringify(data));
  return data;
}

export function hasPreferences() {
  const p = getPreferences();
  return p != null;
}
