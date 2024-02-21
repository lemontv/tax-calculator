import React from "react";
import styles from "./ErrorMsg.module.css";

interface Props {
  children: React.ReactNode;
}

export const ErrorMsg: React.FC<Props> = ({ children }) => (
  <div className={styles.error}>{children}</div>
);
