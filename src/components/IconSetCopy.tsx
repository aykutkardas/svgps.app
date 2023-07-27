import clsx from "clsx";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import Button from "./Button";
import Icon from "./Icon";
import { copyAsJSON, copyAsTypes } from "src/utils/iconActions";

export default function IconSetCopy({ icons, onlySelected }) {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <Button variant="icon">
          <Icon icon="copy" size={20} />
        </Button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content className="z-50 mb-2 mr-10 w-40 origin-top-right rounded-lg bg-neutral-700 p-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <DropdownMenu.Label className="mb-2 border-b border-neutral-600 px-2 py-2 text-xs text-purple-400">
            Copy {onlySelected ? `Selected` : "All"}
          </DropdownMenu.Label>

          <DropdownMenu.Item
            onClick={() => copyAsJSON(icons)}
            className={clsx(
              "flex w-full cursor-pointer items-center rounded-md px-2 py-2 text-xs text-neutral-200 outline-none hover:bg-violet-500/50"
            )}
          >
            JSON
          </DropdownMenu.Item>

          <DropdownMenu.Item
            onClick={() => copyAsTypes(icons)}
            className={clsx(
              "flex w-full cursor-pointer items-center rounded-md px-2 py-2 text-xs text-neutral-200 outline-none hover:bg-violet-500/50"
            )}
          >
            Types for TypeScript
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
