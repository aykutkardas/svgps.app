import { useContext } from "react";

import Button, { ButtonVariants } from "src/components/Button";
import ImportButton from "src/components/ImportButton";
import IconSetSearch from "src/components/IconSetSearch";
import { IconsContext } from "src/context/IconsContext";

const IconsAppHeader = ({ noIcons, search, setSearch }) => {
  const { icons, setIcons } = useContext(IconsContext);
  const selectedIcons = icons.filter((icon) => icon.__meta?._selected);

  const handleDeselect = () => {
    const deselectedIcons = icons.map((icon) => {
      icon.__meta = {
        ...(icon.__meta ?? {}),
        _selected: false,
      };
      return icon;
    });

    setIcons(deselectedIcons);
  };

  return (
    <div className="flex items-center justify-between p-4">
      <ImportButton />
      <div>
        {selectedIcons.length > 0 && (
          <Button
            variant={ButtonVariants.Ghost}
            className="text-xs !text-sky-500 hover:!text-sky-600"
            onClick={handleDeselect}
          >
            Deselect All
          </Button>
        )}
        <IconSetSearch setSearch={setSearch} disabled={noIcons && !search} />
      </div>
    </div>
  );
};

export default IconsAppHeader;
