import { TaxBand } from "@/types";

export interface TaxInfo {
  taxBands: TaxBand[];
  taxYear: string;
  taxableIncome: string;
}
