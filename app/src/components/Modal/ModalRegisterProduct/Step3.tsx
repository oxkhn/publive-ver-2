import RegisterProductCard from "@/components/RegisterProductCard";
import Input from "@/packages/@ui-kit/Input";
import { useRegisterProductContext } from "./RegisterProductProvider";
import DropdownV2 from "@/packages/@ui-kit/Dropdown2";
import { useProductsContext } from "@/app/(home)/ProductProvider";
import DropdownItem from "@/packages/@ui-kit/Dropdown2/DropdownItem";
import { BsSearch } from "react-icons/bs";

const Step3 = () => {
  const { chooseListProduct, handleChooseProduct } =
    useRegisterProductContext();

  const {
    products,
    categorys,
    brands,
    filterBu,
    setFilterBu,
    filterBrand,
    setFilterBrand,
    setFilterName,
    filterName,
  } = useProductsContext();

  return (
    <div>
      <div className="sticky top-0 z-50 flex w-full items-center gap-4 bg-background pb-2">
        <p className="whitespace-nowrap text-xs">Ngành hàng</p>
        <DropdownV2
          value={filterBu}
          onSelected={(index) => {
            setFilterBu(categorys[index]);
          }}
          classContainer="max-sm:flex-1 max-sm:justify-center max-sm:items-center text-primary"
          className="max-sm:w-full"
        >
          {categorys.map((_, i) => (
            <DropdownItem key={i} title={_} />
          ))}
        </DropdownV2>

        <p className="whitespace-nowrap text-xs">Thương hiệu</p>

        <DropdownV2
          value={filterBrand}
          onSelected={(index) => {
            setFilterBrand(brands[index]);
          }}
          classContainer="max-sm:flex-1 w-fit max-sm:justify-center max-sm:items-center text-primary"
        >
          {brands.map((_, i) => (
            <DropdownItem key={i} title={_} />
          ))}
        </DropdownV2>

        <Input
          className="!h-8"
          classContainer="ml-auto "
          placeholder="Tên sản phẩm"
          icon={<BsSearch className="text-grays/50" />}
          value={filterName}
          onChange={(e: any) => setFilterName(e.target.value)}
        />
      </div>

      <div className="grid h-full grid-cols-4 gap-4 overflow-scroll">
        {products.map((_, i) => {
          const isActived = chooseListProduct.some((p) => p.sku === _.sku);

          return (
            <RegisterProductCard
              product={_}
              key={i}
              isActived={isActived}
              onClick={() => {
                handleChooseProduct(_);
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Step3;
