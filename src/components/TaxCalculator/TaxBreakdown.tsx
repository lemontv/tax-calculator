import React from "react";
import { TaxBand } from "@/types";
import { formatCurrency, formatPercentage } from "@/helpers/formatter";

import styles from "./TaxBreakdown.module.css";

interface Props {
  taxBands: TaxBand[];
}

export const TaxBreakdown: React.FC<Props> = ({ taxBands }) => {
  if (!taxBands.length) return null;

  return (
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
            <td>{formatCurrency(min)}</td>
            <td>{formatCurrency(max)}</td>
            <td>{formatPercentage(rate)}</td>
            <td>{formatCurrency(tax)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
