import ImageKit from "@/packages/@ui-kit/Image";
import { useGetAllAffiliate } from "@/services/api/affiliate/useGetAllAffiliate";
import { AffiliateType } from "@/types/affiliate.type";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useLeaderboardContext } from "./LeaderboardProvider";

const TopKOL_KOC = () => {
  const { affiliates } = useLeaderboardContext();

  const Row: React.FC<{ affiliate: AffiliateType; index: number }> = ({
    affiliate,
    index,
  }) => {
    return (
      <tr className="bg-white hover:bg-background">
        <td className="whitespace-nowrap px-6 py-4 font-bold text-grays/75">
          #{index + 1}
        </td>
        <td className="flex items-center px-6 py-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-300">
            <span className="text-lg font-bold text-white">
              {affiliate.affiliateName?.charAt(0).toUpperCase()}
            </span>
          </div>

          <div className="ml-4">
            <div className="whitespace-nowrap text-sm font-bold text-primary">
              {affiliate.affiliateName} <span className="text-grays/50"></span>
            </div>
            <div className="text-sm leading-3 text-grays/75">
              @{affiliate.affiliateUsername}
            </div>
            <div className="mt-2.5 flex items-center gap-3">
              {affiliate.tiktokLink && (
                <Link href={affiliate.tiktokLink} target="_blank">
                  <ImageKit
                    src="/logoSocials/tiktok_1.svg"
                    className="h-4 w-4 hover:bg-grays/10"
                  />
                </Link>
              )}

              {affiliate.fbLink && (
                <Link
                  target="_blank"
                  href={affiliate.fbLink}
                  className="cursor-pointer rounded-full p-1 hover:bg-grays/15"
                >
                  <ImageKit src="/logoSocials/fb_1.svg" className="h-4 w-4" />
                </Link>
              )}
              {affiliate.youtubeLink && (
                <Link
                  target="_blank"
                  href={affiliate.youtubeLink}
                  className="cursor-pointer rounded-full p-1 hover:bg-grays/15"
                >
                  <ImageKit src="/logoSocials/yt_1.svg" className="h-4 w-4" />
                </Link>
              )}
              {affiliate.shopeeLink && (
                <Link
                  target="_blank"
                  href={affiliate.shopeeLink}
                  className="cursor-pointer rounded-full p-1 hover:bg-grays/15"
                >
                  <ImageKit
                    src="/logoSocials/shopee_1.svg"
                    className="h-4 w-4"
                  />
                </Link>
              )}
            </div>
          </div>
        </td>
        <td className="whitespace-nowrap px-6 py-4 text-end text-sm font-bold text-grays/75">
          {affiliate.orders}
          {/* <span className="ml-2 text-green">+12%</span> */}
          {/* <span className="text-red">-12%</span> */}
        </td>
        <td className="whitespace-nowrap px-6 py-4 text-end text-sm font-bold text-grays/75">
          {affiliate.ROI}
        </td>
        <td className="whitespace-nowrap px-6 py-4 text-end text-sm font-bold text-grays/75">
          {affiliate.sales}
        </td>
        <td className="whitespace-nowrap px-6 py-4 text-end text-sm font-bold text-grays/75">
          {affiliate.commission}
        </td>
        <td className="whitespace-nowrap px-6 py-4 text-end text-sm font-bold text-grays/75">
          {affiliate.newBuyers}
        </td>
        {/* <td className="whitespace-nowrap px-6 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-1">
              <ImageKit src="/logoSocials/tiktok.svg" className="h-5 w-5" />
              <span className="block text-sm font-bold text-grays/75">
                16,895
              </span>
            </div>
            <div className="flex items-center gap-1">
              <ImageKit src="/logoSocials/tiktok.svg" className="h-5 w-5" />
              <span className="block text-sm font-bold text-grays/75">
                16,895
              </span>
            </div>
            <div className="flex items-center gap-1">
              <ImageKit src="/logoSocials/tiktok.svg" className="h-5 w-5" />
              <span className="block text-sm font-bold text-grays/75">
                16,895
              </span>
            </div>
            <div className="flex items-center gap-1">
              <ImageKit src="/logoSocials/tiktok.svg" className="h-5 w-5" />
              <span className="block text-sm font-bold text-grays/75">
                16,895
              </span>
            </div>
          </div>
        </td>
        <td className="whitespace-nowrap px-6 py-4 font-bold text-primary">
          Agency Studio
        </td>
        <td className="whitespace-nowrap px-6 py-4 font-bold text-grays/75">
          Activities
        </td> */}
      </tr>
    );
  };

  return (
    <div className="flex flex-col gap-4">
      <p className="font-bold text-grays">Top Chiến Thần Affiliate </p>
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse bg-white">
          <thead>
            <tr className="bg-background text-left">
              <th className="px-6 py-3 text-xs font-bold uppercase text-grays/75">
                Ranking
              </th>
              <th className="min-w-[200px] px-6 py-3 text-xs font-bold uppercase text-grays/75">
                Affiliaters
              </th>
              <th className="px-6 py-3 text-end text-xs font-bold uppercase text-grays/75">
                Orders
              </th>
              <th className="px-6 py-3 text-end text-xs font-bold uppercase text-grays/75">
                ROI
              </th>
              <th className="min-w-[200px] px-6 py-3 text-end text-xs font-bold uppercase text-grays/75">
                Sales
              </th>
              <th className="px-6 py-3 text-end text-xs font-bold uppercase text-grays/75">
                Commission
              </th>
              <th className="px-6 py-3 text-end text-xs font-bold uppercase text-grays/75">
                New Buyers
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {affiliates?.map((_: any, i: number) => {
              return <Row key={i} index={i} affiliate={_} />;
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TopKOL_KOC;
