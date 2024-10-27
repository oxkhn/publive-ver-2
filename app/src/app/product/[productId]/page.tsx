"use client";

import TopVideo from "@/app/(home)/TopVideo";
import ProductInfo from "./ProductInfo";
import SameProduct from "./SameProduct";
import Breadcrumb from "@/packages/@ui-kit/Breadcrumb";
import { useGetProductDetail } from "@/services/api/product/useGetProductDetail";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ProductType } from "@/types/product.type";

const ProductDetailPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState<ProductType>();

  const _getProductDetail = useGetProductDetail();

  const handleGetData = async () => {
    try {
      const res = await _getProductDetail.mutateAsync(productId as string);

      setProduct(res.data);
    } catch (error) {}
  };

  useEffect(() => {
    handleGetData();
  }, [productId]);

  return (
    <div className="relative mx-auto flex max-w-[1440px] flex-col overflow-auto px-20 py-8 max-md:px-4">
      <Breadcrumb title={product?.productName} />
      <ProductInfo product={product} />
      <TopVideo />
      <SameProduct product={product} />
    </div>
  );
};

export default ProductDetailPage;
