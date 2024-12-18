import useGetAllProduct from "@/api/product/useGetAllProduct";
import { createContext, useContext, useState } from "react";

type ProductContextProps = {};

type GetAllProductDto = {
  limit: number;
  page: number;
  bu: string;
  brand: string;
  sku: string;
  name: string;
  publisher: "lazada" | "shopee";
};

const ProductContext = createContext<ProductContextProps | undefined>(
  undefined,
);

type Props = {
  children: React.ReactNode;
};

const ProductProvider = (props: Props) => {

  const [filterGetAllProduct, setFilterGetAllProduct] = useState()

  const _getAllProduct = useGetAllProduct();
  const getAllProduct = (getData: GetAllProductDto) => {};

  const value = {};

  return (
    <ProductContext.Provider value={value}>
      {props.children}
    </ProductContext.Provider>
  );
};

export const useProductContext = () => {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error("useProductContext must be used within a ProductContext");
  }
  return context;
};
