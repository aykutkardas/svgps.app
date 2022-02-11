import React from "react";

import styles from "./Button.module.css";

const Button = ({ children, ...props }) => (
  <button className={styles.Button} {...props}>
    {children}
  </button>
);

export default Button;
