import { nanoid } from "nanoid";
import toast from "react-hot-toast";

import { IconSetItem } from "src/types";

import { convertToSelectionIconFormat } from "./convertToIconSet";

export const extractSVG = async (file): Promise<IconSetItem> => {
  const blob = new Blob([file], { type: "text/svg" });
  const content = await blob.text();

  const iconData = convertToSelectionIconFormat(file.name, content);

  return iconData;
};

export const extractJSON = async (file): Promise<IconSetItem[]> => {
  const blob = new Blob([file], { type: "applicaton/json" });
  const content = await blob.text();

  try {
    const icons = JSON.parse(content)?.icons?.map((icon) => {
      icon.__meta = {
        id: nanoid(),
        _selected: false,
        content: "",
      };

      return icon || [];
    });

    return icons;
  } catch {
    toast.error("The file is not suitable for processing.");
    return [];
  }
};

export const importFiles = async (event, icons, callback) => {
  const importedIcons = [];

  if (!window.FileList || !window.File || !window.FileReader) {
    toast.error("Your browser does not support this feature");
    return;
  }

  for (const file of event.target.files) {
    if (file && !file.type) {
      toast.error(
        "The File.type property does not appear to be supported on this browser."
      );
      continue;
    }

    if (file.type === "image/svg+xml") {
      const icon = await extractSVG(file);
      importedIcons.push(icon);
    } else if (file.type === "application/json") {
      const icons = await extractJSON(file);
      importedIcons.push(...icons);
    } else {
      toast.error(`"${file.name}" file does not appear to be a SVG or JSON.`);
    }
  }

  const filteredIcons = icons.filter(
    (icon) =>
      !importedIcons.find(
        ({ properties }) => properties.name === icon.properties.name
      )
  );

  const filteredImportedIcons = importedIcons.filter(
    (icon) =>
      !filteredIcons.find(
        ({ properties }) => properties.name === icon.properties.name
      )
  );

  callback?.([...filteredIcons, ...filteredImportedIcons]);
};
