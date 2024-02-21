import { useState, useMemo } from "react";
import { Bracket } from "@/types";
import { getTaxBrackets } from "@/apis/getTaxBrackets";

import { calculateTaxBands, sortByMin } from "./utils";

export const useTaxCalculator = () => {
  const taxBracketMap = useMemo(() => new Map<string, Bracket[]>(), []);
  const [isLoading, setLoading] = useState(false);

  const getTaxBands = async (taxableIncome: number, taxYear: string) => {
    let taxBrackets: Bracket[] = [];

    if (!taxBracketMap.has(taxYear)) {
      try {
        setLoading(true);
        const response = await getTaxBrackets(taxYear);

        taxBrackets = response.tax_brackets;
        taxBrackets.sort(sortByMin);
        taxBracketMap.set(taxYear, taxBrackets);
      } finally {
        setLoading(false);
      }
    } else {
      taxBrackets = taxBracketMap.get(taxYear)!;
    }

    const taxBands = calculateTaxBands(taxableIncome, taxBrackets);

    return taxBands;
  };

  return {
    getTaxBands,
    isLoading,
  };
};
