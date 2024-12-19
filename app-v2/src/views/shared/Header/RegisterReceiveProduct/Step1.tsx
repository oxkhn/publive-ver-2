import ProductCardPreview from "@/components/ProductCardPreview";
import DropdownV2 from "@/packages/@ui-kit/Dropdown2";
import { useRegisterProductContext } from "@/services/RegisterProductProvider";
import DropdownItem from "@/packages/@ui-kit/Dropdown/DropdownItem";
import Input from "@/components/@core/Input";
import { IoSearchOutline } from "react-icons/io5";
import DropdownHor from "@/packages/@ui-kit/Dropdown3";
import { ProductType } from "@/types/product.type";
import { useProductContext } from "@/services/ProductProvider";

const Step1 = () => {
  const { products } = useProductContext();

  return (
    <div className="grid grid-cols-2 gap-6 overflow-auto py-5 max-sm:gap-y-14 lg:xl:grid-cols-3 xl:grid-cols-4">
      {products.map((_, index) => {
        return <ProductCardPreview product={_} key={index} />;
      })}
    </div>
  );
};

export default Step1;
