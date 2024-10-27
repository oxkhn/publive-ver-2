import Button from "@/packages/@ui-kit/Button";
import Input from "@/packages/@ui-kit/Input";
import { useAuth } from "@/services/provider/AuthProvider";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { GoArrowLeft } from "react-icons/go";

const LoginForm = () => {
  const router = useRouter();
  const { onLogin } = useAuth();
  const navigateHomePage = () => {
    router.push("/");
  };

  const navigateRegisterPage = () => {
    router.push("/register");
  };

  const initialValues = {
    email: "",
    password: "",
  };

  const [formData, setFormData] = useState(initialValues);
  const [formError, setFormError] = useState<string[]>([]);
  const onSetFormData = (key: string, value: string) => {
    setFormError([]);
    setFormData({ ...formData, [key]: value });
  };

  const onSubmit = async () => {
    const error = [];
    if (!formData.email) {
      error.push("Vui lòng nhập email của bạn");
    }
    if (!formData.password) {
      error.push("Vui lòng nhập mật khẩu của bạn");
    }

    if (error.length > 0) {
      setFormError(error);
      return;
    }

    setFormError([]);
    const resutl = await onLogin(formData.email, formData.password);
    if (resutl) {
      router.push("/");
    }
  };

  return (
    <div>
      <div
        className="flex cursor-pointer items-center justify-start gap-2"
        onClick={navigateHomePage}
      >
        <GoArrowLeft />
        <p className="text-sm">Quay lại trang chủ</p>
      </div>

      <p className="mt-10 text-2xl font-semibold">Đăng Nhập</p>
      <p className="mt-2 text-xs">
        Bạn chưa có tài khoản?{" "}
        <span
          className="cursor-pointer text-primary"
          onClick={navigateRegisterPage}
        >
          Đăng ký tài khoản
        </span>
      </p>

      <div className="mt-10 flex flex-col gap-6">
        <Input
          title="Email"
          placeholder="Nhập Email đăng ký"
          value={formData.email}
          onChange={(e: any) => onSetFormData("email", e.target.value)}
        />
        <Input
          title="Mật khẩu"
          placeholder="Nhập mật khẩu"
          type="password"
          value={formData.password}
          onChange={(e: any) => onSetFormData("password", e.target.value)}
        />
        <div className="flex cursor-pointer justify-end hover:text-primary">
          <p className="-mt-2 text-sm">Quên mật khẩu?</p>
        </div>

        {formError.length > 0 && (
          <div className="flex flex-col gap-1">
            {formError.map((error, index) => (
              <p key={index} className="text-xs text-red-500">
                *{error}
              </p>
            ))}
          </div>
        )}

        <Button
          title="Đăng nhập"
          className="mt-2 h-12 w-full"
          onClick={onSubmit}
        />
      </div>
    </div>
  );
};

export default LoginForm;
