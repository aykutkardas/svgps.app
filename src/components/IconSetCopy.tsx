import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

import Button from "./Button";
import Icon from "./Icon";
import Tooltip from "./Tooltip";
import { copyAsJSON, copyAsTypes } from "src/utils/iconActions";

export default function IconSetCopy({ icons, onlySelected }) {
  return (
    <DropdownMenu.Root>
      <Tooltip message="Copy">
        <DropdownMenu.Trigger asChild>
          <Button
            variant="icon"
            aria-label={`Copy ${onlySelected ? "selected" : "all"}`}
            className={onlySelected ? "size-8" : undefined}
          >
            <Icon icon="copy" size={onlySelected ? 17 : 18} />
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
            Copy {onlySelected ? "Selected" : "All"}
          </DropdownMenu.Label>
          <DropdownMenu.Item
            className="menu-item"
            onSelect={() => copyAsJSON(icons)}
          >
            <Icon icon="filetype-json" size={16} />
            JSON
          </DropdownMenu.Item>
          <DropdownMenu.Item
            className="menu-item"
            onSelect={() => copyAsTypes(icons)}
          >
            <Icon icon="filetype-tsx" size={16} />
            Types for TypeScript
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
