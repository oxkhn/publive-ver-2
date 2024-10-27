"use client";
import Breadcrumb from "@/packages/@ui-kit/Breadcrumb";
import ImageKit from "@/packages/@ui-kit/Image";
import BannerDemo from "@/assets/images/banner_demo_1.jpg";
import Button from "@/packages/@ui-kit/Button";
import CampaignProductCard from "@/components/CampaignProductCard";
import { useEffect, useState } from "react";
import { ProductType } from "@/types/product.type";
import { useParams } from "next/navigation";
import { mockDataCampaign } from "@/mock/campaign";
import { useGetAllProduct } from "@/services/api/product/useGetAllProduct";
import { useGetCampaignDetail } from "@/services/api/campaign/useGetCampaignDetail";

const CampaignDetailPage = () => {
  const { campaignId } = useParams();
  const [campaign, setCampaign] = useState<any>();

  const _getCampaignDetail = useGetCampaignDetail();
  const handleData = async () => {
    try {
      const res = await _getCampaignDetail.mutateAsync(campaignId as string);
      setCampaign(res.data);
    } catch (error) {}
  };

  useEffect(() => {
    handleData();
  }, [campaignId]);

  return (
    <main className="relative mx-auto flex min-h-screen max-w-[1440px] flex-col gap-6 overflow-auto px-20 pb-20 pt-6">
      <Breadcrumb />

      <ImageKit
        className="w-full rounded-md shadow-lg"
        src={campaign?.banner}
      />

      <div className="flex max-h-screen gap-4">
        <div className="flex flex-1 flex-col rounded-lg p-6 shadow-card md:gap-4">
          <p className="text-2xl font-bold">Danh sách sản phẩm</p>

          <div className="grid grid-cols-2 gap-6 overflow-auto">
            {campaign?.products &&
              campaign?.products?.map((_, i) => (
                <CampaignProductCard key={i} product={_} />
              ))}
          </div>
        </div>

        <div className="flex flex-[2] flex-col gap-6 rounded-lg p-6 shadow-card">
          <p className="text-2xl font-bold">Thể lệ tham gia</p>

          <div dangerouslySetInnerHTML={{ __html: campaign?.description }} />
        </div>
      </div>

      {/* <Button title="Đăng ký tham gia" className="mx-auto" /> */}
    </main>
  );
};

export default CampaignDetailPage;
