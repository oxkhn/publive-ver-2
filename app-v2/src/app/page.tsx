import Tracking from "@/components/Tracking";
import Banner from "@/views/home/Banner";
import CampaignSection from "@/views/home/CampaingnSection";
import ProductSection from "@/views/home/ProductSection";
import Title from "@/views/home/Title";
import TopMCN from "@/views/home/TopMCN";
import TopMCNSection from "@/views/home/TopMCNSection";
import VideoSection from "@/views/home/VideoSection";

export default function Home() {
  return (
    <div className="pt-14">
      <Banner />
      <div className="max-w-app flex flex-col gap-32 pb-20 pt-14 max-sm:gap-12">
        <Title />
        <ProductSection />
        <CampaignSection />
        <VideoSection />
        <TopMCN />
      </div>
      <Tracking />
    </div>
  );
}
