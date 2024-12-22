import { MdOutlineCalendarMonth } from "react-icons/md";
import TopMCM_MCN from "./TopMCM_MCN";
import TopKOL_KOC from "./TopKOL_KOC";
import ImageKit from "@/packages/@ui-kit/Image";
import { mockDataCampaign } from "@/mock/campaign";
import { useLeaderboardContext } from "./LeaderboardProvider";
import TopKOL_KOC_2 from "./TopKOL_KOC_2";

const CampaignRanking = () => {
  const { affiliates, random } = useLeaderboardContext();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 rounded-xl bg-white px-4 py-6">
        <p className="font-bold text-grays">Chiến dịch</p>
        <div className="flex flex-1 gap-4 overflow-auto p-1">
          {mockDataCampaign.map((item, i) => (
            <div
              className="relative cursor-pointer rounded-lg"
              key={i}
              onClick={() => random()}
            >
              <ImageKit src={item.banner} className="h-32 rounded-lg" />
              <div className="absolute inset-0 z-10 rounded-lg bg-gradient-to-t from-black/60 to-transparent"></div>

              <div className="absolute bottom-2 left-2 right-2 z-10">
                <p className="line-clamp-1 font-bold text-white">{item.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-4 rounded-xl bg-white px-4 py-6">
        <p className="mx-auto text-2xl font-bold text-grays">Bảng xếp hạng</p>
        <TopKOL_KOC_2 />
      </div>
    </div>
  );
};

export default CampaignRanking;
