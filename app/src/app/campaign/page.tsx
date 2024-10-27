"use client";
import Breadcrumb from "@/packages/@ui-kit/Breadcrumb";
import ImageKit from "@/packages/@ui-kit/Image";

import ImageTopCampaign from "@/assets/images/chien_dich_hot.svg";
import IamgeLive from "@/assets/images/chien_than_live.svg";
import ImageDuDon from "@/assets/images/chien_than_du.svg";
import ImageAff from "@/assets/images/affi_noi_bat.svg";
import ProductCard from "@/components/ProductCard";
import Button from "@/packages/@ui-kit/Button";
import BannerDemo from "@/assets/images/banner-campaign-demo.webp";
import BannerDemo1 from "@/assets/images/banner.svg";
import Link from "next/link";
import { mockDataCampaign } from "@/mock/campaign";
import { useEffect, useMemo, useState } from "react";
import Line from "@/packages/@ui-kit/Line";

const CampaignPage = () => {
  const [filterType, setFilterType] = useState(0);

  const [showArr, setShowArr] = useState([]);

  useEffect(() => {
    if (filterType != 1 && filterType != 2) setShowArr(mockDataCampaign);
    else setShowArr(mockDataCampaign.filter((i: any) => i.type == filterType));
  }, [filterType]);

  // Hàm lấy ngày bắt đầu từ timeline
  const getStartDate = (timeline) => {
    if (!timeline) return "Không xác định";
    const dates = timeline.split(" - ");
    const startDate = dates[0];
    return startDate.trim();
  };

  // Thêm thuộc tính startDate vào mỗi campaign
  const campaigns = mockDataCampaign.map((campaign) => ({
    ...campaign,
    startDate: getStartDate(campaign.timeline),
  }));

  // Hàm nhóm campaign theo ngày
  const groupCampaignsByDate = (campaigns) => {
    const grouped = {};
    campaigns.forEach((campaign) => {
      const date = getStartDate(campaign.timeline);
      if (!grouped[date]) {
        grouped[date] = [];
      }
      grouped[date].push(campaign);
    });
    return grouped;
  };

  const groupedCampaigns = useMemo(
    () => groupCampaignsByDate(showArr),
    [showArr],
  );

  return (
    <main className="mx-auto flex min-h-screen max-w-[1440px] flex-col gap-6 px-20 pb-20 pt-6 max-md:px-4">
      <Breadcrumb />

      <div className="relative flex w-full gap-8 max-md:flex-col">
        <div className="sticky top-[90px] flex h-fit w-[185px] gap-2 max-md:w-full max-md:items-center max-md:rounded-lg max-md:bg-white max-md:p-4 max-md:shadow-card max-sm:flex-col md:flex-col">
          {/* <div className="w-[185px]"></div>
          <ImageKit src={ImageTopCampaign} className="w-[185px]" /> */}
          <p className="text-2xl font-bold text-grays max-sm:w-full max-sm:text-xl">
            Campaigns
          </p>
          <div className="flex md:flex-col">
            <div>
              <ImageKit
                src={IamgeLive}
                className={`cursor-pointer max-md:h-full ${filterType == 1 ? "opacity-100" : "opacity-50"}`}
                onClick={() => {
                  setFilterType(filterType == 1 ? 0 : 1);
                }}
              />
            </div>

            <div>
              <ImageKit
                className={`cursor-pointer max-md:h-full ${filterType == 2 ? "opacity-100" : "opacity-50"}`}
                src={ImageDuDon}
                onClick={() => setFilterType(filterType == 2 ? 0 : 2)}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-1 flex-col overflow-hidden md:gap-4">
          {/* {showArr.map((_, i) => (
            <Link href={"/campaign/" + _.id} key={i}>
              <ImageKit
                className="h-[297px] w-full cursor-pointer rounded-md shadow-lg"
                src={_.banner}
              />
            </Link>
          ))} */}
          {Object.keys(groupedCampaigns).map((date, idx) => (
            <div key={idx} className="mb-10">
              {/* Hiển thị ngày */}
              <h2 className="mb-1 ml-auto text-primary">{date}</h2>
              {/* Hiển thị các campaign của ngày đó */}
              <div className="mt-1 flex flex-wrap gap-4">
                {groupedCampaigns[date].map((campaign, i) => (
                  <Link href={"/campaign/" + campaign.id} key={i}>
                    <ImageKit
                      className="h-[297px] w-full cursor-pointer rounded-md shadow-lg"
                      src={campaign.banner}
                    />
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default CampaignPage;
