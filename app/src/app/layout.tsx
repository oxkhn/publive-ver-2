import type { Metadata } from "next";
import "./globals.css";
import Header from "./(home)/(share)/Header";
import AppProvider from "@/services/provider/AppProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import localFont from "next/font/local";

export const metadata: Metadata = {
  title: "PubLive",
  description: "Affiliate Central Platform | PubLive",
};

const ProductFont = localFont({
  src: [
    {
      path: "../assets/font/Product Sans Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../assets/font/Product Sans Bold.otf",
      weight: "700",
      style: "normal",
    },
  ],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      {/* <header>
        <link rel="icon" href="/logo_ico.png" sizes="any" />
      </header> */}
      <AppProvider>
        <body className={ProductFont.className}>
          <ToastContainer autoClose={1000} />
          <Header />
          <div className="pt-[70px]">{children}</div>
        </body>
      </AppProvider>
    </html>
  );
}
