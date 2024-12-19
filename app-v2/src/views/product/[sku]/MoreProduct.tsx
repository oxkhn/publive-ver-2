import ProductCard from "@/components/ProductCard";

const MoreProduct = () => {
  return (
    <div>
      <p className="text-2xl font-bold">Sản phẩm tương tự</p>

      <div className="mt-8 flex gap-4 overflow-auto pb-8 pt-4">
        {/* {[...Array(10)].map((_, index) => {
          return <ProductCard key={index} />;
        })} */}
      </div>
    </div>
  );
};

export default MoreProduct;
