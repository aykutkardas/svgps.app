import { klona } from "klona";
import { ButtonHTMLAttributes } from "react";

import Button, { ButtonVariants } from "src/components/Button";
import { IconSetItem } from "src/types";
import { convertToIconSet } from "src/utils/convertToIconSet";

interface ExportButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icons: IconSetItem[];
  variant?: ButtonVariants;
}

const ExportButton = ({ icons, variant, children }: ExportButtonProps) => {
  const onClick = () => {
    const formattedIcons = convertToIconSet(
      icons.map((icon) => {
        const newIcon = klona(icon);
        delete newIcon.__meta;
        return newIcon;
      })
    );

    const dataStr =
      "data:text/json;charset=utf-8," +
      encodeURIComponent(JSON.stringify(formattedIcons, null, 2));
    const ExportButtonElement = document.createElement("a");
    ExportButtonElement.setAttribute("href", dataStr);
    ExportButtonElement.setAttribute("ExportButton", "selection.json");
    ExportButtonElement.click();
  };

  return (
    <Button variant={variant} onClick={onClick}>
      {children}
    </Button>
  );
};

export default ExportButton;
