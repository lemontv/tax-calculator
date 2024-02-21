import { useState } from "react";
import { Loader } from "@/components/Loader";

import { TaxSummary } from "./TaxSummary";
import { TaxCalculatorForm } from "./TaxCalculatorForm";
import { useTaxBrackets } from "./useTaxBrackets";
import { TaxInfo } from "./types";
import styles from "./TaxCaculator.module.css";

export const TaxCalculator = () => {
  const [taxInfo, setTaxInfo] = useState<TaxInfo | null>(null);
  const { isLoading, getTaxBrackets } = useTaxBrackets();
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
      const taxBrackets = await getTaxBrackets(taxYear);
      setTaxInfo({ taxBrackets, taxYear, taxableIncome });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error";
      setErrorMsg(message);
      console.error(error);
    }
  };

  return (
    <div className={styles.wrapper}>
      <h1>Tax calculator</h1>
      <TaxCalculatorForm onSubmit={handleSubmit} />
      {!isLoading ? <TaxSummary taxInfo={taxInfo} errorMsg={errorMsg} /> : null}
      {isLoading ? <Loader /> : null}
    </div>
  );
};
