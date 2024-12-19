import { useCampaignContext } from "@/services/CampaignProvider";
import CampaignProductCard from "./CampaignProductCard";

const CampaignProductList = () => {
  const { campaignDetail } = useCampaignContext();

  return (
    <div className="max-h-[800px] max-w-[475px] overflow-auto rounded-lg border p-4">
      <p className="text-center text-lg font-semibold text-gray-700">
        Danh sách sản phẩm
      </p>
      <div className="mt-10 grid grid-cols-2 gap-4 gap-y-14">
        {campaignDetail?.products?.map((_, index) => {
          return <CampaignProductCard product={_} key={index} />;
        })}
      </div>
    </div>
  );
};

export default CampaignProductList;
