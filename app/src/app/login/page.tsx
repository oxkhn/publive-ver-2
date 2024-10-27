"use client";

import { useRouter } from "next/navigation";
import RegisterForm from "../register/RegisterForm";
import LoginForm from "./LoginForm";
import ImageKit from "@/packages/@ui-kit/Image";
import Banner from "@/assets/images/banner_login.jpg";

const LoginPage = () => {
  const router = useRouter();

  const navigateHomePage = () => {
    router.push("/");
  };

  return (
    <div className="-mt-[70px] flex min-h-screen">
      <div className="flex w-[600px] flex-col p-[64px]">
        <LoginForm />
      </div>

      <div className="grid flex-1 place-items-center bg-white">
        <ImageKit src={Banner} className="h-[30vw] w-[30vw]" />
      </div>
    </div>
  );
};

export default LoginPage;
