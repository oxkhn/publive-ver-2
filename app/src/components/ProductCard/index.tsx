"use client";

import ImageKit from "@/packages/@ui-kit/Image";
import { useRouter } from "next/navigation";

import PyramidIcon from "@/assets/images/pyramids.svg";
import Button from "@/packages/@ui-kit/Button";
import ImageHand from "@/assets/images/handshake.svg";
import { useState } from "react";
import { ProductType } from "@/types/product.type";
import { formatVND } from "@/utils/string";
import { toast } from "react-toastify";
import NewIcon from "@/assets/images/new_icon.svg";

interface ProductCardProps {
  product?: ProductType;
}

const ProductCard: React.FC<ProductCardProps> = (props) => {
  const { product } = props;
  const router = useRouter();

  const [isShowButton, setIsShowButton] = useState(false);

  const navigateProductDetail = () => {
    router.push("/product/" + product?.sku);
  };

  function copyTextToClipboard(text: string): void {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(
        () => {
          toast.success("Sao chép thành công", { autoClose: 1000 });
        },
        (err) => {
          console.error("Failed to copy text: ", err);
        },
      );
    } else {
      // Fallback for older browsers
      const textarea = document.createElement("textarea");
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      try {
        document.execCommand("copy");
        console.log("Text copied to clipboard");
      } catch (err) {
        console.error("Failed to copy text: ", err);
      }
      document.body.removeChild(textarea);
    }
  }

  return (
    <div
      className="relative w-full min-w-[160px] cursor-pointer transition-all max-md:min-w-[163px]"
      onMouseMove={() => setIsShowButton(true)}
      onMouseLeave={() => setIsShowButton(false)}
    >
      <div onClick={navigateProductDetail}>
        <div className="absolute -right-0 top-[3px] z-10 h-[30px] w-[79px]">
          <ImageKit src={PyramidIcon} className="" />
          <div className="absolute left-1/2 top-1 flex -translate-x-1/2 items-center gap-1 text-xs font-bold text-white">
            <div className="h-3 w-3">
              <ImageKit src={ImageHand} className="h-3 w-3" />
            </div>
            <p>{(product?.commission || 0) * 100}%</p>
          </div>
        </div>

        <div className="absolute left-2 top-4 z-10 grid h-6 w-6 place-items-center rounded-full bg-white">
          <ImageKit
            src={
              product?.publisher == "shopee"
                ? "logoSocials/shopee_1.svg"
                : "logoSocials/lazada.png"
            }
            className="h-4 w-4 rounded-full"
          />
        </div>

        {/* <div className="absolute -left-0 top-[179px] z-10">
          <ImageKit src={NewIcon} className="h-[28px] w-[55px] object-cover" />
        </div> */}

        <div className="absolute -right-0 top-[3px] z-10 h-[30px] w-[79px]">
          <ImageKit src={PyramidIcon} className="" />
          <div className="absolute left-1/2 top-1 flex -translate-x-1/2 items-center gap-1 text-xs font-bold text-white">
            <div className="h-3 w-3">
              <ImageKit src={ImageHand} className="h-3 w-3" />
            </div>
            <p>{(product?.commission || 0) * 100}%</p>
          </div>
        </div>

        <div className="mr-1 mt-3 rounded-lg border border-transparent bg-white shadow-card hover:border-primary">
          <ImageKit
            src={product?.imageList[0]}
            className="aspect-square rounded-lg"
          />

          <div className="flex flex-col p-3">
            <p className="line-clamp-2 text-xs max-sm:text-[10.5px]">
              {product?.productName}
            </p>

            <div className="mt-4 flex items-center justify-between">
              <p className="text-sm font-bold text-secondary max-sm:text-xs">
                {formatVND(product?.discountPrice || 0)}
              </p>
              <p className="text-xs text-grays/50 max-sm:text-[10.5px]">
                Đăng ký: - k
              </p>
            </div>
          </div>
        </div>
      </div>

      {isShowButton && (
        <div
          className="absolute -bottom-6 left-0 right-1 z-20 grid h-8 place-items-center rounded-b-lg bg-[#3067F2]"
          onClick={() => {
            copyTextToClipboard(product?.productLink || "");
          }}
        >
          <p className="text-sm font-bold text-white">Lấy link Affiliate</p>
        </div>
      )}
    </div>
  );
};

export default ProductCard;
