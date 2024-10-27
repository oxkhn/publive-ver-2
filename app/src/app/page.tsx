"use client";

import TopProduct from "./(home)/TopProduct";
import Banner from "./(home)/Banner";
import Campaign from "./(home)/Campaign";
import Header from "./(home)/(share)/Header";
import Title from "./(home)/Title";
import TopCampaign from "./(home)/TopCampaign";
import TopVideo from "./(home)/TopVideo";
import TopMCN from "./(home)/TopMCN";
import ImageKit from "@/packages/@ui-kit/Image";
import ContentImageButton from "@/assets/images/content_button.svg";
import ContentImageButtonMobile from "@/assets/images/content_button_mobile.svg";
import AffiliateImageButton from "@/assets/images/affiliate_button.svg";
import AffiliateImageButtonMobile from "@/assets/images/affiliate_button_mobile.svg";

import Button1 from "@/assets/images/hh_icon.svg";
import Button2 from "@/assets/images/voucher_icon.svg";
import Button3 from "@/assets/images/dd_icon.svg";
import Button4 from "@/assets/images/dv_icon.svg";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { toast } from "react-toastify";
import BannerDemo from "@/assets/images/banner_demo_1.jpg";
import { ProductsProvider } from "./(home)/ProductProvider";

export default function Home() {
  const router = useRouter();

  const topProductRef = useRef(null);
  const topCampaignRef = useRef(null);
  const topVideoRef = useRef(null);
  const topMCNRef = useRef(null);

  const scrollToSection = (ref: any) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <div className="grid place-items-center rounded-md max-md:w-screen">
        <ImageKit
          src={BannerDemo}
          className="w-full rounded-md shadow-md max-md:h-auto"
        />
      </div>

      <div className="mx-auto mt-10 flex max-w-[1440px] flex-col gap-4 px-20 pb-20 max-md:px-4">
        <div className="rounded-md bg-white px-2 pb-6 pt-4 shadow-md max-md:-mt-10">
          <div className="flex md:gap-4">
            <button
              onClick={() => {
                router.push("/content-library");
              }}
            >
              <ImageKit
                className="transition-all hover:scale-105 md:hidden"
                src={ContentImageButtonMobile}
              />
              <ImageKit
                className="transition-all hover:scale-105 max-md:hidden"
                src={ContentImageButton}
              />
            </button>
            <button
              onClick={() => {
                router.push("/leaderboard");
              }}
            >
              <ImageKit
                className="transition-all hover:scale-105 md:hidden"
                src={AffiliateImageButtonMobile}
              />
              <ImageKit
                className="transition-all hover:scale-105 max-md:hidden"
                src={AffiliateImageButton}
              />
            </button>
          </div>

          <div className="mt-4 flex justify-between gap-4 max-sm:grid max-sm:grid-cols-2">
            <button
              className="flex flex-1 flex-col items-center justify-center gap-3 hover:text-primary"
              onClick={() => {
                router.push("/product");
              }}
            >
              <ImageKit
                src={Button1}
                className="h-[72px] w-[72px] max-sm:h-[30px] max-sm:w-[30px]"
              />
              <p className="text-sm font-bold max-sm:text-xs">
                Hoa hồng cực cao
              </p>
            </button>
            <button
              className="flex flex-1 flex-col items-center justify-center gap-3 hover:text-primary"
              onClick={() => {
                router.push("/campaign");
              }}
            >
              <ImageKit
                src={Button2}
                className="h-[72px] w-[72px] max-sm:h-[30px] max-sm:w-[30px]"
              />
              <p className="text-sm font-bold max-sm:text-xs">
                Chiến dịch đặc biệt
              </p>
            </button>
            <button
              className="flex flex-1 flex-col items-center justify-center gap-3 hover:text-primary"
              onClick={() => router.push("/content-library")}
            >
              <ImageKit
                src={Button3}
                className="h-[72px] w-[72px] max-sm:h-[30px] max-sm:w-[30px]"
              />
              <p className="text-sm font-bold max-sm:text-xs">Video nổi bật</p>
            </button>
            <button
              className="flex flex-1 flex-col items-center justify-center gap-3 hover:text-primary"
              // onClick={() => scrollToSection(topMCNRef)}
              onClick={() => {
                router.push("/leaderboard");
              }}
            >
              <ImageKit
                src={Button4}
                className="h-[72px] w-[72px] max-sm:h-[30px] max-sm:w-[30px]"
              />
              <p className="text-sm font-bold max-sm:text-xs">Bảng Xếp Hạng</p>
            </button>
          </div>
        </div>
        {/* Sections */}
        <div ref={topProductRef}>
          <ProductsProvider>
            <TopProduct />
          </ProductsProvider>
        </div>
        <div ref={topCampaignRef}>
          <TopCampaign />
        </div>
        <div ref={topVideoRef}>
          <TopVideo />
        </div>
        <div ref={topMCNRef}>
          <TopMCN />
        </div>
      </div>
    </>
  );
}
