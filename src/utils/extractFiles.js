import { toast } from "react-toastify";
import { getFormattedName, parse } from "svgps";
import { nanoid } from "nanoid";

const extractFiles = async (event) => {
  const selectedIcons = [];

  if (window.FileList && window.File && window.FileReader) {
    for (let i = 0; i < event.target.files.length; i++) {
      const file = event.target.files[i];
      const blob = new Blob([file], { type: "text/svg" });

      if (file && !file.type) {
        toast.dark(
          "Error: The File.type property does not appear to be supported on this browser."
        );
        continue;
      }

      if (file.type !== "image/svg+xml") {
        toast.dark("Error: The selected file does not appear to be an svg.");
        continue;
      }

      const content = await blob.text();

      selectedIcons.push({
        id: nanoid(),
        name: getFormattedName(file.name),
        content,
        ...parse(content),
      });
    }

    if (selectedIcons.length) {
      toast.success("Upload succesfull!");
    }

    return selectedIcons;
  }
};

export default extractFiles;
