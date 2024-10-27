"use client";
import Button from "@/packages/@ui-kit/Button";
import ImageKit from "@/packages/@ui-kit/Image";
import { useEffect, useState } from "react";

const RankingTag = ({ rank }: { rank: number }) => {
  const [src, setSrc] = useState<string>("");
  const [rankColor, setRankColor] = useState<string>("");

  const getRanking = (rank: number) => {
    switch (rank) {
      case 1:
        setSrc("/MCMRanking/rank1.svg");
        setRankColor("#FFFFFF");
        break;
      case 2:
        setSrc("/MCMRanking/rank2.svg");
        setRankColor("#1E1E1E80");
        break;
      case 3:
        setSrc("/MCMRanking/rank3.svg");
        setRankColor("#FFFFFF");
        break;
      case 4:
        setSrc("/MCMRanking/rank4.svg");
        setRankColor("#FFFFFF");
        break;
      default:
        setSrc("/MCMRanking/rank4.svg");
        break;
    }
  };

  useEffect(() => {
    getRanking(rank);
  }, [rank]);

  return (
    <div className="absolute right-0 top-5 translate-x-[5px]">
      <ImageKit src={src} className="h-auto w-12" />
      <p
        style={{ color: rankColor }}
        className="absolute left-1/2 top-1/2 -translate-x-1/3 -translate-y-2/3 text-white"
      >
        #{rank}
      </p>
    </div>
  );
};

interface MCNCardProps {
  rank?: number;
  commission: string;
  metal?: any;
  data: any;
}

const MCNCardRanking: React.FC<MCNCardProps> = (props) => {
  const { data, rank } = props;
  return (
    <div className="relative flex min-w-[250px] gap-4 rounded-lg p-4 shadow-card max-sm:items-center">
      {/* <RankingTag rank={rank} /> */}
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-300">
        <span className="text-lg font-bold text-white">P</span>
      </div>

      <div className="flex flex-1 flex-col justify-between">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-bold">{data?.name}</p>
            <p className="text-sm">@publiveasia</p>
          </div>
        </div>

        <Button
          title={`${data.discount} Commission`}
          className="mt-3 !h-7 w-full"
          variant="secondary"
        />
      </div>
    </div>
  );
};

export default MCNCardRanking;
