import toast from "react-hot-toast";
import { getFormattedName, parse } from "svgps";
import { nanoid } from "nanoid";

const extractFiles = async (event) => {
  const selectedIcons = [];

  if (!window.FileList || !window.File || !window.FileReader) {
    toast.error("Your browser does not support this feature");
    return selectedIcons;
  }

  for (const file of event.target.files) {
    if (file && !file.type) {
      toast.error(
        "Error: The File.type property does not appear to be supported on this browser."
      );
      continue;
    }

    if (file.type !== "image/svg+xml") {
      toast.error("Error: The selected file does not appear to be an svg.");
      continue;
    }

    const blob = new Blob([file], { type: "text/svg" });
    const content = await blob.text();

    selectedIcons.push({
      id: nanoid(),
      name: getFormattedName(file.name),
      content,
      ...parse(content),
    });
  }

  return selectedIcons;
};

export default extractFiles;
