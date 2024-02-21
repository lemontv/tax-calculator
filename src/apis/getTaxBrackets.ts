import { ApiService, getApiUrl } from "@/helpers/ApiService";
import { TaxBracketsResponse } from "@/types";

export const getTaxBracketsApi = (taxYear: string) => {
  const apiUrl = getApiUrl(`/tax-calculator/tax-year/${taxYear}`);

  return ApiService.get<TaxBracketsResponse>(apiUrl);
};
