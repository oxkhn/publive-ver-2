"use client";

import ImageKit from "@/packages/@ui-kit/Image";
import Filter from "./Filter";
import Infor from "./Infor";
import AffiliateRankings from "./AffiliateRankings";
import { useGetAllAffiliate } from "@/services/api/affiliate/useGetAllAffiliate";
import { useEffect, useState } from "react";
import { LeaderboardProvider } from "./LeaderboardProvider";
import dayjs from "dayjs";
import { BiLogoTiktok } from "react-icons/bi";
import { IoSearchOutline } from "react-icons/io5";

import utc from "dayjs/plugin/utc";
import { toast } from "react-toastify";
import Input from "@/packages/@ui-kit/Input";
import CategoryAndChanel from "./CategoryAndChanel";
import CampaignRanking from "./CampaignRanking";

import Banner from "@/assets/images/banner_afiliate.png";

dayjs.extend(utc);
const platformItems = [
  {
    value: "facebook",
    title: "Facebook",
  },
  {
    value: "tiktok",
    title: "Tiktok",
  },
  {
    value: "youtube",
    title: "Youtube",
  },
  {
    value: "instagram",
    title: "Instagram",
  },
];

const logoSocials = [
  {
    src: "/logoSocials/shoppe.svg",
  },
  {
    src: "/logoSocials/tiktok.svg",
  },
  {
    src: "/logoSocials/youtube.svg",
  },
  {
    src: "/logoSocials/facebook.svg",
  },
];

const filterDate = [
  {
    value: 1,
    title: "1 ngày qua",
  },
  {
    value: 2,
    title: "7 ngày qua",
  },
  {
    value: 3,
    title: "1 tháng qua",
  },
  {
    value: 4,
    title: "Tất cả",
  },
];

const LeaderBoardPage = () => {
  const [platform, setPlatform] = useState(platformItems[0]);
  const [filterDateActive, setFilterDateActive] = useState(filterDate[0]);

  const [timeEnd, setTimeEnd] = useState(dayjs().utc().add(30, "day"));

  const handleDateChange = (date: any) => {
    if (date) {
      setTimeEnd(date.utc());
    }
  };

  const tabs = ["Chiến Thần Doanh Số", "BXH Chiến Dịch"];
  const [tabActive, setTabActive] = useState(tabs[0]);

  const _getAffiliate = useGetAllAffiliate();

  const handleGetData = async () => {
    try {
      const body = {
        limit: 100,
        page: 1,
      };
      const res = await _getAffiliate.mutateAsync(body);

      console.log(res.data);
    } catch (error) {}
  };

  useEffect(() => {
    handleGetData();
  }, []);

  return (
    <main className="relative mx-auto flex min-h-screen max-w-[1440px] flex-col gap-4 px-20 pb-20 pt-6 max-md:px-4">
      <LeaderboardProvider>
        <div className="relative w-full rounded-lg pt-[130px] shadow-card">
          <div className="absolute left-0 right-0 top-0 -z-10">
            <ImageKit src={Banner} className="h-[152px] w-full rounded-t-lg" />
          </div>
        </div>
        <div className="sticky top-20 z-10">
          <div className="rounded-lg bg-white px-2 py-4 shadow-card">
            <div className="flex gap-8 border-b border-grays/15">
              {tabs.map((_, i) => (
                <div
                  key={i}
                  className={`grid h-full cursor-pointer place-items-center ${tabActive == _ && "border-b border-primary !text-primary"} text-grays/50`}
                  onClick={() => setTabActive(_)}
                >
                  <p className="pb-2 text-center font-bold">{_}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 flex gap-4 max-sm:flex-col">
              {tabActive == tabs[0] && <CategoryAndChanel />}
            </div>
          </div>
        </div>
        {tabActive == tabs[0] && <AffiliateRankings />}
        {tabActive == tabs[1] && <CampaignRanking></CampaignRanking>}
      </LeaderboardProvider>
    </main>
  );
};

export default LeaderBoardPage;
