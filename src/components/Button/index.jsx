import styles from "./Button.module.css";

import cx from "classnames";

const variants = {
  ghost: styles.Ghost,
  secondary: styles.Secondary,
};

const Button = ({ children, className, variant, ...props }) => (
  <button
    className={cx(styles.Button, variants[variant], className)}
    {...props}
  >
    {children}
  </button>
);

export default Button;
