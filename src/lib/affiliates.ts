import { affiliates, getAffiliateUrl } from "../../affiliates.config";

export { affiliates, getAffiliateUrl };

export function getAllAffiliateSlugs(): string[] {
  return affiliates.map((a) => a.slug);
}
