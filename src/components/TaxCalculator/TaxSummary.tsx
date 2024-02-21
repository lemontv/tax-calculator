import React from "react";
import { ErrorMsg } from "@/components/ErrorMsg";
import { TaxBreakdown } from "./TaxBreakdown";
import { calculateOwedTaxes } from "./utils";
import { TaxInfo } from "./types";

interface Props {
  taxInfo: TaxInfo | null;
  errorMsg: string | null;
}

export const TaxSummary: React.FC<Props> = ({ taxInfo, errorMsg }) => {
  if (errorMsg) return <ErrorMsg>{errorMsg}</ErrorMsg>;

  if (!taxInfo) return null;
  const { taxYear, taxableIncome, taxBands } = taxInfo;

  const owedTaxes = calculateOwedTaxes(taxBands);

  return (
    <div>
      <div>{taxYear} Tax Year</div>
      <div>Taxable Income {taxableIncome}</div>
      <div>Owed Taxes {owedTaxes}</div>
      <TaxBreakdown taxBands={taxBands} />
    </div>
  );
};
