import ImageKit from "@/packages/@ui-kit/Image";
import { useLeaderboardContext } from "./LeaderboardProvider";

const CategoryAndChanel = () => {
  const { chanelFilter, setChanelFilter } = useLeaderboardContext();
  const categorys = [
    {
      title: "Body care",
    },
    {
      title: "Face care",
    },
    {
      title: "Shampoo",
    },
    {
      title: "Organic",
    },
  ];

  const chanels = [
    {
      title: "Shopee live",
      icon: "/logoSocials/shoppe.svg",
      value: 1,
    },
    {
      title: "Youtube",
      icon: "/logoSocials/youtube.svg",
      value: 2,
    },
    {
      title: "Tiktok",
      icon: "/logoSocials/tiktok.svg",
      value: 3,
    },
    {
      title: "Facebook",
      icon: "/logoSocials/facebook.svg",
      value: 4,
    },
    // {
    //   title: "Instagram",
    //   icon: "/logoSocials/facebook.svg",
    // },
  ];

  return (
    <div className="flex max-w-full flex-col gap-6">
      {/* <div className="flex items-center gap-3">
        <p className="w-[61px]">Category</p>

        <div className="rounded-[124px] border border-primary px-3 py-1 text-sm">
          <p className="cursor-pointer leading-[14px] text-primary">All</p>
        </div>
        <div className="flex flex-1 items-center gap-4 overflow-auto">
          {categorys.map((_, i) => (
            <div
              key={i}
              className="cursor-pointer rounded-[124px] border border-grays/15 px-3 py-1 text-sm text-grays/50 transition-all hover:border-black hover:text-black"
            >
              <p className="whitespace-nowrap leading-[14px]">{_.title}</p>
            </div>
          ))}
        </div>
      </div> */}

      <div className="flex items-center gap-3">
        <p className="w-[61px]">Chanel</p>
        <div
          className={`rounded-[124px] border px-3 py-1 text-sm ${chanelFilter == 0 ? "border-primary text-primary" : "border-grays/15 text-grays/15"}`}
          onClick={() => {
            setChanelFilter(0);
          }}
        >
          <p className="cursor-pointer leading-[14px]">All</p>
        </div>
        <div className="flex flex-1 items-center gap-4 overflow-auto">
          {chanels.map((_, i) => (
            <div
              key={i}
              className={`flex cursor-pointer items-center gap-2 rounded-[124px] border border-grays/15 px-3 py-0.5 text-sm text-grays/15 transition-all hover:border-primary hover:text-primary ${chanelFilter == _.value ? "border-primary text-primary" : "border-grays/15 text-grays/15"}`}
              onClick={() => {
                setChanelFilter(_.value);
              }}
            >
              <ImageKit src={_.icon} className="h-5 w-5 min-w-5 rounded-full" />
              <p className="whitespace-nowrap leading-[14px]">{_.title}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryAndChanel;
