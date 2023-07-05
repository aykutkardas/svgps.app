import { IconSetItem } from "src/types";

export interface Hardal {
  trackEvent: (key: string) => void;
}

declare global {
  interface Window {
    hardal: Hardal;
    $iconSetCache: Map<string, IconSetItem[]>;
  }
}
