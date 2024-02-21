import React, { useId } from "react";
import styles from "./Input.module.css";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const Input: React.FC<Props> = ({ label, ...rest }) => {
  const inputId = useId();

  return (
    <div>
      <label className={styles.label} htmlFor={inputId}>
        {label}
      </label>
      <input className={styles.input} id={inputId} {...rest} />
    </div>
  );
};
