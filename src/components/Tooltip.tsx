import clsx from "clsx";

interface TooltipProps {
  message: string;
  position?: "top" | "bottom";
  children: React.ReactNode;
}

const Tooltip = ({ message, children, position = "top" }: TooltipProps) => (
  <div className="group relative inline-flex flex-col items-center">
    {children}
    <div
      className={clsx(
        "absolute hidden flex-col items-center rounded border border-neutral-300 group-hover:flex dark:border-neutral-700",
        {
          "-top-10": position === "top",
          "-bottom-10": position === "bottom",
        }
      )}
    >
      <span
        className={clsx(
          "relative z-10 min-w-max p-2 text-center text-xs leading-none text-neutral-600",
          "whitespace-no-wrap rounded-md bg-neutral-200 shadow-lg dark:bg-neutral-800 dark:text-neutral-400"
        )}
      >
        {message}
      </span>
    </div>
  </div>
);

export default Tooltip;
