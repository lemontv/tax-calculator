import { Bracket, TaxBand } from "@/types";

export const sortByMin = (a: Bracket, b: Bracket) => a.min - b.min;

export const calculateOwedTaxes = (taxBands: TaxBand[]) =>
  taxBands.reduce((sum, band) => sum + band.tax, 0);

export const calculateEffectiveRate = (
  taxableIncome: number | string,
  totalTaxes: number
) => {
  const income =
    typeof taxableIncome === "string"
      ? parseFloat(taxableIncome)
      : taxableIncome;
  const effectiveRate = income !== 0 ? totalTaxes / income : 0;

  return effectiveRate;
};

export const calculateTaxBands = (
  taxableIncome: number,
  brackets: Bracket[]
): TaxBand[] => {
  return brackets
    .filter((bracket) => bracket.min < taxableIncome) // Filter out the brackets which can apply the tax rate
    .map(({ min, max, rate }, index, filtered) => {
      // Caculate each level tax rates, the last one will be the taxable income
      const tax = ((filtered[index + 1]?.min || taxableIncome) - min) * rate;

      return {
        min,
        max: !max || max > taxableIncome ? taxableIncome : max,
        rate,
        tax,
      };
    });
};
