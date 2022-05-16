import { ButtonHTMLAttributes } from "react";

import Button, { ButtonVariants } from "src/components/Button";
import { IconsType } from "src/types";
import convertToSelectionFormat from "src/utils/convertToSelectionFormat";

interface DownloadProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icons: IconsType;
  variant?: ButtonVariants;
}

const Download = ({ icons, variant, children }: DownloadProps) => {
  const onClick = () => {
    const formattedIcons = convertToSelectionFormat(icons);

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
