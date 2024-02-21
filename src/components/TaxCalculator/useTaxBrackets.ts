import { useState, useMemo } from "react";
import { Bracket } from "@/types";
import { getTaxBracketsApi } from "@/apis/getTaxBrackets";

import { sortByMin } from "./utils";

export const useTaxBrackets = () => {
  const taxBracketMap = useMemo(() => new Map<string, Bracket[]>(), []);
  const [isLoading, setLoading] = useState(false);

  const getTaxBrackets = async (taxYear: string) => {
    let taxBrackets: Bracket[] = [];

    if (!taxBracketMap.has(taxYear)) {
      try {
        setLoading(true);
        const response = await getTaxBracketsApi(taxYear);

        taxBrackets = response.tax_brackets;
        taxBrackets.sort(sortByMin);
        taxBracketMap.set(taxYear, taxBrackets);
      } finally {
        setLoading(false);
      }
    } else {
      taxBrackets = taxBracketMap.get(taxYear)!;
    }

    return taxBrackets;
  };

  return {
    getTaxBrackets,
    isLoading,
  };
};
