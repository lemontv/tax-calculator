import { useState } from "react";
import { Loader } from "@/components/Loader";

import { ErrorMsgs } from "@/components/ErrorMsgs";
import { ErrorMsg } from "@/types";
import { TaxSummary } from "./TaxSummary";
import { TaxCalculatorForm } from "./TaxCalculatorForm";
import { useTaxBrackets } from "./useTaxBrackets";
import { TaxInfo } from "./types";
import styles from "./TaxCaculator.module.css";

export const TaxCalculator = () => {
  const [taxInfo, setTaxInfo] = useState<TaxInfo | null>(null);
  const { isLoading, getTaxBrackets } = useTaxBrackets();
  const [errorMsgs, setErrorMsgs] = useState<ErrorMsg[] | null>(null);

  const handleSubmit = async (taxableIncome: string, taxYear: string) => {
    if (isLoading) return;

    // Clean error message
    setErrorMsgs(null);

    // Clean tax info
    setTaxInfo(null);

    if (!taxableIncome || !taxYear) return;

    try {
      const taxBrackets = await getTaxBrackets(taxYear);
      setTaxInfo({ taxBrackets, taxYear, taxableIncome });
    } catch (error) {
      setErrorMsgs(error as ErrorMsg[]);
    }
  };

  return (
    <div className={styles.wrapper}>
      <h1>Tax calculator</h1>
      <TaxCalculatorForm onSubmit={handleSubmit} />

      {isLoading ? <Loader /> : null}
      {!isLoading && errorMsgs ? <ErrorMsgs errorMsgs={errorMsgs} /> : null}
      {!isLoading && !errorMsgs ? <TaxSummary taxInfo={taxInfo} /> : null}
    </div>
  );
};
