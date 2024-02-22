import { formatCurrency, formatPercentage } from "./formatter";

describe("formatter", () => {
  describe("formatCurrency()", () => {
    it("Should return formatted currency", () => {
      expect(formatCurrency(100)).toBe("$100.00");
      expect(formatCurrency("100")).toBe("$100.00");
      expect(formatCurrency(1234567)).toBe("$1,234,567.00");
      expect(formatCurrency(1234567.123)).toBe("$1,234,567.12");
      expect(formatCurrency(1234567.125)).toBe("$1,234,567.13");
    });
  });
  describe("formatPercentage()", () => {
    it("Should return formatted percentage", () => {
      expect(formatPercentage(1)).toBe("100.00%");
      expect(formatPercentage(0.01)).toBe("1.00%");
      expect(formatPercentage(0.01, 4)).toBe("1.0000%");
    });
  });
});
