import clsx from "clsx";

interface TooltipProps {
    message: string;
    children: React.ReactNode;
  }

const Tooltip = ({ 
  message, children 
}: TooltipProps) =>  (
    <div className="relative inline-flex flex-col items-center group">
      {children}
      <div className="absolute -top-10 flex-col items-center hidden mb-6 group-hover:flex rounded border dark:border-neutral-700 border-neutral-300">
        <span className={clsx("relative z-10 p-2 text-xs leading-none text-neutral-600 min-w-max text-center",
        "dark:text-neutral-400 whitespace-no-wrap bg-neutral-200 dark:bg-neutral-800 shadow-lg rounded-md")}>{message}</span>
      </div>
    </div>
  );

export default Tooltip;