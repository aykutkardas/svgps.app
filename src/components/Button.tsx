import { ButtonHTMLAttributes } from "react";
import clsx from "clsx";

export enum ButtonVariants {
  Primary = "primary",
  Secondary = "secondary",
  Success = "success",
  Ghost = "ghost",
}

const variants = {
  [ButtonVariants.Primary]:
    "text-white bg-purple-500 hover:bg-purple-600 shadow-md focus:ring-purple-500",
  [ButtonVariants.Secondary]:
    "text-white bg-sky-500 hover:bg-sky-600 shadow-md focus:ring-sky-500",
  [ButtonVariants.Success]:
    "text-white bg-green-500 hover:bg-green-600 shadow-md focus:ring-green-500",
  [ButtonVariants.Ghost]:
    "text-neutral-700 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-gray-300 focus:ring-gray-500 shadow-none",
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariants;
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
