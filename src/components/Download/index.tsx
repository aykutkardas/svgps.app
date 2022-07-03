import { ButtonHTMLAttributes } from "react";

import Button, { ButtonVariants } from "src/components/Button";
import { IconSetItem } from "src/types";
import convertToIconSet from "src/utils/convertToIconSet";

interface DownloadProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icons: IconSetItem[];
  variant?: ButtonVariants;
}

const Download = ({ icons, variant, children }: DownloadProps) => {
  const onClick = () => {
    const formattedIcons = convertToIconSet(
      icons.map((icon) => {
        delete icon.__meta;
        return icon;
      })
    );

    const dataStr =
      "data:text/json;charset=utf-8," +
      encodeURIComponent(JSON.stringify(formattedIcons, null, 2));
    const downloadElement = document.createElement("a");
    downloadElement.setAttribute("href", dataStr);
    downloadElement.setAttribute("download", "selection.json");
    downloadElement.click();
  };

  return (
    <Button variant={variant} onClick={onClick}>
      {children}
    </Button>
  );
};

export default Download;
