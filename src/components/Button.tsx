import { ButtonHTMLAttributes } from "react";
import clsx from "clsx";

const variants = {
  primary:
    "text-white bg-violet-600 hover:bg-violet-700 shadow-md focus:ring-violet-600 border-t border-x border-violet-500 border-b-transparent",
  secondary:
    "text-white bg-neutral-700 hover:bg-neutral-700/60 shadow-md focus:ring-neutral-600 border-t border-x border-neutral-600 border-b-transparent",
  ghost:
    "text-neutral-700 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-gray-300 focus:ring-gray-500 shadow-none",
  icon: "focus:ring-gray-500 shadow-none !px-2 border border-dashed !border-neutral-300 dark:!border-neutral-700 opacity-100 hover:opacity-70",
  ringlessGhost:
    "text-neutral-700 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-gray-300 shadow-none !ring-0 !ring-offset-0 !outline-none !focus:ring-offset-0 !focus:ring-0 !focus:outline-none",
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof variants;
}

const Button = ({
  children,
  className,
  variant = "primary",
  type = "button",
  ...props
}: ButtonProps) => (
  <button
    className={clsx(
      "inline-flex items-center justify-center px-4 py-[6px] text-sm font-medium",
      "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-neutral-50 dark:focus:ring-offset-neutral-900",
      "rounded-lg border border-transparent transition duration-200",
      variants[variant],
      { "cursor-not-allowed opacity-50": props.disabled },
      className,
    )}
    type={type}
    {...props}
  >
    {children}
  </button>
);

export default Button;
