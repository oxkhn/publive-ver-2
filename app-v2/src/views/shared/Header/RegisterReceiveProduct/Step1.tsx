import ProductCard from "@/components/ProductCard";

const Step1 = () => {
  return (
    <div className="grid grid-cols-2 gap-6 overflow-auto py-5 max-sm:gap-y-14 lg:xl:grid-cols-3 xl:grid-cols-4">
      {[...Array(100)].map((_, index) => {
        return <ProductCard key={index}></ProductCard>;
      })}
    </div>
  );
};

export default Step1;
