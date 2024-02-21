import React, { useMemo, useState } from "react";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";

interface Props {
  onSubmit: (taxableIncome: string, taxYear: string) => Promise<void>;
}

export const TaxCalculatorForm: React.FC<Props> = ({ onSubmit }) => {
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
      await onSubmit(taxableIncome, taxYear);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = async (event: React.FormEvent<HTMLFormElement>) => {
    // Prevent default form reset event
    event.preventDefault();

    setTaxYear("");
    setTaxableIncome("");

    // Clean up the tax infor
    await onSubmit("", "");
  };

  return (
    <form onSubmit={handleSubmit} onReset={handleReset}>
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
      <Button disabled={isLoading} type="submit">
        calculate
      </Button>
      <Button disabled={isLoading} type="reset">
        Reset
      </Button>
    </form>
  );
};
