import React, { useMemo, useState } from "react";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import { getTaxBrackets } from "@/apis/getTaxBrackets";

import {
  calculateOwedTaxes,
  calculateTaxBands,
  getcalculatedBrackets,
} from "./utils";

export const TaxCalculator = () => {
  const [taxableIncome, setTaxableIncome] = useState<string>("");
  const [taxYear, setTaxYear] = useState<string>("");
  const [isLoading, setLoading] = useState(false);

  const funcMap = useMemo(() => {
    return new Map([
      ["taxableIncome", setTaxableIncome],
      ["taxYear", setTaxYear],
    ]);
  }, []);

  // @TODO move to a util function
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const updateField = funcMap.get(name);
    if (!updateField) return;
    updateField(value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    // Prevent default form submit event
    event.preventDefault();

    if (isLoading) return;
    setLoading(true);

    try {
      const taxBrackets = await getTaxBrackets(taxYear);
      const calculatedBrackets = getcalculatedBrackets(
        taxBrackets.tax_brackets
      );

      const parsedTaxabledIncome = parseFloat(taxableIncome);

      const taxBands = calculateTaxBands(
        parsedTaxabledIncome,
        calculatedBrackets
      );

      const owedTax = calculateOwedTaxes(taxBands);

      console.log(taxBands, owedTax);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        label="Taxable Income"
        type="number"
        name="taxableIncome"
        value={taxableIncome}
        onChange={handleChange}
      />
      <Input
        label="Tax Year"
        type="number"
        name="taxYear"
        value={taxYear}
        onChange={handleChange}
      />
      <Button type="submit">calculate</Button>
      <Button type="reset">Reset</Button>
    </form>
  );
};
