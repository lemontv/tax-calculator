import { useState } from "react";

import { TaxSummary } from "./TaxSummary";
import { TaxCalculatorForm } from "./TaxCalculatorForm";
import { useTaxCalculator } from "./useTaxCalculator";
import { TaxInfo } from "./types";

export const TaxCalculator = () => {
  const [taxInfo, setTaxInfo] = useState<TaxInfo | null>(null);
  const { isLoading, getTaxBands } = useTaxCalculator();
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (taxableIncome: string, taxYear: string) => {
    if (isLoading) return;

    // Clean error message
    setErrorMsg(null);

    // Clean tax info
    setTaxInfo(null);

    if (!taxableIncome || !taxYear) {
      return;
    }

    try {
      const taxBands = await getTaxBands(parseFloat(taxableIncome), taxYear);
      setTaxInfo({ taxBands, taxYear, taxableIncome });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error";
      setErrorMsg(message);
      console.error(error);
    }
  };

  return (
    <div>
      <TaxCalculatorForm onSubmit={handleSubmit} />
      <TaxSummary taxInfo={taxInfo} errorMsg={errorMsg} />
    </div>
  );
};
