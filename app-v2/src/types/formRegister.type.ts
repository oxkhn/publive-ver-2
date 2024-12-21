import { ProductType } from "./product.type";

export type FormRegister = {
  name: string;
  shopeeAffiliateAccount: string;
  phone: string;
  email: string;
  facebookLink: string;
  instargramLink: string;
  threadsLink: string;
  tiktokLink: string;
  youtubeLink: string;
  websiteLink: string;
  shopeeLiveLink: string;
  shopeeVideoLink: string;

  address: string;
  receivePhoneNumber: string;
  receiveName: string;
};

export type RegisterOrder = {
  _id: string,
  name: string,
  phoneNumber: string,
  address: string,
  productSKUs: string[],
  isSign: boolean,
  status: number,
  trackingNumber: string,
  userId: string,
  createdAt: string,
  updatedAt: string,
  products: ProductType[]
}
