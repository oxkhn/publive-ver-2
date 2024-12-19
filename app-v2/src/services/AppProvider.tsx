import UIKitProvider from "@/packages/@ui-kit/UIKitProvider";
import React from "react";
import { AuthProvider } from "./AuthProvider";
import TanstackProvider from "./TanstackProvider";
import { RegisterProductProvider } from "./RegisterProductProvider";
import { ProductProvider } from "./ProductProvider";
import { CampaignProvider } from "./CampaignProvider";

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
            <CampaignProvider>
              <RegisterProductProvider>{children}</RegisterProductProvider>
            </CampaignProvider>
          </ProductProvider>
        </AuthProvider>
      </UIKitProvider>
    </TanstackProvider>
  );
};

export default AppProvider;
