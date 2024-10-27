import { useGetAllProduct } from "@/services/api/product/useGetAllProduct";
import { ProductType } from "@/types/product.type";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from "react";
import { format, addDays } from "date-fns";
import { useGetProductBrand } from "@/services/api/product/useGetProductBrand";
import { toast } from "react-toastify";
import { useParams } from "next/navigation";

interface ProductsContextProps {
  products: ProductType[];
  filterBrand: string;
  setFilterBrand: (brand: string) => void;
  filterBu: string;
  setFilterBu: (bu: string) => void;
  filterCommission: number;
  setFilterCommission: (commission: number) => void;
  filterName: string;
  setFilterName: (name: string) => void;
  startDate: Date | any;
  setStartDate: (date: Date | null) => void;
  endDate: Date | any;
  setEndDate: (date: Date | null) => void;
  brands: string[];
  setBrands: (brands: string[]) => void;
  categorys: string[];
  setCategorys: (categorys: string[]) => void;
  reloadAll: () => void;
  publisher: string;
  setPublisher: (publisher: string) => void;
  sku: string;
  setSku: (sku: string) => void;
  resetFilters: () => void;

  type: number;
  setType: (type: number) => void;
}

const ProductsContext = createContext<ProductsContextProps | undefined>(
  undefined,
);

export const ProductsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const getDateBeforeDays = (days: number): Date => {
    const date = new Date();
    date.setDate(date.getDate() - days);
    return date;
  };

  // State
  const [products, setProducts] = useState<ProductType[]>([]);
  const [allBrands, setAllBrands] = useState([]);
  const [brands, setBrands] = useState<string[]>([]);
  const [filterBrand, setFilterBrand] = useState("");
  const [categorys, setCategorys] = useState<string[]>([]);
  const [filterBu, setFilterBu] = useState("");
  const [filterCommission, setFilterCommission] = useState(30);
  const [filterName, setFilterName] = useState("");
  const [publisher, setPublisher] = useState("");
  const [sku, setSku] = useState("");
  const [type, setType] = useState(1);

  const [startDate, setStartDate] = useState<Date | any>(getDateBeforeDays(10));
  const [endDate, setEndDate] = useState<Date | any>(addDays(new Date(), 20));

  // Api
  const _getProducts = useGetAllProduct();

  const handleGetData = async () => {
    const body = {
      limit: 1000,
      page: 1,
      commission: filterCommission / 100,
      name: filterName,
      bu: filterBu,
      brand: filterBrand,

      publisher: publisher,
      sku: sku,
      filterType: Number(type),
    };

    const res = await _getProducts.mutateAsync(body);
    const sortedProducts = sortProductsByPublisher(res.data);
    setProducts(sortedProducts);
  };

  // Hàm sắp xếp sản phẩm theo publisher
  const sortProductsByPublisher = (products) => {
    // Lọc 12 sản phẩm có publisher là 'sp'
    const spProducts = products
      .filter((product) => product.publisher === "shopee")
      .slice(0, 12);

    // Lọc 6 sản phẩm có publisher là 'LZ'
    const lzProducts = products
      .filter((product) => product.publisher === "lazada")
      .slice(0, 6);

    // Các sản phẩm còn lại, bao gồm cả SP và LZ, không phân biệt
    const remainingProducts = products.filter(
      (product) =>
        !spProducts.includes(product) && !lzProducts.includes(product),
    );

    // Ghép lại thành một mảng sắp xếp hoàn chỉnh
    return [...spProducts, ...lzProducts, ...remainingProducts];
  };

  const _getCategory = useGetProductBrand();

  const handleGetCategory = async () => {
    try {
      const res = await _getCategory.mutateAsync();
      setAllBrands(res.data);
      setCategorys(res.data.map((item: any) => item.bu));
    } catch (error) {}
  };

  useEffect(() => {
    if (filterBu != "") {
      const arr: any = allBrands.filter((_: any) => _.bu == filterBu);

      if (arr.length > 0) setBrands(arr[0].brand);
    }

    setFilterBrand("");
  }, [filterBu]);

  useEffect(() => {
    handleGetData();
  }, [filterBrand, filterBu, type, startDate, endDate, publisher]);

  useLayoutEffect(() => {
    // Sử dụng debounce: chỉ thực hiện call API sau 500ms từ lần nhập cuối
    const delayDebounceFn = setTimeout(() => {
      handleGetData();
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [filterName, filterCommission, sku]);

  useEffect(() => {
    handleGetCategory();
  }, []);

  const reloadAll = () => {
    handleGetData();
    handleGetCategory();
  };

  // Hàm reset tất cả bộ lọc
  const resetFilters = useCallback(() => {
    setFilterCommission(100);
    setFilterName("");
    setFilterBu("");
    setFilterBrand("");
    setStartDate(getDateBeforeDays(10));
    setEndDate(addDays(new Date(), 20));
    // Có thể thêm các bộ lọc khác nếu có
  }, []);

  const value = useMemo(
    (): ProductsContextProps => ({
      products,
      filterBrand,
      setFilterBrand,
      filterBu,
      setFilterBu,
      filterCommission,
      setFilterCommission,
      filterName,
      setFilterName,
      startDate,
      setStartDate,
      endDate,
      setEndDate,
      reloadAll,
      brands,
      setBrands,
      categorys,
      setCategorys,
      publisher,
      setPublisher,
      sku,
      setSku,
      resetFilters,
      type,
      setType,
    }),
    [
      products,
      filterBrand,
      filterBu,
      filterCommission,
      filterName,
      startDate,
      endDate,
      reloadAll,
      brands,
      categorys,
      publisher,
      sku,
      setSku,
      resetFilters,
      type,
    ],
  );

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};

export const useProductsContext = () => {
  const context = useContext(ProductsContext);

  if (context === undefined) {
    throw new Error(
      "useProductsContext must be used within a ProductsProvider",
    );
  }

  return context;
};
