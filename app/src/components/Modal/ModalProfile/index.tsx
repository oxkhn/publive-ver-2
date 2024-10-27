import ImageKit from "@/packages/@ui-kit/Image";
import Modal from "@/packages/@ui-kit/Modal";
import { RiShareBoxLine } from "react-icons/ri";
import { IoMdClose } from "react-icons/io";
import { FaPlus } from "react-icons/fa6";
import { VideoTiktokType } from "@/types/tiktok.type";
import Button from "@/packages/@ui-kit/Button";
import { IoClose } from "react-icons/io5";
import { useEffect } from "react";
import { convertTimestampToDateString } from "@/utils/string";
import Link from "next/link";

interface ModalProfileProps {
  isShow: boolean;
  setIsShow: (_: boolean) => void;
  video?: VideoTiktokType;
}

const ModalProfile: React.FC<ModalProfileProps> = ({
  isShow,
  setIsShow,
  video,
}) => {
  const statistics = [
    {
      title: "Total views",
      value: "1.2M",
    },
    {
      title: "Total likes",
      value: "1.2M",
    },
    {
      title: "Total comments",
      value: "1.2M",
    },
    {
      title: "Total shares",
      value: "1.2M",
    },
    {
      title: "Total followers",
      value: "1.2M",
    },
    {
      title: "Total following",
      value: "1.2M",
    },
    {
      title: "Total videos",
      value: "1.2M",
    },
    {
      title: "Total hearts",
      value: "1.2M",
    },
    {
      title: "Total duets",
      value: "1.2M",
    },
    {
      title: "Total reactions",
      value: "-",
    },
    {
      title: "Total shares",
      value: "-",
    },
    {
      title: "Total comments",
      value: "-",
    },
  ];

  const tags = ["Shampoo", "Conditioner", "Hair", "Beauty", "Cosmetic"];

  useEffect(() => {
    console.log(isShow);
  }, [isShow]);

  return (
    <Modal
      isShow={isShow}
      hide={() => setIsShow(false)}
      // className="z-100 max-h-[90%] max-w-[80%] overflow-auto"
    >
      <div className="">
        <div className="flex justify-between gap-2 max-md:flex-col">
          <div className="flex items-center gap-3">
            <ImageKit
              src={video?.author.avatarThumb}
              className="aspect-square h-[52px] w-fit rounded-full"
            />
            <div>
              <p className="font-bold">{video?.author.nickname}</p>
              <p className="text-sm text-grays/75">@{video?.author.uniqueId}</p>
            </div>
          </div>
          <Button
            variant="icon"
            icon={<IoClose />}
            onClick={() => setIsShow(false)}
            className="hover:bg-grays/5"
          />
        </div>
        <div className="mt-6 flex gap-4 max-lg:flex-col max-lg:items-center">
          <ImageKit
            src={video?.video.cover}
            className="h-[576px] w-[324px] rounded-lg"
          />
          <div className="flex flex-1 flex-col gap-4">
            <div>
              <div className="flex items-center gap-1 text-2xl font-bold text-grays">
                <p>{video?.desc}</p>
                <RiShareBoxLine className="text-sm" />
              </div>
              <p className="text-sm">
                {convertTimestampToDateString(video?.createTime)}
              </p>
              <p className="mt-4 text-sm">{video?.desc}</p>
            </div>
            <Link
              className="mt-4"
              href={"https://www.tiktok.com/@/video/" + video?.id}
              target="_blank"
            >
              <Button>Mở trên Tiktok</Button>
            </Link>
            {/* <div className="grid grid-cols-3 gap-4">
              {statistics.map((statistic, index) => (
                <div key={index} className="flex flex-col gap-1 py-3">
                  <p className="text-center text-sm text-grays/50">
                    {statistic.title}
                  </p>
                  <p className="text-center font-bold leading-4">
                    {statistic.value}
                  </p>
                </div>
              ))}
            </div> */}
            {/* <div className="divide-y-2">
              <p className="py-4 font-bold">
                Campaigns
                <span className="ml-4 text-primary">
                  COSY - Family Day Activation
                </span>
              </p>
              <div className="py-4">
                <div className="flex gap-4 max-md:flex-col">
                  <p className="font-bold">Tags</p>
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 rounded-[124px] border border-grays/15 px-3 py-1 text-grays/50 transition-all hover:border-black hover:text-black"
                      >
                        <p className="leading-[14px]">{tag}</p>
                        <IoMdClose className="cursor-pointer text-xs" />
                      </div>
                    ))}
                    <div className="flex cursor-pointer items-center gap-2 rounded-[124px] border border-primary px-3 py-1 text-primary transition-all">
                      <p className="leading-[14px]">Add</p>
                      <FaPlus className="cursor-pointer text-xs" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="py-4">
                <div className="flex gap-4 max-md:flex-col">
                  <p className="font-bold">Usage rights</p>
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 rounded-[124px] border border-grays/15 px-3 py-1 text-grays/50 transition-all hover:border-black hover:text-black"
                      >
                        <p className="leading-[14px]">{tag}</p>
                        <IoMdClose className="cursor-pointer text-xs" />
                      </div>
                    ))}
                    <div className="flex cursor-pointer items-center gap-2 rounded-[124px] border border-primary px-3 py-1 text-primary transition-all">
                      <p className="leading-[14px]">Add</p>
                      <FaPlus className="cursor-pointer text-xs" />
                    </div>
                  </div>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ModalProfile;
