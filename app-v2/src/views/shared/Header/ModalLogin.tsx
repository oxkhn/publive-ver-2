import Input from "@/components/@core/Input";
import Modal from "@/components/@core/Modal";
import ModalRegister from "./ModalRegister";
import { useModal } from "@/components/@core/Modal/useModal";
import Image from "next/image";
import BannerDemo from "@/assets/images/login_banner.jpg";
import { useAuthContext } from "@/services/AuthProvider";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "@tanstack/react-form";
import Button from "@/packages/@ui-kit/Button2";

type Props = {
  isShow: boolean;
  hide: () => void;
  switchToRegister: () => void;
};

const ModalLogin = (props: Props) => {
  const { isShow, hide, switchToRegister } = props;
  const { onLogin, user } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    onSubmit: async ({ value }) => {
      setIsLoading(true);
      try {
        const result = await onLogin(value.email, value.password);
        if (result) {
          setIsLoading(true);
          hide();
        } else {
          setIsLoading(false);
        }
      } catch (error) {
        setIsLoading(false);
      }
    },
  });

  return (
    <>
      <Modal
        isShow={isShow}
        hide={() => {
          hide();
        }}
        className=""
      >
        <div className="flex min-h-[464px]">
          <div className="mr-8 flex-1 max-lg:hidden">
            <Image
              src={BannerDemo}
              alt=""
              className="h-full w-full rounded-lg object-cover"
            />
          </div>
          <form
            className="flex w-[375px] min-w-[300px] flex-1 flex-col gap-10 p-2 max-sm:w-full"
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              form.handleSubmit();
            }}
          >
            <p className="text-center text-2xl font-semibold">Đăng Nhập</p>
            <div className="flex flex-col gap-4">
              <form.Field
                name="email"
                validators={{
                  onChange: ({ value }) => {
                    if (!value) {
                      return "Email là bắt buộc"; // Required email
                    } else if (value.length < 3) {
                      return "Email phải có ít nhất 3 ký tự"; // Minimum length
                    } else if (!/\S+@\S+\.\S+/.test(value)) {
                      return "Định dạng email không hợp lệ"; // Invalid email format
                    }
                    return undefined;
                  },
                  onChangeAsync: async ({ value }) => {
                    await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate async validation
                    if (value.includes("error")) {
                      return 'The word "error" is not allowed in email'; // Async validation error
                    }
                    return undefined;
                  },
                }}
              >
                {(field) => (
                  <div>
                    <Input
                      title="Email"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e:any) => field.handleChange(e.target.value)}
                    />
                    <em role="alert" className="text-xs text-red">
                      {field.state.meta.errors.join(", ")}
                    </em>
                  </div>
                )}
              </form.Field>

              <form.Field
                name="password"
                validators={{
                  onChange: ({ value }) => {
                    if (!value) {
                      return "Mật khẩu là bắt buộc"; // Thêm xác thực cho trường hợp mật khẩu trống
                    } else if (value.length < 6) {
                      return "Mật khẩu phải có ít nhất 6 ký tự"; // Yêu cầu độ dài tối thiểu
                    }
                    return undefined;
                  },
                }}
              >
                {(field) => (
                  <div>
                    <Input
                      title="Mật Khẩu"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e: any) => field.handleChange(e.target.value)}
                      type="password"
                    />
                    {field.state.meta.errors ? (
                      <em role="alert" className="text-xs text-red">
                        {field.state.meta.errors.join(", ")}
                      </em>
                    ) : null}{" "}
                  </div>
                )}
              </form.Field>
              <span className="cursor-pointer text-end text-sm text-primary">
                Quên mật khẩu?
              </span>
            </div>
            <div className="text-center">
              <Button
                title="Đăng nhập"
                className="w-full"
                type="submit"
                onClick={() => {}}
                isLoading={isLoading}
              />
              <p className="mt-2 text-sm">
                Bạn chưa có tài khoản?{" "}
                <span
                  className="cursor-pointer text-primary"
                  onClick={() => {
                    switchToRegister();
                  }}
                >
                  Đăng ký
                </span>
              </p>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default ModalLogin;
