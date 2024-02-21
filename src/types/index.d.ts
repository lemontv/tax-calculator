export interface Bracket {
  min: number;
  max?: number;
  rate: number;
}

export interface TaxBand {
  min: number;
  max: number;
  rate: number;
  tax: number;
}

export interface TaxBracketsResponse {
  tax_brackets: Bracket[];
}
