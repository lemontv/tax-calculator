import { TaxBand, Bracket } from "@/types";
import {
  sortByMin,
  calculateOwedTaxes,
  calculateEffectiveRate,
  calculateTaxBands,
} from "./utils";

describe("TaxCalculator/utils", () => {
  describe("sortByMin", () => {
    it("should return a negative value if the first bracket has a smaller min value", () => {
      const bracketA = { min: 5, rate: 0 };
      const bracketB = { min: 10, rate: 0 };
      expect(sortByMin(bracketA, bracketB)).toBeLessThan(0);
    });

    it("should return a positive value if the first bracket has a larger min value", () => {
      const bracketA = { min: 15, rate: 0 };
      const bracketB = { min: 10, rate: 0 };
      expect(sortByMin(bracketA, bracketB)).toBeGreaterThan(0);
    });

    it("should return 0 if both brackets have the same min value", () => {
      const bracketA = { min: 10, rate: 0 };
      const bracketB = { min: 10, rate: 0 };
      expect(sortByMin(bracketA, bracketB)).toBe(0);
    });
  });

  describe("calculateOwedTaxes", () => {
    it("should correctly sum up the tax values from all tax bands", () => {
      const taxBands = [
        { min: 0, max: 100, rate: 0, tax: 100 },
        { min: 100, max: 200, rate: 0, tax: 200 },
        { min: 200, max: 300, rate: 0, tax: 300 },
      ];
      const totalTaxes = calculateOwedTaxes(taxBands);
      expect(totalTaxes).toBe(600);
    });

    it("should return 0 if tax bands array is empty", () => {
      const taxBands: TaxBand[] = [];
      const totalTaxes = calculateOwedTaxes(taxBands);
      expect(totalTaxes).toBe(0);
    });
  });

  describe("calculateEffectiveRate", () => {
    it("should calculate the correct effective tax rate", () => {
      const taxableIncome = 1000;
      const totalTaxes = 100;
      const effectiveRate = calculateEffectiveRate(taxableIncome, totalTaxes);
      expect(effectiveRate).toBe(0.1); // 10% effective rate
    });

    it("should handle taxable income as a string", () => {
      const taxableIncome = "2000";
      const totalTaxes = 200;
      const effectiveRate = calculateEffectiveRate(taxableIncome, totalTaxes);
      expect(effectiveRate).toBe(0.1); // 10% effective rate
    });

    it("should return 0 if taxable income is 0", () => {
      const taxableIncome = 0;
      const totalTaxes = 100;
      const effectiveRate = calculateEffectiveRate(taxableIncome, totalTaxes);
      expect(effectiveRate).toBe(0);
    });
  });

  describe("calculateTaxBands", () => {
    const brackets: Bracket[] = [
      { min: 0, max: 50000, rate: 0.1 },
      { min: 50000, max: 100000, rate: 0.2 },
      { min: 100000, rate: 0.3 },
    ];

    it("should calculate tax bands for income within a single bracket", () => {
      const taxableIncome = 30000;
      const expectedTaxBands: TaxBand[] = [
        { min: 0, max: 30000, rate: 0.1, tax: 3000 },
      ];
      expect(calculateTaxBands(taxableIncome, brackets)).toEqual(
        expectedTaxBands
      );
    });

    it("should calculate tax bands for income spanning multiple brackets", () => {
      const taxableIncome = 75000;
      const expectedTaxBands: TaxBand[] = [
        { min: 0, max: 50000, rate: 0.1, tax: 5000 },
        { min: 50000, max: 75000, rate: 0.2, tax: 5000 },
      ];
      expect(calculateTaxBands(taxableIncome, brackets)).toEqual(
        expectedTaxBands
      );
    });

    it("should calculate tax bands for income exceeding the highest bracket", () => {
      const taxableIncome = 150000;
      const expectedTaxBands: TaxBand[] = [
        { min: 0, max: 50000, rate: 0.1, tax: 5000 },
        { min: 50000, max: 100000, rate: 0.2, tax: 10000 },
        { min: 100000, max: 150000, rate: 0.3, tax: 15000 },
      ];
      expect(calculateTaxBands(taxableIncome, brackets)).toEqual(
        expectedTaxBands
      );
    });

    it("should handle edge case where taxable income is exactly on a bracket boundary", () => {
      const taxableIncome = 50000;
      const expectedTaxBands: TaxBand[] = [
        { min: 0, max: 50000, rate: 0.1, tax: 5000 },
      ];
      expect(calculateTaxBands(taxableIncome, brackets)).toEqual(
        expectedTaxBands
      );
    });

    it("should handle edge case where taxable income is negative", () => {
      const taxableIncome = -50000;
      const expectedTaxBands: TaxBand[] = [];
      expect(calculateTaxBands(taxableIncome, brackets)).toEqual(
        expectedTaxBands
      );
    });

    it("should handle edge case where taxable income is zero", () => {
      const taxableIncome = 0;
      const expectedTaxBands: TaxBand[] = [];
      expect(calculateTaxBands(taxableIncome, brackets)).toEqual(
        expectedTaxBands
      );
    });
  });
});
