export type ProductType = {
  _id: string;
  bu: string;
  cat: string;
  brand: string;
  shopSku: string;
  sku: string;
  productName: string;
  productLink: string;
  commission: number;
  productGift: string;
  productGiftLink: string;
  price: number;
  discountPrice: number;
  image: string;
  imageList: string[];
  availableStock: number;
  tags: string[];
  description: string;
  affiliateLink: string;
  publisher: string;
  startDate: Date;
  endDate: Date;
  isActive: boolean;
  typeShort: string;
  isNew: boolean;
  registeredCount: number;
  unitsSold: number;
  isAuthentic: boolean;
};