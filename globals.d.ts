export interface Hardal {
  trackEvent: Function;
}

declare global {
  interface Window {
    hardal: Hardal;
  }
}
