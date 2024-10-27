import CampaignCard from "@/components/CampaignProductCard";
import Button from "@/packages/@ui-kit/Button";

const Campaign = () => {
  return (
    <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-8 px-8 py-10">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[36px] font-bold text-primary">Chiến dịch</p>
        </div>

        <Button variant="ghost" className="text-lg">
          Xem thêm
        </Button>
      </div>

      <div className="flex gap-4 overflow-scroll">
        {[...Array(10)].map((_, index) => (
          <CampaignCard key={index} />
        ))}
      </div>
    </div>
  );
};

export default Campaign;
