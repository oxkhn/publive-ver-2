"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { usePostRegister } from "../api/auth/usePostRegister";
import {
  MessageTypeEnum,
  useToast,
} from "@/packages/@ui-kit/Toast/ToastProvider";
import { usePostLogin } from "../api/auth/usePostLogin";
import Cookies from "js-cookie";
import { useGetProfile } from "../api/auth/useGetProfile";
import { toast } from "react-toastify";
import { usePutProfile } from "../api/auth/usePutProfile";
import { UserType } from "@/types/user.type";

type AuthContextProps = {
  onRegister: (registerDTO: RegisterDTO) => Promise<boolean>;
  onLogin: (email: string, password: string) => Promise<boolean>;
  onLogout: () => void;
  user: any;
  token: string | null;
  updateProfile: (data: any) => void;
};

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export type RegisterDTO = {
  email: string;
  password: string;
  name: string;
  phoneNumber: string;
};

export const AuthProvider = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  const { showToast } = useToast();
  const [token, setToken] = useState<string | any>(null);
  const [user, setUser] = useState<UserType | any>(null);

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
      const resData = await _getProfile.mutateAsync(_token);

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
    const storedToken = Cookies.get("tokenAccess");

    if (storedToken) {
      getProfile(storedToken);
      setToken(storedToken);
    }
  }, []);

  const value = { onRegister, onLogin, onLogout, user, token, updateProfile };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
};
