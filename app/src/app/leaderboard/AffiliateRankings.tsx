import { MdOutlineCalendarMonth } from "react-icons/md";
import TopMCM_MCN from "./TopMCM_MCN";
import TopKOL_KOC from "./TopKOL_KOC";

const AffiliateRankings = () => {
  return (
    <div className="flex flex-col gap-6 rounded-xl bg-white px-4 py-6">
      {/* <div className="flex w-fit items-center gap-4 rounded border border-grays/15 p-1.5 text-sm">
        <div className="flex items-center gap-2 text-grays/75">
          <MdOutlineCalendarMonth className="text-2xl" />
          <p>By week</p>
        </div>
        <p className="text-garys/50">10/9/2024 - 17/9/2024</p>
      </div> */}
      <TopMCM_MCN />
      <TopKOL_KOC />
    </div>
  );
};

export default AffiliateRankings;
