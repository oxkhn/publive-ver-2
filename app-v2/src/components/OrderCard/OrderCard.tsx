import React, { useRef, useEffect, useState } from "react";
import ImageKit from "@/packages/@ui-kit/Image";
import { PiTruck } from "react-icons/pi";
import Button from "@/packages/@ui-kit/Button";

const OrderCard: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [maxChars, setMaxChars] = useState<number>(30);
  const [shopeeLink] = useState(
    "https://www.facebook.com/asddasdasdasd/asd/asd/asddasdasdasd/asd/asd/",
  );

  const truncateLink = (url: string, maxLength: number) => {
    if (url.length > maxLength) {
      return url.substring(0, maxLength) + "...";
    }
    return url;
  };

  const calculateMaxCharacters = (width: number): number => {
    const averageCharWidth = 10;
    return Math.floor(width / averageCharWidth);
  };

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const calculatedMaxChars = calculateMaxCharacters(containerWidth);
        setMaxChars(calculatedMaxChars);
        console.log("Max chars: ", calculatedMaxChars);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="shadow-card rounded-xl bg-white p-6">
      <div className="flex justify-between gap-2 border-b pb-3 max-sm:flex-col sm:items-center">
        <div className="flex items-center gap-3">
          <ImageKit src="" className="h-8 w-8 rounded-full" />
          <p className="font-bold">Dove</p>
        </div>
        <div className="flex max-[500px]:flex-col max-[500px]:divide-y-2 min-[500px]:items-center min-[500px]:divide-x-2 sm:items-center">
          <div className="flex items-center gap-1 px-2 text-green">
            <PiTruck className="text-xl" />
            <p>Giao hàng thành công</p>
          </div>
          <p className="pl-2 text-sm uppercase text-secondary">Hoàn thành</p>
        </div>
      </div>
      <div className="pt-4">
        <div className="flex items-center gap-4 max-sm:flex-col">
          <ImageKit src="" className="h-[92px] w-[92px] rounded" />
          <div ref={containerRef} className="flex flex-col gap-2">
            <p className="font-bold text-grays">
              Dove Deep Moisture, sữa tắm dưỡng thể, dưỡng ẩm chuyên sâu, mềm
              mịn tức thì
            </p>
            <p>Phân loại sản phẩm: Sửa tắm</p>
            <p>X1</p>
            <p className="">
              Link shopee:{" "}
              <span className="text-primary underline">
                {truncateLink(shopeeLink, maxChars)}{" "}
              </span>
            </p>
          </div>
        </div>
      </div>

      <div className="pt-4">
        <div className="flex items-center gap-4 max-sm:flex-col">
          <ImageKit src="" className="h-[92px] w-[92px] rounded" />
          <div ref={containerRef} className="flex flex-col gap-2">
            <p className="font-bold text-grays">
              Dove Deep Moisture, sữa tắm dưỡng thể, dưỡng ẩm chuyên sâu, mềm
              mịn tức thì
            </p>
            <p>Phân loại sản phẩm: Sửa tắm</p>
            <p>X1</p>
            <p className="">
              Link shopee:{" "}
              <span className="text-primary underline">
                {truncateLink(shopeeLink, maxChars)}{" "}
              </span>
            </p>
          </div>
        </div>
      </div>
      <div className="mt-6 flex w-full justify-end gap-4 max-[500px]:flex-col-reverse">
        <Button
          title="Huỷ đơn hàng"
          className="w-[170px] !rounded-[124px] border-primary text-primary max-sm:w-full max-sm:flex-1"
          variant="outline"
        />
        <Button
          title="Liên hệ nhãn hàng"
          className="w-[170px] !rounded-[124px] text-white max-sm:w-full max-sm:flex-1"
          variant="primary"
        />
      </div>
    </div>
  );
};

export default OrderCard;
