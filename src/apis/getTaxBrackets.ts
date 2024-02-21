import { ApiService, getApiUrl } from "@/helpers/ApiService";
import { TaxBrackets } from "@/types";

export const getTaxBrackets = (taxYear: string) => {
  const apiUrl = getApiUrl(`/tax-calculator/tax-year/${taxYear}`);

  return ApiService.get<TaxBrackets>(apiUrl);
};
