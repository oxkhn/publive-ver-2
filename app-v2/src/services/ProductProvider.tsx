"use client";
import useGetAllProduct from "@/api/product/useGetAllProduct";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { BrandState } from "./ContentProvider";
import useGetProductBrand from "@/api/product/useGetProductBrand";
import { ProductType } from "@/types/product.type";
import { useDebounce } from "use-debounce";
import { registerProductDTO } from "./RegisterProductProvider";
import usePostRegisterProduct from "@/api/registerProduct/registerProduct";
import { toast } from "react-toastify";
import { useGetProductDetail } from "@/api/product/useGetProductDetail";

type ProductContextProps = {
  brands: BrandState[];
  products: ProductType[];

  marketplaceChecked: string[];
  setMarketplaceChecked: Dispatch<SetStateAction<string[]>>;

  brandList: string[];
  setBrandList: Dispatch<SetStateAction<string[]>>;

  filterType: number;
  setFilterType: Dispatch<SetStateAction<number>>;

  search: string;
  setSearch: Dispatch<SetStateAction<string>>;

  commissionValue: number;
  setCommissionValue: Dispatch<SetStateAction<number>>;

  buSelected: string;
  setBuSelected: Dispatch<SetStateAction<string>>;

  brandSelected: string;
  setBrandSelected: Dispatch<SetStateAction<string>>;

  toggleMarketplace: (marketplaceFilter: string) => void;
  clearData: () => void;
  getProductDetail: (sku: string) => void;
  productDetail: ProductType;
};

export const FilterTypeEnum = {
  HOA_HONG_CAO_NHAT: 1,
  HOT_DEAL_LIVESTREAM: 2,
  TOP_BAN_CHAY: 3,
};

export const MarketplaceEnum = {
  SHOPEE: "shopee",
  LAZADA: "lazada",
  UNILEVER: "unilever",
};

type GetAllProductDto = {
  limit: number;
  page: number;
  bu?: string;
  brand?: string;
  sku?: string;
  name?: string;
  publisher?: string[];
  filterType?: number;
  commission?: number;
};

const ProductContext = createContext<ProductContextProps | undefined>(
  undefined,
);

type Props = {
  children: React.ReactNode;
};

export const defaultProduct: ProductType = {
  _id: "",
  bu: "",
  cat: "",
  brand: "",
  shopSku: "",
  sku: "",
  productName: "",
  productLink: "",
  commission: 0,
  productGift: "",
  productGiftLink: "",
  price: 0,
  discountPrice: 0,
  image: "",
  imageList: [],
  availableStock: 0,
  tags: [],
  description: "",
  affiliateLink: "",
  publisher: "",
  startDate: new Date(),
  endDate: new Date(),
  isActive: false,
  typeShort: "",
  isNew: false,
  registeredCount: 0,
  unitsSold: 0,
  isAuthentic: false,
};

export const ProductProvider = (props: Props) => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [brands, setBrands] = useState<BrandState[]>([]);
  const [brandList, setBrandList] = useState<string[]>([]);
  const [filterType, setFilterType] = useState<number>(0);
  const [marketplaceChecked, setMarketplaceChecked] = useState<string[]>([
    MarketplaceEnum.SHOPEE,
    MarketplaceEnum.LAZADA,
    MarketplaceEnum.UNILEVER,
  ]);
  const [search, setSearch] = useState<string>("");
  const [commissionValue, setCommissionValue] = useState(10);
  const [buSelected, setBuSelected] = useState<string>("");
  const [brandSelected, setBrandSelected] = useState<string>("");

  const [commissionValueDebounce] = useDebounce(commissionValue, 1000);

  const [productDetail, setProductDetail] =
    useState<ProductType>(defaultProduct);

  const _getProductDetail = useGetProductDetail();
  const getProductDetail = async (sku: string) => {
    try {
      const res = await _getProductDetail.mutateAsync(sku);
      setProductDetail(res);
    } catch (error) {}
  };

  const clearData = () => {
    setBrandList([]);
    setFilterType(0);
    setMarketplaceChecked([
      MarketplaceEnum.SHOPEE,
      MarketplaceEnum.LAZADA,
      MarketplaceEnum.UNILEVER,
    ]);
    setSearch(""), setCommissionValue(10);
    setBuSelected(""), setBrandSelected("");
  };

  const _getAllProduct = useGetAllProduct();
  const getAllProduct = async (getData: GetAllProductDto) => {
    const res = await _getAllProduct.mutateAsync(getData);
    console.log(res.data);

    setProducts(res.data);
  };

  const _getBrands = useGetProductBrand();

  const getBrands = async () => {
    try {
      const res = await _getBrands.mutateAsync();
      setBrands(res);
    } catch (error) {
      console.log(error);
    }
  };

  const toggleMarketplace = (marketplaceFilter: string) => {
    const index = marketplaceChecked.findIndex(
      (marketplace) => marketplace == marketplaceFilter,
    );
    if (index >= 0) {
      const marketplaceUpdated = marketplaceChecked.filter(
        (marketplace) => marketplace != marketplaceFilter,
      );
      setMarketplaceChecked(marketplaceUpdated);
    } else {
      setMarketplaceChecked([...marketplaceChecked, marketplaceFilter]);
    }
  };

  useEffect(() => {
    let bodyData: GetAllProductDto = {
      page: 1,
      limit: 50,
      commission: commissionValue,
    };

    if (buSelected) {
      if (buSelected != "Tất cả") {
        bodyData = { ...bodyData, bu: buSelected };
        if (brandSelected) bodyData = { ...bodyData, brand: brandSelected };
      }
    }
    if (marketplaceChecked)
      bodyData = { ...bodyData, publisher: marketplaceChecked };

    if (filterType) bodyData = { ...bodyData, filterType: filterType };

    if (search) bodyData = { ...bodyData, name: search };

    getAllProduct(bodyData);
  }, [
    marketplaceChecked,
    filterType,
    search,
    commissionValueDebounce,
    buSelected,
    brandSelected,
  ]);

  useEffect(() => {
    getBrands();
  }, []);

  const value = {
    brands,
    products,

    brandList,
    setBrandList,

    filterType,
    setFilterType,

    marketplaceChecked,
    setMarketplaceChecked,

    search,
    setSearch,

    commissionValue,
    setCommissionValue,

    buSelected,
    setBuSelected,

    brandSelected,
    setBrandSelected,

    toggleMarketplace,
    clearData,

    getProductDetail,
    productDetail,
  };

  return (
    <ProductContext.Provider value={value}>
      {props.children}
    </ProductContext.Provider>
  );
};

export const useProductContext = () => {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error("useProductContext must be used within a ProductContext");
  }
  return context;
};
