import { IconSetItem } from "src/types";

declare global {
  interface Window {
    $iconSetCache: Map<string, IconSetItem[]>;
  }
}
