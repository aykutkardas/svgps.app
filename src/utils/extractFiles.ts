import { nanoid } from "nanoid";
import uniqBy from "lodash.uniqby";
import toast from "react-hot-toast";

import { IconSetItem } from "src/types";

import { convertToSelectionIconFormat } from "./convertToIconSet";

export const extractSVG = async (file): Promise<IconSetItem> => {
  const blob = new Blob([file], { type: "text/svg" });
  const content = await blob.text();

  /**
   * If we want to import svg element with `style` attribute, it brakes the application..
   * To prevent this to happen we will filter style attributes when we extract svgs.
   */
  const computedContent = content.replace(/style="[^"]*"/gi, "");
  return convertToSelectionIconFormat(file.name, computedContent);
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

  const toastId = toast.loading("Importing files...");

  if (!window.FileList || !window.File || !window.FileReader) {
    toast.error("Your browser does not support this feature");
    return;
  }

  try {
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
    /**
     * We want to display only one success toast after successfully importing icons.
     * Thats why we have to show our toast out of loop.
     */
    toast.success("Import completed...");
  } catch (error) {
    /**
     * If we try to add json file that doesn't have the file content that our program requires
     * toaster will stuck on production and it will throw an error on development.
     */
    toast.error("Something went wrong...");
  }

  callback?.(uniqBy([...importedIcons, ...icons], "properties.name"));

  toast.dismiss(toastId);
};
