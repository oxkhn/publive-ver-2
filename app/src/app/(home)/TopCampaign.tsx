"use client";
import ImageKit from "@/packages/@ui-kit/Image";

import ImageTopCampaign from "@/assets/images/chien_dich_hot.svg";
import ImageTopCampaignMobile from "@/assets/images/chien_dich_hot_mobile.svg";
import ImageLive from "@/assets/images/chien_than_live.svg";
import ImageLiveMobile from "@/assets/images/chien_than_live_mobile.svg";
import ImageDuDon from "@/assets/images/chien_than_du.svg";
import ImageDuDonMobile from "@/assets/images/chien_than_du_mobile.svg";
import ImageAff from "@/assets/images/affi_noi_bat.svg";
import ProductCard from "@/components/ProductCard";
import Button from "@/packages/@ui-kit/Button";
import BannerDemo from "@/assets/images/banner.svg";
import BannerDemo1 from "@/assets/images/banner-campaign-demo.webp";
import { useRouter } from "next/navigation";
import { mockDataCampaign } from "@/mock/campaign";
import { useEffect, useState } from "react";

const TopCampaign = () => {
  const router = useRouter();
  const [filterType, setFilterType] = useState(1);

  const [showArr, setShowArr] = useState([]);

  useEffect(() => {
    if (filterType != 1 && filterType != 2) setShowArr(mockDataCampaign);
    else setShowArr(mockDataCampaign.filter((i: any) => i.type == filterType));
  }, [filterType]);

  return (
    <div className="mt-[100px] flex w-full gap-8 max-md:mt-20 max-md:flex-col max-md:gap-2">
      <ImageKit
        src="/decor/decor_homepage_1.svg"
        className="absolute right-0 -z-[1] w-1/2"
      />
      {/* -- Desktop */}
      <div className="sticky top-[90px] flex h-fit w-[185px] flex-col max-md:hidden">
        <div className="w-[185px]"></div>
        <ImageKit src={ImageTopCampaign} className="w-[185px]" />
        <div>
          <ImageKit
            src={ImageLive}
            className={`cursor-pointer max-md:h-full ${filterType == 1 ? "opacity-100" : "opacity-50"}`}
            onClick={() => setFilterType(1)}
          />
        </div>

        <div>
          <ImageKit
            className={`cursor-pointer max-md:h-full ${filterType == 2 ? "opacity-100" : "opacity-50"}`}
            src={ImageDuDon}
            onClick={() => setFilterType(2)}
          />
        </div>
      </div>
      {/* -- Desktop -- */}

      {/* -- Mobile -- */}
      <div className="flex h-[80px] items-center md:hidden">
        <ImageKit src={ImageTopCampaignMobile} className="h-full w-[180px]" />
        <div className="-mt-2 grid h-full grid-flow-row grid-rows-2">
          <ImageKit src={ImageLiveMobile} className="w-auto" />
          <ImageKit src={ImageDuDonMobile} className="w-auto" />
        </div>
      </div>
      {/* -- Mobile -- */}

      <div className="flex flex-1 flex-col gap-4 overflow-hidden max-md:gap-2">
        {showArr?.map((_, i) => (
          <ImageKit
            key={i}
            className="h-[297px] w-full cursor-pointer rounded-lg shadow-card max-md:h-auto"
            src={_.banner}
            onClick={() => {
              router.push("/campaign/" + _.id);
            }}
          />
        ))}

        <div className="mx-auto mt-4 w-fit">
          <Button
            title="View All"
            className="min-w-[200px] !rounded-full"
            onClick={() => {
              router.push("/campaign");
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default TopCampaign;
