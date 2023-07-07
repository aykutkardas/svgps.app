import clsx from "clsx";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import Button from "./Button";
import Icon from "./Icon";
import ExportButton from "./ExportButton";

export default function IconSetDownload({
  downloadAllJSX,
  downloadAllSVG,
  icons,
  auth,
  onlySelected,
}) {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <Button variant="icon">
          <Icon icon="download" size={20} />
        </Button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content className="z-50 mb-2 mr-10 w-40 origin-top-right rounded-lg bg-neutral-700 p-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <DropdownMenu.Label className="mb-2 border-b border-neutral-600 px-2 py-2 text-xs text-purple-400">
            Download {onlySelected ? `Selected` : "All"}
          </DropdownMenu.Label>

          <ExportButton
            className="!m-0 !w-full !border-0 !p-0"
            variant="ghost"
            icons={icons}
          >
            <DropdownMenu.Item
              className={clsx(
                "flex w-full cursor-pointer items-center rounded-md px-2 py-2 text-xs text-neutral-200 outline-none hover:bg-violet-500/50"
              )}
            >
              as JSON
            </DropdownMenu.Item>
          </ExportButton>

          <DropdownMenu.Item
            disabled={!auth}
            onClick={downloadAllSVG}
            className={clsx(
              "flex cursor-pointer items-center rounded-md px-2 py-2 text-xs text-neutral-200 outline-none hover:bg-violet-500",
              !auth && "text-neutral-400 hover:!bg-transparent"
            )}
          >
            as SVG {!auth && " (User Only)"}
          </DropdownMenu.Item>

          <DropdownMenu.Item
            disabled={!auth}
            onClick={downloadAllJSX}
            className={clsx(
              "flex cursor-pointer items-center rounded-md px-2 py-2 text-xs text-neutral-200 outline-none hover:bg-violet-500",
              !auth && "text-neutral-400 hover:!bg-transparent"
            )}
          >
            as JSX {!auth && " (User Only)"}
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
