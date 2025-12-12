const SEGMENT_STORAGE_KEY = "revvit_segment";

export function setSegment(segment: string) {
  if (typeof window === "undefined") return;
  localStorage.setItem(SEGMENT_STORAGE_KEY, segment);
}

export function getSegment() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(SEGMENT_STORAGE_KEY);
}
