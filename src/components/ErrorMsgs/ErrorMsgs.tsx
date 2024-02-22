import React from "react";
import styles from "./ErrorMsgs.module.css";
import { ErrorMsg } from "@/types";

interface Props {
  errorMsgs: ErrorMsg[] | unknown;
}

export const ErrorMsgs: React.FC<Props> = ({ errorMsgs }) => {
  if (!Array.isArray(errorMsgs)) {
    return <div className={styles.error}>Unknown error!</div>;
  }

  return (
    <div>
      {errorMsgs.map((error, index) => (
        <div className={styles.error} key={index}>
          {error.message}
        </div>
      ))}
    </div>
  );
};
