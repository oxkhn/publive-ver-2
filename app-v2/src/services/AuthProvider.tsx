"use client";
import { useGetProfile } from "@/api/auth/useGetProfile";
import { usePostRegister } from "@/api/auth/usePostRegister";
import { usePutProfile } from "@/api/auth/usePutProfile";
import { UserType } from "@/types/user.type";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { usePostLogin } from "@/api/auth/usePostLogin";
import { useRouter } from "next/navigation";
import useGetAllRegisterProduct from "@/api/auth/useGetAllRegisterProduct";
import { ProductType } from "@/types/product.type";

type AuthContextProps = {
  user: UserType;
  onLogin: (email: string, password: string) => Promise<boolean>;
  onLogout: () => void;
  onRegister: (registerDTO: RegisterDTO) => Promise<boolean>;
  updateProfile: (data: any) => void;
};

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export type RegisterDTO = {
  email: string;
  password: string;
  name: string;
  phoneNumber: string;
};

type Props = {
  children: React.ReactNode;
};

export const AuthProvider = (props: Props) => {
  const { children } = props;
  const router = useRouter();
  const [token, setToken] = useState<string | any>(null);
  const [user, setUser] = useState<UserType | any>(null);
  const [registerProducts, setRegisterProducts] = useState([]);

  const _getAllRegisterProduct = useGetAllRegisterProduct();

  const getAllRegisterProduct = async () => {
    const res = await _getAllRegisterProduct.mutateAsync();
    console.log(res.data);
    setRegisterProducts(res.data);
  };

  const saveToken = (token: string) => {
    setToken(token);

    Cookies.set("accessToken", token, {
      expires: 100,
      path: "/", // Set to root path
    });
  };

  const removeToken = () => {
    setToken(null);
    setUser(null);
    Cookies.remove("accessToken");
  };

  const _postLogin = usePostLogin();
  const onLogin = async (email: string, password: string): Promise<boolean> => {
    try {
      const resData = await _postLogin.mutateAsync({ email, password });
      const { accessToken, user } = resData.data;
      setUser(user);
      saveToken(accessToken);

      toast.success("Đăng nhập thành công", { autoClose: 1000 });

      return true;
    } catch (error) {
      toast.error("Đăng nhập thất bại", { autoClose: 1000 });
    }
    return false;
  };

  const onLogout = () => {
    removeToken();
    router.push("/");
  };

  const _postRegister = usePostRegister();
  const onRegister = async (registerDTO: RegisterDTO): Promise<boolean> => {
    try {
      const resData = await _postRegister.mutateAsync(registerDTO);
      const { access_token, user } = resData.data;

      setUser(user);
      saveToken(access_token);

      toast.success("Đăng ký thành công", { autoClose: 1000 });
      return true;
    } catch (error) {
      toast.error("Đăng ký thất bại", { autoClose: 1000 });
    }

    return false;
  };

  const _getProfile = useGetProfile();
  const getProfile = async (_token: string) => {
    try {
      const resData = await _getProfile.mutateAsync();

      const user = resData.data;

      setUser(user);
    } catch (error) {}
  };

  const _putProfile = usePutProfile();
  const updateProfile = async (data: any) => {
    try {
      const body = {
        token: token,
        data: data,
      };
      await _putProfile.mutateAsync(body);

      toast("Update profile success", { autoClose: 1000 });
    } catch (error) {
      toast.error("Update profile error", { autoClose: 1000 });
    }
  };

  useEffect(() => {
    const storedToken = Cookies.get("accessToken");
    if (storedToken) {
      getProfile(storedToken);
      setToken(storedToken);
    }
  }, []);

  useEffect(() => {
    if (user) {
      console.log(user);

      getAllRegisterProduct();
    }
  }, [user]);

  const value = { onLogin, onLogout, onRegister, user, updateProfile };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuthContext must be used within a AuthProvider");
  }
  return context;
};
