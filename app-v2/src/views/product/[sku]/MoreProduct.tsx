"use client";
import ProductCard from "@/components/ProductCard";
import { useProductContext } from "@/services/ProductProvider";

const MoreProduct = () => {
  const { relatedProduct } = useProductContext();
  return (
    <div>
      <p className="text-2xl font-bold">Sản phẩm tương tự</p>

      <div className="mt-8 flex gap-4 overflow-auto pb-8 pt-4">
        {relatedProduct.map((_, index) => {
          return <ProductCard product={_} key={index} />;
        })}
      </div>
    </div>
  );
};

export default MoreProduct;
