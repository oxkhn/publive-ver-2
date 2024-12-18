import Input from "@/components/@core/Input";
import Modal from "@/components/@core/Modal";
import Button from "@/packages/@ui-kit/Button";
import Image from "next/image";
import ModalLogin from "./ModalLogin";
import { useModal } from "@/components/@core/Modal/useModal";
import BannerDemo from "@/assets/images/login_banner.jpg";
import { useForm } from "@tanstack/react-form";
import { useAuthContext } from "@/services/AuthProvider";

type Props = {
  isShow: boolean;
  hide: () => void;
  switchToLogin: () => void;
};

const ModalRegister = (props: Props) => {
  const { isShow, hide, switchToLogin } = props;
  const { onRegister } = useAuthContext();

  const form = useForm({
    defaultValues: {
      name: "",
      phoneNumber: "",
      email: "",
      password: "",
      rePassword: "",
    },
    onSubmit: async ({ value }) => {
      try {
        const result = await onRegister(value);
        if (result) {
          hide();
        } else {
        }
      } catch (error) {}
    },
  });

  return (
    <>
      <Modal
        isShow={isShow}
        hide={() => {
          hide();
        }}
      >
        <div className="flex gap-8">
          <div className="mr-8 flex-1 max-lg:hidden">
            <Image
              src={BannerDemo}
              alt=""
              className="h-full w-full rounded-lg object-cover"
            />
          </div>
          <div className="flex w-[375px] min-w-[300px] flex-1 flex-col gap-10 p-2 max-sm:w-full">
            <div>
              <p className="text-center text-2xl font-semibold">Đăng ký</p>
              <p className="mt-2 text-center text-sm">
                Bạn đã có tài khoản?{" "}
                <span
                  className="cursor-pointer text-primary"
                  onClick={switchToLogin}
                >
                  Đăng nhập
                </span>
              </p>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                e.stopPropagation();
                form.handleSubmit();
              }}
            >
              <div className="flex flex-col gap-4">
                <div className="flex gap-4">
                  <form.Field
                    name="name"
                    validators={{
                      onChange: ({ value }) => {
                        if (!value.trim()) {
                          return "Tên không được để trống";
                        }
                        if (value.length < 3) {
                          return "Tên phải có ít nhất 3 ký tự";
                        }
                        return undefined;
                      },
                    }}
                    children={(field) => (
                      <div>
                        <Input
                          title="Tên"
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e: any) =>
                            field.handleChange(e.target.value)
                          }
                        />
                        {field.state.meta.errors ? (
                          <em role="alert" className="text-xs text-red">
                            {field.state.meta.errors.join(", ")}
                          </em>
                        ) : null}{" "}
                      </div>
                    )}
                  />
                  <form.Field
                    name="phoneNumber"
                    validators={{
                      onChange: ({ value }) => {
                        if (!value.trim()) {
                          return "Số điện thoại không được để trống";
                        }
                        if (!/^\d+$/.test(value)) {
                          return "Số điện thoại phải là số";
                        }
                        if (value.length < 10 || value.length > 11) {
                          return "Số điện thoại phải có 10-11 chữ số";
                        }
                        return undefined;
                      },
                    }}
                    children={(field) => (
                      <div>
                        <Input
                          title="Số điện thoại"
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e: any) =>
                            field.handleChange(e.target.value)
                          }
                        />
                        {field.state.meta.errors ? (
                          <em role="alert" className="text-xs text-red">
                            {field.state.meta.errors.join(", ")}
                          </em>
                        ) : null}{" "}
                      </div>
                    )}
                  />
                </div>
                <form.Field
                  name="email"
                  validators={{
                    onChange: ({ value }) => {
                      if (!value) {
                        return "Email là bắt buộc"; // Đã chỉnh sửa thông báo
                      } else if (value.length < 3) {
                        return "Email phải có ít nhất 3 ký tự";
                      } else if (!/\S+@\S+\.\S+/.test(value)) {
                        return "Định dạng email không hợp lệ"; // Thêm xác thực cho định dạng email
                      }
                      return undefined;
                    },
                    onChangeAsync: async ({ value }) => {
                      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate async validation
                      if (value.includes("error")) {
                        return 'The word "error" is not allowed in email'; // Updated message for clarity
                      }
                      return undefined;
                    },
                  }}
                  children={(field) => (
                    <div>
                      <Input
                        title="Email"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e: any) =>
                          field.handleChange(e.target.value)
                        }
                      />
                      <em role="alert" className="text-xs text-red">
                        {field.state.meta.errors.join(", ")}
                      </em>
                    </div>
                  )}
                />

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
                  children={(field) => (
                    <div>
                      <Input
                        title="Mật khẩu"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e: any) =>
                          field.handleChange(e.target.value)
                        }
                        type="password"
                      />
                      {field.state.meta.errors ? (
                        <em role="alert" className="text-xs text-red">
                          {field.state.meta.errors.join(", ")}
                        </em>
                      ) : null}{" "}
                    </div>
                  )}
                />
                <form.Field
                  name="rePassword"
                  validators={{
                    onChange: ({ value, fieldApi }) => {
                      const password = fieldApi.form.getFieldValue("password");
                      if (!value.trim()) {
                        return "Nhập lại mật khẩu không được để trống";
                      }
                      if (value !== password) {
                        return "Mật khẩu nhập lại không khớp";
                      }
                      return undefined;
                    },
                  }}
                  children={(field) => (
                    <div>
                      <Input
                        title="Nhập lại mật khẩu"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e: any) =>
                          field.handleChange(e.target.value)
                        }
                        type="password"
                      />
                      {field.state.meta.errors ? (
                        <em role="alert" className="text-xs text-red">
                          {field.state.meta.errors.join(", ")}
                        </em>
                      ) : null}{" "}
                    </div>
                  )}
                />
              </div>
              <div className="mt-6 text-center">
                <Button title="Đăng ký" className="w-full" />
              </div>
            </form>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ModalRegister;
