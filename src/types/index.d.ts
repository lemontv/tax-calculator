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

export interface ErrorMsg {
  code: string;
  field: string;
  message: string;
}

export interface ErrorResponse {
  errors: ErrorMsg[];
}
