import UIKitProvider from "@/packages/@ui-kit/UIKitProvider";
import React from "react";
import { AuthProvider } from "./AuthProvider";
import TanstackProvider from "./TanstackProvider";
import { RegisterProductProvider } from "./RegisterProductProvider";
import { ProductProvider } from "./ProductProvider";

const AppProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <TanstackProvider>
      <UIKitProvider>
        <AuthProvider>
          <ProductProvider>
            <RegisterProductProvider>{children}</RegisterProductProvider>
          </ProductProvider>
        </AuthProvider>
      </UIKitProvider>
    </TanstackProvider>
  );
};

export default AppProvider;
