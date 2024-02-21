import { Bracket, TaxBand } from "@/types";

export const sortByMin = (a: Bracket, b: Bracket) => a.min - b.min;

export const calculateOwedTaxes = (taxBands: TaxBand[]) =>
  taxBands.reduce((sum, band) => sum + band.tax, 0);

export const calculateEffectiveRate = (taxBands: TaxBand[]) =>
  taxBands.length ? taxBands[taxBands.length - 1].rate : 0;

export const calculateTaxBands = (
  taxableIncome: number,
  brackets: Bracket[]
): TaxBand[] => {
  const filteredBackets = brackets.filter(
    (bracket) => bracket.min < taxableIncome
  );

  return filteredBackets.map(({ min, max, rate }, index) => {
    const tax =
      ((filteredBackets[index + 1]?.min || taxableIncome) - min) * rate;

    return {
      min,
      max: !max || max > taxableIncome ? taxableIncome : max,
      rate,
      tax,
    };
  });
};
