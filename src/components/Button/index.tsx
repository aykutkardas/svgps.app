import { ButtonHTMLAttributes } from "react";
import cx from "classnames";

export enum ButtonVariants {
  Primary = "primary",
  Ghost = "ghost",
  Secondary = "secondary",
}

const variants = {
  [ButtonVariants.Primary]:
    "bg-gradient-to-br hover:bg-gradient-to-bl from-violet-500 to-fuchsia-500",
  [ButtonVariants.Ghost]:
    "text-neutral-600 hover:text-neutral-900 dark:hover:text-gray-300",
  [ButtonVariants.Secondary]:
    "bg-gradient-to-br hover:bg-gradient-to-bl from-green-500 to-lime-500",
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
      "text-white rounded-sm py-2 px-4 text-sm font-medium",
      variants[variant],
      className
    )}
    {...props}
  >
    {children}
  </button>
);

export default Button;
