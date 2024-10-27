import Button from "@/packages/@ui-kit/Button";
import Input from "@/packages/@ui-kit/Input";
import { useToast } from "@/packages/@ui-kit/Toast/ToastProvider";
import { useAuth } from "@/services/provider/AuthProvider";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { GoArrowLeft } from "react-icons/go";

const RegisterForm = () => {
  const router = useRouter();
  const { showToast } = useToast();
  const { onRegister } = useAuth();

  const navigateHomePage = () => {
    router.back();
  };

  const initialValues = {
    name: "",
    phoneNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const [formData, setFormData] = useState(initialValues);
  const [formError, setFormError] = useState<string[]>([]);
  const onSetFormData = (key: string, value: string) => {
    setFormError([]);
    setFormData({ ...formData, [key]: value });
  };

  const onSubmit = async () => {
    const error = [];
    if (!formData.name) {
      error.push("Vui lòng nhập tên của bạn");
    }
    if (!formData.phoneNumber) {
      error.push("Vui lòng nhập số điện thoại của bạn");
    }
    if (!formData.email) {
      error.push("Vui lòng nhập email của bạn");
    }
    if (!formData.password) {
      error.push("Vui lòng nhập mật khẩu của bạn");
    }
    if (!formData.confirmPassword) {
      error.push("Vui lòng xác nhận mật khẩu của bạn");
    }
    if (formData.password !== formData.confirmPassword) {
      error.push("Mật khẩu không khớp");
    }

    if (error.length > 0) {
      setFormError(error);
      return;
    }

    setFormError([]);

    const result = await onRegister(formData);
    if (result) {
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
        <p className="text-sm">Quay lại</p>
      </div>

      <p className="mt-10 text-2xl font-semibold">Đăng ký</p>
      <p className="mt-2 text-xs">
        Bạn đã có tài khoản?{" "}
        <span
          className="cursor-pointer text-primary"
          onClick={() => {
            router.push("/login");
          }}
        >
          Đăng nhập ngay
        </span>
      </p>

      <div className="mt-10 flex flex-col gap-6">
        <Input
          title="Họ và tên"
          placeholder="Nhập tên của bạn"
          value={formData.name}
          onChange={(e: any) => onSetFormData("name", e.target.value)}
        />
        <Input
          title="Số điện thoại"
          placeholder="Nhập SĐT của bạn"
          value={formData.phoneNumber}
          onChange={(e: any) => onSetFormData("phoneNumber", e.target.value)}
        />
        <Input
          title="Email"
          placeholder="Nhập Email đăng ký"
          value={formData.email}
          onChange={(e: any) => onSetFormData("email", e.target.value)}
        />
        <Input
          title="Mật khẩu"
          placeholder="Mật khẩu tối thiểu 8 ký tự"
          type="password"
          value={formData.password}
          onChange={(e: any) => onSetFormData("password", e.target.value)}
        />
        <Input
          title="Nhập lại mật khẩu"
          placeholder="Xác nhận mật khẩu"
          type="password"
          value={formData.confirmPassword}
          onChange={(e: any) =>
            onSetFormData("confirmPassword", e.target.value)
          }
        />
        <p className="text-xs">
          Bằng việc đăng ký, bạn xác nhận đồng ý với tất cả{" "}
          <span className="text-blue-500">Điều khoản & Chính sách</span>
        </p>

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
          title="Đăng ký"
          className="mt-2 h-12 w-full"
          onClick={onSubmit}
        />
      </div>
    </div>
  );
};

export default RegisterForm;
