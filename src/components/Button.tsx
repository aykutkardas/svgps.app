import { ButtonHTMLAttributes } from "react";
import clsx from "clsx";

const variants = {
  primary:
    "text-white bg-purple-500 hover:bg-purple-600 shadow-md focus:ring-purple-500",
  secondary:
    "text-white bg-sky-500 hover:bg-sky-600 shadow-md focus:ring-sky-500",
  success:
    "text-white bg-green-500 hover:bg-green-600 shadow-md focus:ring-green-500",
  ghost:
    "text-neutral-700 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-gray-300 focus:ring-gray-500 shadow-none",
  icon: "focus:ring-gray-500 shadow-none !px-2 border border-dashed !border-neutral-300 dark:!border-neutral-700 opacity-100 hover:opacity-70",
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof variants;
}

const Button = ({ children, className, variant, ...props }: ButtonProps) => (
  <button
    className={clsx(
      "inline-flex items-center justify-center px-4 py-2 text-sm font-medium",
      "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-neutral-50 dark:focus:ring-offset-neutral-900",
      "rounded-md border border-transparent transition duration-200",
      variants[variant],
      className
    )}
    {...props}
  >
    {children}
  </button>
);

export default Button;
