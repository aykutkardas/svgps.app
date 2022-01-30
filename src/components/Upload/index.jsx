import { useRef } from "react";
import { toast } from "react-toastify";
import { getFormattedName, parse } from "svgps";
import Button from "../Button";

export default function Upload({ setIcons, icons, forceUpdate }) {
  const fileInput = useRef();

  const handleFileInput = async (event) => {
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
          name: getFormattedName(file.name),
          content,
          ...parse(content),
        });

        setIcons(selectedIcons);
        forceUpdate();
      }
      if (selectedIcons.length) {
        toast.success("Upload succesfull!");
      }
    }
  };

  return (
    <div className="max-w-[500px] mx-auto">
      <label className="relative flex items-center justify-center w-full text-center transition border border-dashed rounded-md cursor-pointer h-44 border-neutral-300 hover:bg-neutral-200 active:bg-neutral-200 bg-neutral-100">
        <input
          className="absolute inset-0 w-full opacity-0 cursor-pointer"
          type="file"
          multiple
          ref={fileInput}
          onChange={handleFileInput}
        />
          <span className="text-lg text-neutral-700">
            {icons.length ? `Selected ${icons.length} file${icons.length > 1 ? 's' : ''}` : "Drop your SVG or JSON files here"}
          </span>
      </label>
      <div className="relative inline-flex items-center justify-center w-11/12 my-6 text-center -translate-x-1/2 left-1/2 text-neutral-600 before:absolute before:block before:h-px before:w-5/12 before:left-0 before:bg-neutral-300 after:absolute after:block after:h-px after:w-5/12 after:right-0 after:bg-neutral-300">
        or
      </div>
      <div className="flex items-center justify-center space-x-8">
        <Button>
          Upload
          <input
            className="absolute inset-0 w-full opacity-0 cursor-pointer"
            type="file"
            multiple
            ref={fileInput}
            onChange={handleFileInput}
          />
        </Button>
        <Button>Paste</Button>
      </div>
    </div>
  );
}
