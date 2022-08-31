import toast from "react-hot-toast";
import { IconSetItem } from "src/types";

import { convertToSelectionIconFormat } from "./convertToIconSet";

type ExtractFiles = (event: File[]) => Promise<IconSetItem[]>;

const extractFiles: ExtractFiles = async (files) => {
  const selectedIcons = [];

  if (!window.FileList || !window.File || !window.FileReader) {
    toast.error("Your browser does not support this feature");
    return selectedIcons;
  }

  for (const file of files) {
    if (file && !file.type) {
      toast.error(
        "The File.type property does not appear to be supported on this browser."
      );
      continue;
    }

    if (file.type !== "image/svg+xml") {
      toast.error("The selected file does not appear to be a SVG.");
      continue;
    }

    const blob = new Blob([file], { type: "text/svg" });
    const content = await blob.text();

    const iconData = convertToSelectionIconFormat(file.name, content);

    selectedIcons.push(iconData);
  }

  return selectedIcons.filter(Boolean);
};

export default extractFiles;
