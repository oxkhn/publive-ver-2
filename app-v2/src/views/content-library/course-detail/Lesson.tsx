import Divider from "@mui/material/Divider";
import Image from "next/image";
import ImageDemo from "@/assets/images/demo.jpg";
import { BsCameraVideo } from "react-icons/bs";
import { GoPeople, GoShareAndroid } from "react-icons/go";
import { IoIosTimer, IoMdCheckmark } from "react-icons/io";
import { IoGlobeOutline, IoNewspaperOutline } from "react-icons/io5";
import { MdOutlineBookmarks } from "react-icons/md";

const Lesson = () => {
  return (
    <div className="flex-1 rounded-md bg-white">
      <div className="flex items-center justify-between p-6">
        <div className="flex flex-col">
          <p className="text-xl">Unilever Marketing Essentials</p>
          <p className="text-sm">Instructor: Prof. Emily Carter</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="bg-blue/20 rounded-md px-2">
            <p className="text-blue text-sm">Marketing</p>
          </div>
          <div className="cursor-pointer rounded-sm p-1 hover:bg-slate-200">
            <GoShareAndroid />
          </div>
          <div className="cursor-pointer rounded-sm p-1 hover:bg-slate-200">
            <MdOutlineBookmarks />
          </div>
        </div>
      </div>
      <div className="px-5">
        <video src="" className="w-full rounded-md bg-black" />
        <div className="flex flex-col gap-6 py-5">
          <div className="flex flex-col gap-4">
            <p className="">About this course</p>
            <p className="text-sm">
              Discover the essentials of marketing with Unilever, one of the
              worlds leading consumer goods brands. This course provides
              actionable strategies and insights to enhance your marketing
              skills.
            </p>
          </div>
          <Divider />
          <div className="flex flex-col gap-4">
            <p className="">By the numbers</p>
            <div className="flex flex-wrap gap-x-12 gap-y-2 text-sm max-md:flex-col">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <IoMdCheckmark />
                  <p>Skill level: Intermediate</p>
                </div>
                <div className="flex items-center gap-2">
                  <GoPeople />
                  <p>Students: 12,500</p>
                </div>
                <div className="flex items-center gap-2">
                  <IoGlobeOutline />
                  <p>Languages: English</p>
                </div>
                <div className="flex items-center gap-2">
                  <IoNewspaperOutline />
                  <p>Captions: Yes</p>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <BsCameraVideo />
                  <p>Lectures: 15</p>
                </div>
                <div className="flex items-center gap-2">
                  <IoIosTimer />
                  <p>Video: 3 total hours</p>
                </div>
              </div>
            </div>
          </div>
          <Divider />
          <div className="flex flex-col gap-4">
            <p className="">Description</p>
            <p className="text-sm">
              Gain insights into Unilevers marketing approach, including
              branding strategies, market analysis, and the art of consumer
              engagement. Whether youre a budding marketer or a professional
              looking to expand your skills, this course offers practical
              knowledge applicable to real-world scenarios.
            </p>
            <p className="text-sm">
              This course is a game-changer for marketing professionals.
              Unilevers branding insights are invaluable. — Alex Harper
            </p>
          </div>
          <Divider />
          <div className="flex flex-col gap-4">
            <p className="">Instructor</p>
            <div className="flex items-center gap-4">
              <Image
                width={38}
                height={38}
                src={ImageDemo}
                alt="Prof. Emily Carter"
                className="rounded-full"
              />
              <div className="flex flex-col gap-1">
                <p className="">Emily Carter</p>
                <p className="text-sm">
                  Marketing Strategist and Brand Consultant
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lesson;
