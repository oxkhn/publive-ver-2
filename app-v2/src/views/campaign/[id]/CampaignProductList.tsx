import CampaignProductCard from "./CampaignProductCard";

const CampaignProductList = () => {
  return (
    <div className="max-h-[800px] max-w-[475px] overflow-auto rounded-lg border p-4">
      <p className="text-center text-lg font-semibold text-gray-700">
        Danh sách sản phẩm
      </p>
      <div className="mt-10 grid grid-cols-2 gap-4 gap-y-14">
        {[...Array(10)].map((_, index) => {
          return <CampaignProductCard key={index} />;
        })}
      </div>
    </div>
  );
};

export default CampaignProductList;
