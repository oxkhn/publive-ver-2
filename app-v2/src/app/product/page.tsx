import Filter from "@/views/product/Filter";
import ProductList from "@/views/product/ProductList";

const ProductPage = () => {
  return (
    <div className="flex h-[100vh] flex-col gap-20 pt-12">
      <div className="flex flex-1 overflow-hidden">
        <Filter />
        <ProductList />
      </div>
    </div>
  );
};

export default ProductPage;
