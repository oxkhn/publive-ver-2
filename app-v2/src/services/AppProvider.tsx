import UIKitProvider from "@/packages/@ui-kit/UIKitProvider";
import React from "react";
import { AuthProvider } from "./AuthProvider";
import TanstackProvider from "./TanstackProvider";

const AppProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <TanstackProvider>
      <UIKitProvider>
        <AuthProvider>{children}</AuthProvider>
      </UIKitProvider>
    </TanstackProvider>
  );
};

export default AppProvider;
