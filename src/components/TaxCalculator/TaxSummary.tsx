import React from "react";
import { ErrorMsg } from "@/components/ErrorMsg";
import { formatCurrency, formatPercentage } from "@/helpers/formatter";

import { TaxBreakdown } from "./TaxBreakdown";
import {
  calculateEffectiveRate,
  calculateOwedTaxes,
  calculateTaxBands,
} from "./utils";
import { TaxInfo } from "./types";
import styles from "./TaxSummary.module.css";

interface TaxDetailProps {
  label: React.ReactNode;
  value: React.ReactNode;
}

export const TaxDetail: React.FC<TaxDetailProps> = ({ label, value }) => (
  <div>
    <strong>{label}</strong> {value}
  </div>
);

interface Props {
  taxInfo: TaxInfo | null;
  errorMsg: string | null;
}

export const TaxSummary: React.FC<Props> = ({ taxInfo, errorMsg }) => {
  if (errorMsg) return <ErrorMsg>{errorMsg}</ErrorMsg>;

  if (!taxInfo) return null;
  const { taxYear, taxableIncome, taxBrackets } = taxInfo;

  const income = parseFloat(taxableIncome);
  const taxBands = calculateTaxBands(income, taxBrackets);
  const totalTaxes = calculateOwedTaxes(taxBands);
  const effectiveRate = calculateEffectiveRate(income, totalTaxes);

  return (
    <div className={styles.summary}>
      <div className={styles.summaryDetails}>
        <TaxDetail label="Tax year" value={taxYear} />
        <TaxDetail label="Taxable income" value={formatCurrency(income)} />
        <TaxDetail label="Total taxes" value={formatCurrency(totalTaxes)} />
        <TaxDetail
          label="Effective rate"
          value={formatPercentage(effectiveRate)}
        />
      </div>
      <TaxBreakdown taxBands={taxBands} />
    </div>
  );
};
