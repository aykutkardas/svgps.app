import styles from "./Button.module.css";

import cx from "classnames";

const Button = ({ children, className, ...props }) => (
  <button className={cx(styles.Button, className)} {...props}>
    {children}
  </button>
);

export default Button;
