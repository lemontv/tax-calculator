import { TaxBand } from "@/types";
import React from "react";
import styles from "./TaxBreakdown.module.css";

interface Props {
  taxBands: TaxBand[];
}

export const TaxBreakdown: React.FC<Props> = ({ taxBands }) => (
  <table className={styles.table}>
    <thead>
      <tr>
        <th>min</th>
        <th>max</th>
        <th>rate</th>
        <th>tax</th>
      </tr>
    </thead>
    <tbody>
      {taxBands.map(({ min, max, rate, tax }, index) => (
        <tr key={index}>
          <td>{min}</td>
          <td>{max}</td>
          <td>{rate}</td>
          <td>{tax}</td>
        </tr>
      ))}
    </tbody>
  </table>
);
