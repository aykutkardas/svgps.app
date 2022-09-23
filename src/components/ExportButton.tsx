import { ButtonHTMLAttributes } from "react";
import { klona } from "klona";
import cx from "clsx";

import Button, { ButtonVariants } from "src/components/Button";
import { convertToIconSet } from "src/utils/convertToIconSet";
import { IconSetItem } from "src/types";

interface ExportButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icons: IconSetItem[] | Function;
  variant?: ButtonVariants;
}

const ExportButton = ({
  icons,
  variant,
  children,
  className,
}: ExportButtonProps) => {
  const onClick = () => {
    const _icons = typeof icons === "function" ? icons() : icons;

    const formattedIcons = convertToIconSet(
      _icons.map((icon) => {
        const newIcon = klona(icon);
        delete newIcon.__meta;
        return newIcon;
      })
    );

    const dataStr =
      "data:text/json;charset=utf-8," +
      encodeURIComponent(JSON.stringify(formattedIcons));
    const exportElement = document.createElement("a");
    exportElement.setAttribute("href", dataStr);
    exportElement.setAttribute("download", "selection.json");
    exportElement.click();
  };

  return (
    <Button
      className={cx("w-full sm:w-auto", className)}
      variant={variant}
      onClick={onClick}
    >
      {children}
    </Button>
  );
};

export default ExportButton;
