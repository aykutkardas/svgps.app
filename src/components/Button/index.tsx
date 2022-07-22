import { ButtonHTMLAttributes } from "react";
import cx from "classnames";

import styles from "./Button.module.css";

export enum ButtonVariants {
  Ghost = "ghost",
  Secondary = "secondary",
}

const variants = {
  [ButtonVariants.Ghost]: styles.Ghost,
  [ButtonVariants.Secondary]: styles.Secondary,
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariants;
}

const Button = ({ children, className, variant, ...props }: ButtonProps) => (
  <button
    className={cx(styles.Button, variants[variant], className)}
    {...props}
  >
    {children}
  </button>
);

export default Button;
