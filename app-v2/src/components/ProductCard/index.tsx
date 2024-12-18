"use client";

import Image from "next/image";
import BannerImage from "../../assets/images/demo.jpg";
import { useState } from "react";
import Button from "@/packages/@ui-kit/Button2";
import LazadaLogo from "@/assets/images/logo-lazada.webp";
import ShopeeLogo from "@/assets/images/logo-shopee.webp";
import PyramidIcon from "@/assets/images/pyramids.svg";
import ImageHand from "@/assets/images/handshake.svg";
import { useRouter } from "next/navigation";
import { useIsMobile } from "@/hooks/useIsMobile";
import { toast } from "react-toastify";

const ProductCard = () => {
  const router = useRouter();
  const isMobile = useIsMobile();

  const [isHovered, setIsHovered] = useState(false);

  const navProductDetail = () => {
    console.log("dasdasdas");
    router.push("/product/s");
  };

  return (
    <div
      className="relative flex min-w-[158px] cursor-pointer flex-col rounded-lg border bg-white transition-all duration-200 hover:rounded-b-none hover:shadow-xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => navProductDetail()}
    >
      {(isHovered || isMobile) && (
        <div className="absolute -bottom-8 left-0 right-0 z-20 grid h-9 place-items-center overflow-auto transition-all duration-500">
          <Button
            title="Affiliate link"
            onClick={(e) => {
              toast.success("Sao chép thành công.");
              e.stopPropagation();
            }}
            className="w-full rounded-t-none"
          />
        </div>
      )}

      <div className="absolute -right-1 -top-[13px] z-10 h-[30px] w-[79px]">
        <Image src={PyramidIcon} className="" alt="" width={100} height={100} />
        <div className="absolute left-1/2 top-1 flex -translate-x-1/2 items-center gap-1 text-xs font-bold text-white">
          <div className="h-3 w-3">
            <Image
              src={ImageHand}
              className="h-3 w-3"
              alt=""
              width={40}
              height={30}
            />
          </div>
          <p>{1 * 100}%</p>
        </div>
      </div>

      <div className="absolute left-2 top-2 z-10 h-6 w-6 rounded-full bg-white p-1">
        <Image
          src={ShopeeLogo}
          alt="logo"
          width={40}
          height={40}
          className="rounded-full"
        />
      </div>

      <div className="overflow-hidden rounded-md">
        <Image
          src={BannerImage}
          alt=""
          className={`${isHovered && "scale-125"} transition-all duration-500`}
        />
      </div>

      <div className="flex flex-col gap-2 p-2">
        <p className="line-clamp-2 text-sm">
          dasdasd asdasd qw qwesa asd asd asd qwe asd qw qw sa qw sdas qw dsada
          qwdas d wqdsa
        </p>
        <p className="font-semibold text-secondary">300.000 d</p>
      </div>
    </div>
  );
};

export default ProductCard;
