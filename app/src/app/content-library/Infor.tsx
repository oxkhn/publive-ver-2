import { VideoTiktokType } from "@/types/tiktok.type";

interface InforProps {
  videos: VideoTiktokType[];
}

const Infor: React.FC<InforProps> = (props) => {
  const { videos } = props;

  

  return (
    <div className="max-w-full overflow-auto">
      <div className="shadow-card flex h-[100px] min-w-[765px] items-center rounded-lg bg-white px-4">
        <div className="flex-1">
          <p className="text-sm text-grays/50">Posts</p>
          <div className="flex items-center gap-1">
            <p className="text-2xl font-bold">120</p>
            <p className="text-green-500">(+12)</p>
          </div>
        </div>

        <div className="flex-1">
          <p className="text-sm text-grays/50">Creators</p>
          <div className="flex items-center gap-1">
            <p className="text-2xl font-bold">120</p>
            <p className="text-green-500">(+12)</p>
          </div>
        </div>
        <div className="flex-1">
          <p className="text-sm text-grays/50">Impressions</p>
          <div className="flex items-center gap-1">
            <p className="text-2xl font-bold">120</p>
            <p className="text-green-500">(+12)</p>
          </div>
        </div>
        <div className="flex-1">
          <p className="text-sm text-grays/50">Videos views</p>
          <div className="flex items-center gap-1">
            <p className="text-2xl font-bold">120</p>
            <p className="text-green-500">(+12)</p>
          </div>
        </div>
        <div className="flex-1">
          <p className="text-sm text-grays/50">Engagement Rate</p>
          <div className="flex items-center gap-1">
            <p className="text-2xl font-bold">120</p>
            <p className="text-green-500">(+12)</p>
          </div>
        </div>
        <div className="flex-1">
          <p className="text-sm text-grays/50">Reach</p>
          <div className="flex items-center gap-1">
            <p className="text-2xl font-bold">120</p>
            <p className="text-green-500">(+12)</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Infor;
