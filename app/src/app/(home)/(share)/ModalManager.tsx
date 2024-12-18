import { useState } from "react";
import ModalLogin from "./ModalLogin";
import ModalRegister from "./ModalRegister";
import Button from "@/packages/@ui-kit/Button";

export const ModalManager = () => {
    const [currentModal, setCurrentModal] = useState<"login" | "register" | null>(null);
  
    const showModal = (modal: "login" | "register") => setCurrentModal(modal);
    const hideModal = () => setCurrentModal(null);
  
    return (
      <>
        {currentModal === "login" && (
          <ModalLogin
            isShow={true}
            hide={() => {
              hideModal();
            }}
            switchToRegister={() => showModal("register")}
          />
        )}
        {currentModal === "register" && (
          <ModalRegister
            isShow={true}
            hide={() => {
              hideModal();
            }}
            switchToLogin={() => showModal("login")}
          />
        )}
  
        <Button
            title="Đăng nhập"
            onClick={() => {
              showModal("login")
            }}
          />
      </>
    );
  };