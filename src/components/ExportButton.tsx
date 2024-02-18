import { ComponentProps } from "react";
import { klona } from "klona";
import clsx from "clsx";

import Button from "src/components/Button";
import { convertToIconSet } from "src/utils/convertToIconSet";
import { IconSetItem } from "src/types";

interface ExportButtonProps extends ComponentProps<typeof Button> {
  icons: IconSetItem[];
}

const ExportButton = ({
  icons,
  children,
  className,
  ...props
}: ExportButtonProps) => {
  const onClick = () => {
    const formattedIcons = convertToIconSet(
      icons.map((icon) => {
        const newIcon = klona(icon);
        delete newIcon.__meta;
        return newIcon;
      }),
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
      className={clsx("w-full sm:w-auto", className)}
      onClick={onClick}
      {...props}
    >
      {children}
    </Button>
  );
};

export default ExportButton;
