export class GetAffiliateDto {
  page: number;
  limit: number;
  shopee?: boolean;
  fb?: boolean;
  tiktok?: boolean;
  youtube?: boolean;
}
