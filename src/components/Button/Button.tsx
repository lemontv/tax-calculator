import React, { ButtonHTMLAttributes } from "react";
import styles from "./Button.module.css";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {}
export const Button: React.FC<Props> = ({ children, ...rest }) => (
  <button className={styles.button} {...rest}>
    {children}
  </button>
);
