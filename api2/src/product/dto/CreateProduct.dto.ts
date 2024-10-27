export class CreateProductDto {
  bu: string;
  cat: string;
  brand: string;
  shopSku: string;
  sku: string;
  name: string;
  productLink: string;
  commission: number;
  gift: string;
  price: number;
  discountPrice: number;
  inStock: boolean;
  tags: string[];
  description: string;
  affiliateLink: string;
}
