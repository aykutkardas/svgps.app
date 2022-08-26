import { ButtonHTMLAttributes } from "react";
import cx from "classnames";

export enum ButtonVariants {
  Primary = "primary",
  Secondary = "secondary",
  Success = "success",
  Ghost = "ghost",
}

const variants = {
  [ButtonVariants.Primary]:
    "text-white bg-fuchsia-500 hover:bg-fuchsia-600 shadow-md",
  [ButtonVariants.Secondary]:
    "text-white bg-sky-500 hover:bg-sky-600 shadow-md",
  [ButtonVariants.Success]:
    "text-white bg-green-500 hover:bg-green-600 shadow-md",
  [ButtonVariants.Ghost]:
    "text-neutral-700 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-gray-300 shadow-none",
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariants;
}

const Button = ({ children, className, variant, ...props }: ButtonProps) => (
  <button
    className={cx(
      "inline-flex justify-center px-4 py-2 text-sm font-medium",
      "focus:outline-none focus-visible:ring-1 focus-visible:ring-purple-300/50 focus-visible:ring-offset-2",
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
