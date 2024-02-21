import React from "react";
import { ErrorMsg } from "@/components/ErrorMsg";
import { TaxBreakdown } from "./TaxBreakdown";
import { calculateEffectiveRate, calculateOwedTaxes } from "./utils";
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
  const { taxYear, taxableIncome, taxBands } = taxInfo;

  const owedTaxes = calculateOwedTaxes(taxBands);
  const effectiveRate = calculateEffectiveRate(taxBands);

  return (
    <div className={styles.summary}>
      <div className={styles.summaryDetails}>
        <TaxDetail label="Tax year" value={taxYear} />
        <TaxDetail label="Taxable income" value={taxableIncome} />
        <TaxDetail label="Owed taxes" value={owedTaxes} />
        <TaxDetail label="Effective rate" value={effectiveRate} />
      </div>
      <TaxBreakdown taxBands={taxBands} />
    </div>
  );
};
