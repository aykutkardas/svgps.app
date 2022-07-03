import { nanoid } from "nanoid";
import toast from "react-hot-toast";
import { IconSetItem } from "src/types";

type ExtractJSON = (
  event: React.ChangeEvent<HTMLInputElement>
) => Promise<IconSetItem[]>;

const extractJSON: ExtractJSON = async (event) => {
  const selectedIcons = [];

  if (!window.File || !window.FileReader) {
    toast.error("Your browser does not support this feature");
    return selectedIcons;
  }

  const [file] = event.target.files;

  if (file && !file.type) {
    toast.error(
      "The File.type property does not appear to be supported on this browser."
    );
  }

  if (file.type !== "application/json") {
    toast.error("The selected file does not appear to be an JSON.");
  }

  const blob = new Blob([file], { type: "applicaton/json" });
  const content = await blob.text();
  try {
    const icons = JSON.parse(content)?.icons?.map((icon) => {
      icon.__meta = {
        id: nanoid(),
        _selected: false,
        content: "",
      };

      return icon;
    });

    return icons;
  } catch {
    toast.error("The file is not suitable for processing.");
    return [];
  }
};

export default extractJSON;
