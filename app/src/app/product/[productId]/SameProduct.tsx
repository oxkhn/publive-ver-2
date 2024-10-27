import ProductCard from "@/components/ProductCard";
import { useGetAllProduct } from "@/services/api/product/useGetAllProduct";
import { ProductType } from "@/types/product.type";
import { useEffect, useState } from "react";

interface SameProductProps {
  product?: ProductType;
}

const SameProduct: React.FC<SameProductProps> = (props) => {
  const { product } = props;
  const [products, setProducts] = useState<ProductType[]>([]);

  const _getProduct = useGetAllProduct();

  const handleGetData = async () => {
    const body = {
      page: 1,
      limit: 100,
      name: "",
      cat: "",
      commission: 30,
      bu: product?.bu,
      brand: "",
      filterType: 1,
    };

    const res = await _getProduct.mutateAsync(body);
    if (res) {
      const _products = res.data;

      setProducts(_products);
    }
  };
  useEffect(() => {
    handleGetData();
  }, [product]);

  return (
    <div className="mt-12">
      <p className="text-2xl font-bold">Sản phẩm tương tự</p>
      <div className="mt-3 grid grid-flow-col gap-4 overflow-auto pb-10">
        {products?.map((_, i) => <ProductCard key={i} product={_} />)}
      </div>
    </div>
  );
};

export default SameProduct;
