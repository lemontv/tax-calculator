import { Bracket } from "@/types";

export interface TaxInfo {
  taxBrackets: Bracket[];
  taxYear: string;
  taxableIncome: string;
}
