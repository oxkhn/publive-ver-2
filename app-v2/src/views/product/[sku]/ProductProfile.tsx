"use client";

import Image from "next/image";
import ImageDemo from "@/assets/images/demo.jpg";
import Line from "@/packages/@ui-kit/Line";
import Button from "@/packages/@ui-kit/Button2";
import { MarketplaceEnum, useProductContext } from "@/services/ProductProvider";
import { useParams } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { copyString, formatVND } from "@/utils/string";
import { toast } from "react-toastify";

const ProductProfile = () => {
  const { productDetail } = useProductContext();
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const changeImage = () => {
      setSelectedIndex((prevIndex) =>
        productDetail?.imageList
          ? (prevIndex + 1) % productDetail.imageList.length
          : prevIndex,
      );
    };
    if (
      productDetail?.imageList &&
      !isHovered &&
      productDetail?.imageList?.length > 1
    ) {
      intervalRef.current = setInterval(changeImage, 3000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isHovered, productDetail]);

  const handleThumbnailClick = (index: number) => {
    setSelectedIndex(index);
  };

  return (
    <div className="flex flex-wrap gap-8 rounded-md bg-white p-8 shadow-md max-sm:p-2 max-sm:shadow-none">
      <div className="flex max-w-[455px] flex-1 flex-col gap-4">
        <div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="relative"
        >
          <Image
            src={productDetail?.imageList[selectedIndex] || ""}
            alt=""
            width={455}
            height={455}
            className="rounded-md object-cover"
          />
        </div>

        <div className="flex gap-4 overflow-auto">
          {productDetail?.imageList.map((imgSrc, index) => (
            <div
              key={index}
              onClick={() => handleThumbnailClick(index)}
              className={`cursor-pointer rounded-lg border-2 ${
                index === selectedIndex
                  ? "border-primary"
                  : "border-transparent"
              }`}
            >
              <Image
                src={imgSrc}
                alt={`Thumbnail ${index + 1}`}
                width={84}
                height={84}
                className="rounded-md"
              />
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-4">
        <div className="flex gap-4">
          <div className="rounded-md border border-primary px-2 py-1">
            <p className="text-sm text-primary">Chính Hãng</p>
          </div>

          <div className="rounded-md border border-secondary px-2 py-1">
            {productDetail?.publisher === MarketplaceEnum.SHOPEE && (
              <p className="text-sm text-secondary">Shopee</p>
            )}
            {productDetail?.publisher === MarketplaceEnum.LAZADA && (
              <p className="text-sm text-secondary">Lazada</p>
            )}
            {productDetail?.publisher === MarketplaceEnum.UNILEVER && (
              <p className="text-sm text-secondary">Unilever</p>
            )}
          </div>
          <div className="rounded-md border border-red bg-red/70 px-2 py-1">
            <p className="text-sm text-white">
              Hoa hồng{" "}
              {productDetail?.commission ? productDetail?.commission * 100 : 0}%
            </p>
          </div>
        </div>

        <p className="text-xl font-semibold">{productDetail?.productName}</p>

        <div className="flex items-center gap-4">
          <Image
            src={ImageDemo}
            alt=""
            width={40}
            height={40}
            className="rounded-full"
          />

          <p className="font-semibold">{productDetail?.brand}</p>
        </div>

        <div className="my-4 flex flex-wrap items-center gap-4">
          <Button
            title="Nhận affiliate link"
            onClick={(e) => {
              copyString(productDetail?.productLink);
              toast.success("Sao chép thành công.");
              e.stopPropagation();
            }}
          />

          <div className="flex items-center gap-4">
            <p className="text-[30px] font-semibold text-secondary">
              {productDetail?.price &&
                formatVND(productDetail?.price - productDetail?.discountPrice)}
            </p>
            {productDetail?.discountPrice !== 0 && productDetail?.price && (
              <>
                <p className="text-sm font-semibold line-through">
                  {productDetail?.price}
                </p>
                <p className="text-sm font-semibold text-secondary">
                  -
                  {(
                    (productDetail.discountPrice / productDetail.price) *
                    100
                  ).toFixed(0)}
                  %
                </p>
              </>
            )}
          </div>
        </div>

        <div className="flex gap-8">
          <p className="w-[100px] text-sm font-semibold text-gray-700">Mô tả</p>
          {productDetail?.description && (
            <p className="text-sm">{productDetail.description}</p>
          )}
        </div>

        <div className="flex gap-8">
          <p className="w-[100px] text-sm font-semibold text-gray-700">
            Quà tặng
          </p>
          {productDetail?.productGift && (
            <p className="text-sm">{productDetail.productGift}</p>
          )}
        </div>

        <div className="flex gap-8">
          <p className="w-[100px] text-sm font-semibold text-gray-700">
            Videos
          </p>
          {/* <p className="text-sm">
            [Hannah Olala 25.6] Sữa Tắm Lifebuoy 800gr Detox Và Sạch Sâu Khỏi
            Bụi Mịn Pm2.5 Detox 100% Từ Thiên Nhiên Diệt Khuẩn
          </p> */}
        </div>
      </div>
    </div>
  );
};

export default ProductProfile;
