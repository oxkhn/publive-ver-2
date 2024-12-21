import Divider from "@mui/material/Divider";
import Image from "next/image";
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
          <p className="text-xl">UI/UX Basic Fundamentals</p>
          <p className="text-sm">Prof. Devonne Wallbridge</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="rounded-md bg-red/20 px-2">
            <p className="text-sm text-red">UI/UX</p>
          </div>
          <GoShareAndroid />
          <MdOutlineBookmarks />
        </div>
      </div>
      <div className="px-5">
        <video src="" className="w-full rounded-md bg-black" />
        <div className="flex flex-col gap-6 py-5">
          <div className="flex flex-col gap-4">
            <p className="">About this course</p>
            <p className="text-sm">
              Learn web design in 1 hour with 25+ simple-to-use rules and
              guidelines — tons of amazing web design resources included!
            </p>
          </div>
          <Divider />
          <div className="flex flex-col gap-4">
            <p className="">By the numbers</p>
            <div className="flex flex-wrap gap-x-12 gap-y-2 text-sm max-md:flex-col">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <IoMdCheckmark />
                  <p>Skill level: All Level</p>
                </div>
                <div className="flex items-center gap-2">
                  <GoPeople />
                  <p>Students: 38,815</p>
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
                  <p>Lectures: 19</p>
                </div>
                <div className="flex items-center gap-2">
                  <IoIosTimer />
                  <p>Video: 1.5 total hours</p>
                </div>
              </div>
            </div>
          </div>
          <Divider />
          <div className="flex flex-col gap-4">
            <p className="">Description</p>
            <p className="text-sm">
              The material of this course is also covered in my other course
              about web design and development with HTML5 & CSS3. Scroll to the
              bottom of this page to check out that course, too! If you're
              already taking my other course, you already have all it takes to
              start designing beautiful websites today!
            </p>
            <p className="text-sm">
              "Best web design course: If you're interested in web design, but
              want more than just a "how to use WordPress" course, I highly
              recommend this one." — Florian Giusti
            </p>
          </div>
          <Divider />
          <div className="flex flex-col gap-4">
            <p className="">Instructor</p>
            <div className="flex items-center gap-4">
              <Image
                width={38}
                height={38}
                src={""}
                alt=""
                className="rounded-full"
              />
              <div className="flex flex-col gap-1">
                <p className="">L.M.Khang</p>
                <p className="text-sm">Web Developer, Designer, and Teacher</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lesson;
