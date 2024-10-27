"use client";

import ImageKit from "@/packages/@ui-kit/Image";
import { useRouter } from "next/navigation";

import PyramidIcon from "@/assets/images/pyramids.svg";
import ImageHand from "@/assets/images/handshake.svg";
import { useState } from "react";
import { ProductType } from "@/types/product.type";
import { formatNumberToK, formatVND } from "@/utils/string";
import Button from "@/packages/@ui-kit/Button";

interface RegisterProductCardProps {
  product?: ProductType;
  isActived: boolean;
  onClick: any;
}

const RegisterProductCard: React.FC<RegisterProductCardProps> = (props) => {
  const { product, isActived, onClick } = props;
  const router = useRouter();

  const [isShowButton, setIsShowButton] = useState(false);

  return (
    <div
      className={`relative w-full min-w-[170px] cursor-pointer transition-all max-md:min-w-[163px]`}
      onClick={onClick}
      onMouseMove={() => setIsShowButton(true)}
      onMouseLeave={() => setIsShowButton(false)}
    >
      <div className="absolute -right-0 top-[3px] z-10 h-[30px] w-[79px]">
        <ImageKit src={PyramidIcon} className="" />
        <div className="absolute left-1/2 top-1 flex -translate-x-1/2 items-center gap-1 text-xs font-bold text-white">
          <p>{formatNumberToK(product?.discountPrice)}</p>
        </div>
      </div>

      <div
        className={`mr-1 mt-3 rounded-lg border shadow-card hover:border-primary ${isActived ? "border-2 border-primary" : "border-transparent"}`}
      >
        <ImageKit src={product?.imageList[0]} className="rounded-lg" />

        <div className="flex flex-col p-3">
          <p className="line-clamp-2 text-sm font-bold max-sm:text-[10.5px]">
            {product?.productName} [CHÍNH HÃNG]CB2 Dove Serum phụchồi tái tạo da
            sau triệtlông với4X HA dưỡngsáng khửmùi dành cho nữ40ml tốt như
            kemtẩylông
          </p>

          <div className="mt-2 flex gap-1 text-sm font-bold">
            <p className="text-grays/50">Số lượng:</p>
            <p className="text-secondary">{product?.availableStock || "-"}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterProductCard;
