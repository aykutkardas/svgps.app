import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

import Button from "./Button";
import Icon from "./Icon";
import Tooltip from "./Tooltip";
import { downloadAsJSON, downloadIconTypes } from "src/utils/iconActions";

export default function IconSetDownload({
  downloadAllJSX,
  downloadAllSVG,
  icons,
  onlySelected,
}) {
  return (
    <DropdownMenu.Root>
      <Tooltip message="Download">
        <DropdownMenu.Trigger asChild>
          <Button
            variant="icon"
            aria-label={`Download ${onlySelected ? "selected" : "all"}`}
            className={onlySelected ? "size-8" : undefined}
          >
            <Icon icon="download" size={onlySelected ? 17 : 18} />
          </Button>
        </DropdownMenu.Trigger>
      </Tooltip>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          side="top"
          align="end"
          sideOffset={8}
          className="menu-surface"
        >
          <DropdownMenu.Label className="menu-label">
            Download {onlySelected ? "Selected" : "All"}
          </DropdownMenu.Label>
          <DropdownMenu.Item
            className="menu-item"
            onSelect={() => downloadAsJSON(icons)}
          >
            <Icon icon="filetype-json" size={16} />
            JSON
          </DropdownMenu.Item>
          <DropdownMenu.Item
            className="menu-item"
            onSelect={() => downloadIconTypes(icons)}
          >
            <Icon icon="filetype-tsx" size={16} />
            Types for TypeScript
          </DropdownMenu.Item>
          <DropdownMenu.Item className="menu-item" onSelect={downloadAllSVG}>
            <Icon icon="filetype-svg" size={16} />
            SVG
          </DropdownMenu.Item>
          <DropdownMenu.Item className="menu-item" onSelect={downloadAllJSX}>
            <Icon icon="filetype-jsx" size={16} />
            JSX
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
