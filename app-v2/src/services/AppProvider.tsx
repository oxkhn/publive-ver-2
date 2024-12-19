import UIKitProvider from "@/packages/@ui-kit/UIKitProvider";
import React from "react";
import { AuthProvider } from "./AuthProvider";
import TanstackProvider from "./TanstackProvider";
import { RegisterProductProvider } from "./RegisterProductProvider";
import { ProductProvider } from "./ProductProvider";
import { CampaignProvider } from "./CampaignProvider";
import { ContentProvider } from "./ContentProvider";
import { ProfileProvider } from "./ProfileProvider";

const AppProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <TanstackProvider>
      <UIKitProvider>
        <AuthProvider>
          <ContentProvider>
            <ProductProvider>
              <CampaignProvider>
                <ProfileProvider>
                  <RegisterProductProvider>{children}</RegisterProductProvider>
                </ProfileProvider>
              </CampaignProvider>
            </ProductProvider>
          </ContentProvider>
        </AuthProvider>
      </UIKitProvider>
    </TanstackProvider>
  );
};

export default AppProvider;
