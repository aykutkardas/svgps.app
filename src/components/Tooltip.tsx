import clsx from "clsx";

interface TooltipProps {
  message: string;
  position?: "top" | "bottom" | "left" | "right";
  children: React.ReactNode;
}

const Tooltip = ({ message, children, position = "top" }: TooltipProps) => (
  <div className="group/tooltip relative inline-flex flex-col items-center">
    {children}
    <span
      role="tooltip"
      className={clsx(
        "pointer-events-none absolute z-50 rounded-md border border-line-strong bg-surface-raised px-2 py-1",
        "text-[11px] leading-none font-medium whitespace-nowrap text-fg shadow-elevated",
        "opacity-0 transition duration-150 group-hover/tooltip:opacity-100",
        {
          "bottom-full mb-2 translate-y-1 group-hover/tooltip:translate-y-0":
            position === "top",
          "top-full mt-2 -translate-y-1 group-hover/tooltip:translate-y-0":
            position === "bottom",
        },
      )}
    >
      {message}
    </span>
  </div>
);

export default Tooltip;
