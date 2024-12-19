"use client";

import Image from "next/image";
import CampaignIcon from "@/assets/images/chien_dich_hot.svg";
import CampaignMobileIcon from "@/assets/images/chien_dich_hot_mobile.svg";
import ChienThanLivestream from "@/assets/images/chien_than_livestream.svg";
import ChienThanDuDon from "@/assets/images/chien_than_du_don.svg";
import BannerDemo from "@/assets/images/banner.jpg";
import Button from "@/packages/@ui-kit/Button2";
import { useRouter } from "next/navigation";
import { useCampaignContext } from "@/services/CampaignProvider";

const CampaignSection = () => {
  const router = useRouter();

  const { campaigns } = useCampaignContext();

  return (
    <div className="relative flex gap-8 max-sm:flex-col">
      <div className="sticky top-20 z-20 flex h-full w-[185px] flex-col gap-4 max-sm:hidden">
        <Image
          src={CampaignIcon}
          alt=""
          width={185}
          height={200}
          className="w-[185px]"
        />

        <Image
          src={ChienThanLivestream}
          alt=""
          width={185}
          height={200}
          className="w-[185px]"
        />

        <Image
          src={ChienThanDuDon}
          alt=""
          width={185}
          height={200}
          className="w-[185px]"
        />
      </div>

      <div className="sticky top-20 z-20 flex w-full flex-col gap-2 sm:hidden">
        <Image
          src={CampaignMobileIcon}
          alt=""
          width={185}
          height={200}
          className="w-full"
        />

        <div className="flex gap-2">
          <Image
            src={ChienThanLivestream}
            alt=""
            width={185}
            height={36}
            className="h-9 w-full rounded-lg object-cover"
          />

          <Image
            src={ChienThanDuDon}
            alt=""
            width={185}
            height={36}
            className="h-9 w-full rounded-lg object-cover"
          />
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-4">
        {campaigns.map((_, index) => {
          return (
            <Image
              width={500}
              height={200}
              src={_?.banner}
              alt=""
              className="w-full rounded-lg object-cover max-sm:h-[100px]"
              key={index}
            />
          );
        })}

        <Button
          title="Xem thêm"
          onClick={() => {
            router.push("/campaign");
          }}
          className="mx-auto mt-4 px-10"
        />
      </div>
    </div>
  );
};

export default CampaignSection;
