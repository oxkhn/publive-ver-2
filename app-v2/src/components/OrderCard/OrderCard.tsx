import React, { useRef, useEffect, useState } from "react";
import ImageKit from "@/packages/@ui-kit/Image";
import { PiTruck } from "react-icons/pi";
import Button from "@/packages/@ui-kit/Button";
import { RegisterOrder } from "@/types/formRegister.type";

interface OrderCardProps {
  order: RegisterOrder;
}

const OrderCard: React.FC<OrderCardProps> = ({ order }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [maxChars, setMaxChars] = useState<number>(30);

  const mappingStatus = (status: number): string => {
    if (status == 0) return "Chờ xác nhận";
    if (status == 1) return "Đang vận chuyển";
    if (status == 2) return "Chờ giao hàng";
    if (status == 3) return "Hoàn thành";
    if (status == 4) return "Đã Huỷ";
    else return "";
  };

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
          {/* <ImageKit src="" className="h-8 w-8 rounded-full" /> */}
          <p className="font-bold">Mã đơn hàng : {order._id}</p>
        </div>
        <div className="flex max-[500px]:flex-col max-[500px]:divide-y-2 min-[500px]:items-center min-[500px]:divide-x-2 sm:items-center">
          <div className="flex items-center gap-1 px-2 text-green">
            <PiTruck className="text-xl" />
            <p>{mappingStatus(order.status)}</p>
          </div>
          {/* <p className="pl-2 text-sm uppercase text-secondary">Hoàn thành</p> */}
        </div>
      </div>
      {order.products.map((product, index) => {
        return (
          <div key={index} className="pt-4">
            <div className="flex items-center gap-4 max-sm:flex-col">
              <ImageKit
                src={product.imageList?.[0]}
                className="h-[92px] w-[92px] rounded"
              />
              <div ref={containerRef} className="flex flex-col gap-2">
                <p className="font-bold text-grays">{product.productName}</p>
                <p>Phân loại sản phẩm: {product.brand}</p>
                {/* <p>X1</p> */}
                <p className="">
                  Link shopee:{" "}
                  <span className="text-primary underline">
                    {truncateLink(product.productLink, maxChars)}{" "}
                  </span>
                </p>
              </div>
            </div>
          </div>
        );
      })}

      <div className="mt-6 flex w-full justify-end gap-4 max-[500px]:flex-col-reverse">
        {/* <Button
          title="Huỷ đơn hàng"
          className="w-[170px] !rounded-[124px] border-primary text-primary max-sm:w-full max-sm:flex-1"
          variant="outline"
        /> */}
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
