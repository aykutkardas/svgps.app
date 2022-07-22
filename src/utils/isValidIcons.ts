import { IconSetItem } from "src/types";

const isValidIcons = (icons: IconSetItem[]) =>
  icons.every((icon) => Boolean(icon.properties?.name));

export default isValidIcons;
