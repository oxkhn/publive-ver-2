import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/views/shared/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Nav from "@/views/shared/Nav";
import AppProvider from "@/services/AppProvider";
import Tracking from "@/components/Tracking";

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

export const metadata: Metadata = {
  title: "PubLive",
  description: "Affiliate Central Platform | PubLive",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${ProductFont.className} relative antialiased`}>
        <AppProvider>
          <Header />
          {children}
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
          <Nav />
        </AppProvider>
      </body>
    </html>
  );
}
