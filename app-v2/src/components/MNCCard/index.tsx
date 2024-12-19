"use client";
import Button from "@/packages/@ui-kit/Button";
import ImageKit from "@/packages/@ui-kit/Image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const RankingTag = ({ rank }: { rank: number }) => {
  const [tag, setTag] = useState<string>("");
  const [rankColor, setRankColor] = useState<string>("");
  const [medal, setMedal] = useState<string>("");
  const getRanking = (rank: number) => {
    switch (rank) {
      case 1:
        setMedal("/MCMRanking/top1.svg");
        setTag("/MCMRanking/rank_1.svg");
        setRankColor("#FFFFFF");
        break;
      case 2:
        setMedal("/MCMRanking/top2.svg");
        setTag("/MCMRanking/rank_2.svg");
        setRankColor("#1E1E1E80");
        break;
      case 3:
        setMedal("/MCMRanking/top3.svg");
        setTag("/MCMRanking/rank_3.svg");
        setRankColor("#FFFFFF");
        break;
      case 4:
        setTag("/MCMRanking/rank_4.svg");
        setRankColor("#FFFFFF");
        break;
      default:
        setTag("/MCMRanking/rank_5.svg");
        break;
    }
  };

  useEffect(() => {
    getRanking(rank);
  }, [rank]);

  return (
    <>
      {/* {rank <= 3 && (
        <div className="absolute -left-2 -top-5 translate-x-[-5px] translate-y-[-5px]">
          <ImageKit src={medal} className="h-auto w-12" />
        </div>
      )} */}
      <div className="absolute right-0 top-5 translate-x-[5px]">
        <ImageKit src={tag} className="h-auto w-12" />
        {/* <p
          style={{ color: rankColor }}
          className="absolute left-1/2 top-1/2 -translate-x-1/3 -translate-y-2/3 text-white"
        >
          #{rank}
        </p> */}
      </div>
    </>
  );
};

interface MCNCardProps {
  rank: number;
  commission: string;
  metal: any;
  data: any;
}

const MCNCardRanking: React.FC<MCNCardProps> = ({
  rank,
  commission,
  metal,
  data,
}) => {
  const [tag, setTag] = useState<string>("");
  const [rankColor, setRankColor] = useState<string>("");
  const router = useRouter();
  const getRanking = (rank: number) => {
    switch (rank) {
      case 1:
        // setMedal("/MCMRanking/top_1.svg");
        setRankColor("#F3CE0F");
        break;
      case 2:
        // setMedal("/MCMRanking/top_2.svg");
        setRankColor("#A1A1A1");
        break;
      case 3:
        // setMedal("/MCMRanking/top_3.svg");
        setRankColor("#CD7F32");
        break;
      default:
        setRankColor("#FF4500");
        break;
    }
  };

  useEffect(() => {
    getRanking(rank);
  }, [rank]);

  return (
    <div
      className={`shadow-box relative flex min-w-[185px] cursor-pointer flex-col items-center gap-3 rounded-lg border-2 bg-white`}
      style={{ borderColor: rankColor }}
      onClick={() => {
        router.push("/leaderboard");
      }}
    >
      {/* {metal && <ImageKit src={metal} className="absolute inset-0" />} */}
      {/* <RankingTag rank={rank} /> */}
      <ImageKit src={data.avata} className="mt-4 h-[92px] w-[92px] rounded-full" />

      <div className="flex w-full flex-1 flex-col justify-between">
        <div className="flex items-center justify-center">
          <div>
            <p className="text-center font-bold">{data.name}</p>
            <p className="text-center text-sm">@publiveasia</p>
          </div>
        </div>

        <Button
          className="mt-8 flex !h-fit w-full flex-col !gap-0"
          style={{ backgroundColor: rankColor }}
          variant="secondary"
        >
          <p className="text-xs">Độc quyền chiết khấu</p>
          <p>{commission}</p>
        </Button>
      </div>
    </div>
  );
};

export default MCNCardRanking;
