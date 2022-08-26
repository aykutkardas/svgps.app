import { ButtonHTMLAttributes } from "react";
import cx from "classnames";

export enum ButtonVariants {
  Primary = "primary",
  Secondary = "secondary",
  Export = "export",
  Ghost = "ghost",
}

const variants = {
  [ButtonVariants.Primary]:
    "text-white bg-gradient-to-br hover:bg-gradient-to-bl from-violet-500 to-fuchsia-500",
  [ButtonVariants.Secondary]:
    "text-white  bg-gradient-to-br hover:bg-gradient-to-bl from-green-500 to-lime-500",
  [ButtonVariants.Export]:
    "text-white  bg-gradient-to-br hover:bg-gradient-to-bl from-blue-500 to-sky-700",
  [ButtonVariants.Ghost]:
    "text-neutral-700 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-gray-300",
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariants;
}

const Button = ({
  children,
  className,
  variant = ButtonVariants.Primary,
  ...props
}: ButtonProps) => (
  <button
    className={cx(
      "rounded-sm py-2 px-4 text-sm font-medium",
      variants[variant],
      className
    )}
    {...props}
  >
    {children}
  </button>
);

export default Button;
