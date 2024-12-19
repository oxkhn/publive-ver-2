"use client";

import Image from "next/image";
import ImageDemo from "@/assets/images/demo.jpg";
import Line from "@/packages/@ui-kit/Line";
import Button from "@/packages/@ui-kit/Button2";
import { useProductContext } from "@/services/ProductProvider";
import { useParams } from "next/navigation";

const ProductProfile = () => {
  const { sku } = useParams();

  const { productDetail } = useProductContext();
  return (
    <div className="flex flex-wrap gap-8 rounded-md p-8 shadow-md max-sm:p-2 max-sm:shadow-none">
      <div className="flex max-w-[455px] flex-1 flex-col gap-4">
        <Image src={ImageDemo} alt="" width={455} height={455} />

        <div className="flex gap-4 overflow-auto">
          {[...Array(10)].map((_, index) => {
            return (
              <Image
                key={index}
                src={ImageDemo}
                alt=""
                width={84}
                height={84}
                className="rounded-md"
              />
            );
          })}
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-4">
        <div className="flex gap-4">
          <div className="rounded-md border border-primary px-2 py-1">
            <p className="text-sm text-primary">Chính Hãng</p>
          </div>

          <div className="rounded-md border border-secondary px-2 py-1">
            <p className="text-sm text-secondary">Shopee</p>
          </div>
          <div className="rounded-md border border-red px-2 py-1">
            <p className="text-sm text-red">Hoa hồng 30%</p>
          </div>
        </div>

        <p className="text-xl font-semibold">
          [Hannah Olala 25.6] Sữa Tắm Lifebuoy 800gr Detox Và Sạch Sâu Khỏi Bụi
          Mịn Pm2.5 Detox 100% Từ Thiên Nhiên Diệt Khuẩn
        </p>

        <div className="flex items-center gap-4">
          <Image
            src={ImageDemo}
            alt=""
            width={40}
            height={40}
            className="rounded-full"
          />

          <p className="font-semibold">Lifebuoy</p>
        </div>

        <div className="my-4 flex flex-wrap items-center gap-4">
          <Button title="Nhận affiliate link" onClick={() => {}} />

          <div className="flex items-center gap-4">
            <p className="text-[30px] font-semibold text-secondary">200.000</p>
            <p className="text-sm font-semibold line-through">200.000</p>
            <p className="text-sm font-semibold text-secondary">-57%</p>
          </div>
        </div>

        <div className="flex gap-8">
          <p className="w-[100px] text-sm font-semibold text-gray-700">Mô tả</p>
          <p className="text-sm">
            [Hannah Olala 25.6] Sữa Tắm Lifebuoy 800gr Detox Và Sạch Sâu Khỏi
            Bụi Mịn Pm2.5 Detox 100% Từ Thiên Nhiên Diệt Khuẩn
          </p>
        </div>

        <div className="flex gap-8">
          <p className="w-[100px] text-sm font-semibold text-gray-700">
            Quà tặng
          </p>
          {/* <p className="text-sm">
            [Hannah Olala 25.6] Sữa Tắm Lifebuoy 800gr Detox Và Sạch Sâu Khỏi
            Bụi Mịn Pm2.5 Detox 100% Từ Thiên Nhiên Diệt Khuẩn
          </p> */}
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
