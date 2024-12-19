"use client";

import { IProfileInfo } from "@/types/user.type";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { useAuthContext } from "./AuthProvider";
import { ProductType } from "@/types/product.type";
import usePostRegisterProduct from "@/api/registerProduct/registerProduct";
import { toast } from "react-toastify";

type RegisterContextProps = {
  productSelected: ProductType[];
  setProductSelected: Dispatch<SetStateAction<ProductType[]>>;

  registerInfo: IProfileInfo;
  setRegisterInfo: Dispatch<SetStateAction<IProfileInfo>>;

  signMessage: boolean;
  setSignMessage: Dispatch<SetStateAction<boolean>>;

  postProductRegister: (body: registerProductDTO) => void;
};

type Props = {
  children: React.ReactNode;
};

const RegisterProductContext = createContext<RegisterContextProps | undefined>(
  undefined,
);

export type registerProductDTO = {
  name: string;
  phoneNumber: string;
  email: string;
  address: string;
  productSKUs: string[];
  isSign: boolean;
};

export const RegisterProductProvider = (props: Props) => {
  const { user } = useAuthContext();
  const [productSelected, setProductSelected] = useState<ProductType[]>([]);
  const [signMessage, setSignMessage] = useState(false);
  const [registerInfo, setRegisterInfo] = useState<IProfileInfo>({
    shoppeUserName: "",
    name: "",
    phone: "",
    email: "",
    address: "",
    facebookLink: "",
    instagramLink: "",
    threadsLink: "",
    tiktokLink: "",
    youtubeLink: "",
  });
  const _postProductRegister = usePostRegisterProduct();

  const postProductRegister = async (body: registerProductDTO) => {
    const res = await _postProductRegister.mutateAsync(body);
    if (res.message == "Success") toast.success("Đăng ký thành công.");
    else toast.error("Có lỗi trong quá trình đăng ký.");
  };

  const value = {
    productSelected,
    setProductSelected,

    registerInfo,
    setRegisterInfo,

    signMessage,
    setSignMessage,

    postProductRegister,
  };

  useEffect(() => {
    if (user) {
      setRegisterInfo((prev) => ({
        ...prev,
        name: user.name,
        email: user.email,
        phone: user?.phoneNumber || "",
        address: user?.address || "",
      }));
    }
  }, [user]);

  return (
    <RegisterProductContext.Provider value={value}>
      {props.children}
    </RegisterProductContext.Provider>
  );
};

export const useRegisterProductContext = () => {
  const context = useContext(RegisterProductContext);
  if (context === undefined) {
    throw new Error(
      "useRegisterProductContext must be used within a RegisterProductProvider",
    );
  }
  return context;
};
