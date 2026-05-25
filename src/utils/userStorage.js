import { auth } from '../firebase';

const CURRENT_USER_KEY = 'jobTrackerCurrentUser';

export function getCurrentUserId() {
  const currentUser = auth.currentUser;
  if (currentUser?.uid) {
    return currentUser.uid;
  }

  const stored = localStorage.getItem(CURRENT_USER_KEY);
  return stored || null;
}

export function setCurrentUserId(userId) {
  if (userId) {
    localStorage.setItem(CURRENT_USER_KEY, userId);
  } else {
    localStorage.removeItem(CURRENT_USER_KEY);
  }
}

export function userStorageKey(baseKey) {
  const userId = getCurrentUserId();
  return userId ? `${baseKey}:${userId}` : `${baseKey}:anonymous`;
}
