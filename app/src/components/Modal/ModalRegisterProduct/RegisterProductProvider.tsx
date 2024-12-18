import { useGetAllProduct } from "@/services/api/product/useGetAllProduct";
import { usePostFormRegister } from "@/services/api/product/usePostFormRegister";
import { FormRegister } from "@/types/formRegister.type";
import { ProductType } from "@/types/product.type";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

interface RegisterProductContextProps {
  currentStep: number;
  nextStep: () => void;
  preStep: () => void;
  setStep: (step: number) => void;
  setSearchTerm: any;
  searchTerm: string;
  products: ProductType[];
  chooseListProduct: ProductType[];
  handleChooseProduct: (product: ProductType) => void;
  onSetFormData: (key: keyof FormRegister, value: string) => void;
  formData: FormRegister;
  onRegister: () => void;
}

const RegisterProductContext = createContext<
  RegisterProductContextProps | undefined
>(undefined);

const RegisterProductProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  //** State */
  const [step, setStep] = useState<number>(1);
  const [products, setProducts] = useState<ProductType[]>([]);
  const [chooseListProduct, setChooseListProduct] = useState<ProductType[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);

  const [formData, setFormData] = useState<any>();
  const _postForm = usePostFormRegister();

  const onSetFormData = (key: keyof FormRegister, value: string) => {
    setFormData({ ...formData, [key]: value });
  };

  // Hàm debounce thay đổi searchTerm
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm); // Cập nhật giá trị sau khi debounce
    }, 300); // Thời gian debounce (300ms ở đây)

    // Cleanup hàm debounce khi unmount hoặc searchTerm thay đổi
    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  const _getProduct = useGetAllProduct();

  const handleGetData = async () => {
    const body = {
      page: 1,
      limit: 100,
      name: debouncedSearchTerm,
      cat: "",
      commission: 1,
      BU: "",
      brand: "",
      filterType: 1,
    };

    const res = await _getProduct.mutateAsync(body);
    if (res) {
      const _products = res.data;

      // Lấy các sản phẩm đã chọn và đưa lên đầu danh sách
      const chosenProducts = chooseListProduct;

      // Lọc ra những sản phẩm chưa được chọn
      const remainingProducts = _products.filter(
        (product: ProductType) =>
          !chooseListProduct.some((chosen) => chosen.sku === product.sku),
      );

      // Kết hợp sản phẩm đã chọn (ở đầu) và sản phẩm mới
      const sortedProducts = [...chosenProducts, ...remainingProducts];
      setProducts(sortedProducts);
    }
  };

  useEffect(() => {
    handleGetData();
  }, []);

  const nextStep = () => {
    if (step < 4) setStep(step + 1);
  };

  const preStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const gotoStep = (_step: number) => {
    setStep(_step);
  };

  const handleChooseProduct = (product: ProductType) => {
    setChooseListProduct((prev) => {
      const index = prev.findIndex((i) => i.sku === product.sku);
      if (index > -1) {
        return prev.filter((_, idx) => idx !== index); // Xóa sản phẩm
      } else {
        return [...prev, product]; // Thêm sản phẩm
      }
    });
  };

  const onRegister = () => {
    try {
      let body = formData;

      const productSKUs = chooseListProduct.map((_, i) => _.sku);
      body["productSKUs"] = productSKUs;

      const res = _postForm.mutateAsync(body);
      toast.success("Đăng ký thành công.");
    } catch (error) {
      toast.error("Đăng ký không thành công.");
    }
  };

  useEffect(() => {
    handleGetData();
  }, [debouncedSearchTerm]);

  const value = {
    currentStep: step,
    nextStep,
    preStep,
    setStep: gotoStep,
    setSearchTerm,
    searchTerm,
    products,
    handleChooseProduct,
    chooseListProduct,
    onSetFormData,
    formData,
    onRegister,
  };

  return (
    <RegisterProductContext.Provider value={value}>
      {children}
    </RegisterProductContext.Provider>
  );
};

export default RegisterProductProvider;

export const useRegisterProductContext = () => {
  const context = useContext(RegisterProductContext);
  if (context === undefined) {
    throw new Error(
      "useRegisterProductContext must be used within a RegisterProductProvider",
    );
  }
  return context;
};
