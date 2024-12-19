"use client";
import ImageTopMCN from "@/assets/images/top_mcn.svg";
import Button from "@/packages/@ui-kit/Button";
import ImageKit from "@/packages/@ui-kit/Image";
import { useRouter } from "next/navigation";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { useRef } from "react";
import MCNCardRanking from "@/components/MNCCard";
import Image from "next/image";
import MCNIcon from "@/assets/images/top_mcn.svg";

const mockupData = [
  {
    id: 1,
    name: "RioMCN",
    username: "@publiveasia",
    discount: "25%",
    rank: 1,
    medal: "MCMRanking/1.png", // Replace with actual image link
    rankColor: "#FFD700", // Gold color for 1st place
    avata: "MCMRanking/2/1.jpeg",
  },
  {
    id: 2,
    name: "Social Elite",
    username: "@streamerpro",
    discount: "20%",
    rank: 2,
    medal: "https://example.com/medal2.png", // Replace with actual image link
    rankColor: "#C0C0C0", // Silver color for 2nd place
    avata: "MCMRanking/2/2.jpeg",
  },
  {
    id: 3,
    name: "On25",
    username: "@livemasters",
    discount: "15%",
    rank: 3,
    medal: "https://example.com/medal3.png", // Replace with actual image link
    rankColor: "#CD7F32", // Bronze color for 3rd place
    avata: "MCMRanking/2/3.jpeg",
  },
  {
    id: 4,
    name: "Hepmil Official",
    username: "@viralstream",
    discount: "10%",
    rank: 4,
    medal: null, // No medal for this rank
    rankColor: "#4B0082", // Custom color for 4th place
    avata: "MCMRanking/2/4.png",
  },
  {
    id: 5,
    name: "Adpia",
    username: "@broadcastkings",
    discount: "5%",
    rank: 5,
    medal: null, // No medal for this rank
    rankColor: "#1E90FF", // Custom color for 5th place
    avata: "MCMRanking/2/5.png",
  },
];

const TopMCN = () => {
  const router = useRouter();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleScrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -300,
        behavior: "smooth",
      });
    }
  };

  const handleScrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 300,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="mt-[100px] flex w-full items-start gap-8 max-md:mt-20 max-md:flex-col max-md:gap-2">
      <div className="flex h-full w-[185px] flex-col max-md:hidden">
        <Image
          src={MCNIcon}
          alt=""
          width={185}
          height={200}
          className="h-full w-[185px] max-sm:hidden"
        />
      </div>
      <div className="md:hidden">
        <p className="text-2xl font-bold">Top MCN</p>
      </div>
      <div className="flex-1 overflow-auto">
        <div className="relative">
          <div
            ref={scrollContainerRef}
            className="flex w-full flex-1 gap-4 overflow-auto px-1 py-2"
          >
            {/* <div
              onClick={handleScrollLeft}
              className="absolute left-1 top-1/2 z-10 grid -translate-y-1/2 cursor-pointer place-items-center rounded-full border border-line bg-[#eff3fb] text-4xl font-bold text-primary transition-all hover:brightness-110 active:scale-95"
            >
              <IoIosArrowBack className="relative -translate-x-0.5" />
            </div> */}
            <div className="grid flex-1 grid-cols-5 gap-4 overflow-auto">
              {mockupData.map((data) => (
                <MCNCardRanking
                  key={data.id}
                  rank={data.rank}
                  commission={data.discount}
                  metal={data.medal}
                  data={data}

                  // rankColor={data.rankColor}
                />
              ))}
            </div>

            {/* <div
              onClick={handleScrollRight}
              className="absolute right-1 top-1/2 z-10 grid -translate-y-1/2 cursor-pointer place-items-center rounded-full border border-line bg-[#eff3fb] text-4xl font-bold text-primary transition-all hover:brightness-110 active:scale-95"
            >
              <IoIosArrowForward className="relative translate-x-0.5" />
            </div> */}
            {/* </div>
        </div> */}
          </div>
          <div className="mx-auto mt-4 w-fit overflow-auto">
            <Button
              title="Xem thêm"
              className=""
              onClick={() => router.push("/leaderboard")}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopMCN;
