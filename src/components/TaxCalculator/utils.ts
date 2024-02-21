import { Bracket, TaxBand } from "@/types";

export const sortByMin = (a: Bracket, b: Bracket) => a.min - b.min;

export const calculateOwedTaxes = (taxBands: TaxBand[]) =>
  taxBands.reduce((sum, band) => sum + band.tax, 0);

export const calculateTaxBands = (
  taxableIncome: number,
  brackets: Bracket[]
): TaxBand[] => {
  const effectedBrackets = brackets.filter(
    (bracket) => bracket.min < taxableIncome
  );

  return effectedBrackets.map(({ min, max, rate }, index) => {
    const tax =
      ((effectedBrackets[index + 1]?.min || taxableIncome) - min) * rate;

    return {
      min,
      max: !max || max > taxableIncome ? taxableIncome : max,
      rate,
      tax,
    };
  });
};
