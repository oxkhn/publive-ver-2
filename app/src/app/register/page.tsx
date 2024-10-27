"use client";

import ImageKit from "@/packages/@ui-kit/Image";
import RegisterForm from "./RegisterForm";
import Banner from "@/assets/images/banner_login.jpg";

const RegisterPage = () => {
  return (
    <div className="-mt-[70px] flex min-h-screen">
      <div className="flex w-[600px] flex-col p-[64px]">
        <RegisterForm />
      </div>

      <div className="grid flex-1 place-items-center bg-white">
        <ImageKit src={Banner} className="h-[30vw] w-[30vw]" />
      </div>
    </div>
  );
};

export default RegisterPage;
