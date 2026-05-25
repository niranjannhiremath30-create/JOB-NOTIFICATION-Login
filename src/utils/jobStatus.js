import { userStorageKey } from './userStorage';

function statusKey() {
  return userStorageKey('jobTrackerStatus');
}

function updatesKey() {
  return userStorageKey('jobTrackerUpdates');
}

const VALID_STATUSES = ["Not Applied", "Applied", "Rejected", "Selected"];
const DEFAULT_STATUS = "Not Applied";

export function getJobStatus(jobId) {
  try {
    const raw = localStorage.getItem(statusKey());
    const map = raw ? JSON.parse(raw) : {};
    const s = map[jobId];
    return VALID_STATUSES.includes(s) ? s : DEFAULT_STATUS;
  } catch {
    return DEFAULT_STATUS;
  }
}

export function getAllStatuses() {
  try {
    const raw = localStorage.getItem(statusKey());
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function setJobStatus(jobId, status) {
  if (!VALID_STATUSES.includes(status)) status = DEFAULT_STATUS;
  try {
    const map = getAllStatuses();
    map[jobId] = status;
    localStorage.setItem(statusKey(), JSON.stringify(map));
    return map[jobId];
  } catch {
    return DEFAULT_STATUS;
  }
}

export function addStatusUpdate(jobId, status, title, company) {
  if (status === "Not Applied") return;
  try {
    const raw = localStorage.getItem(updatesKey());
    const arr = raw ? JSON.parse(raw) : [];
    arr.unshift({
      jobId,
      status,
      title: title || "",
      company: company || "",
      updatedAt: new Date().toISOString(),
    });
    localStorage.setItem(updatesKey(), JSON.stringify(arr.slice(0, 50)));
  } catch {
    // ignore
  }
}

export function getStatusUpdates() {
  try {
    const raw = localStorage.getItem(updatesKey());
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}
