"use client";
import ProductCard from "@/components/ProductCard";
import { useProductContext } from "@/services/ProductProvider";

const ProductList = () => {
  const { products } = useProductContext();

  return (
    <div className="max-w-app flex-1 overflow-auto py-12">
      <div className="grid grid-cols-[repeat(auto-fill,_minmax(158px,_1fr))] justify-between gap-x-8 gap-y-12 max-sm:gap-x-4">
        {products.map((_, index) => {
          return <ProductCard product={_} key={index} />;
        })}
      </div>
    </div>
  );
};

export default ProductList;
