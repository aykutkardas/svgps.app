import styles from "./Button.module.css";

import cx from "classnames";
import { ButtonHTMLAttributes } from "react";

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
