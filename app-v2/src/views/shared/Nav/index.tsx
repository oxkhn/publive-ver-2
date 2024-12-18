'use client'
import { IoIosHome } from "react-icons/io";
import { BsBasketFill } from "react-icons/bs";
import { MdCampaign } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { useRouter } from "next/navigation";

const Nav = () => {
  const router = useRouter();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 flex h-16 items-center justify-around bg-white shadow-md sm:hidden">
      <div
        className="flex flex-col items-center justify-center"
        onClick={() => router.push("/")}
      >
        <IoIosHome className="text-2xl" />
        <p className="text-sm font-medium">Home</p>
      </div>
      <div
        className="flex flex-col items-center justify-center"
        onClick={() => router.push("/product")}
      >
        <BsBasketFill className="text-2xl" />
        <p className="text-sm font-medium">Sản Phẩm</p>
      </div>
      <div
        className="flex flex-col items-center justify-center"
        onClick={() => router.push("/campaign")}
      >
        <MdCampaign className="text-2xl" />
        <p className="text-sm font-medium">Chiến Dịch</p>
      </div>
      <div
        className="flex flex-col items-center justify-center"
        onClick={() => router.push("/user")}
      >
        <FaUser className="text-2xl" />
        <p className="text-sm font-medium">Profile</p>
      </div>
    </div>
  );
};

export default Nav;
