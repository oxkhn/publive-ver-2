"use client";

import ImageKit from "@/packages/@ui-kit/Image";
import { useRouter } from "next/navigation";

import PyramidIcon from "@/assets/images/pyramids.svg";
import ImageHand from "@/assets/images/handshake.svg";
import { useState } from "react";
import { ProductType } from "@/types/product.type";
import { formatNumberToK, formatVND } from "@/utils/string";
import Button from "@/packages/@ui-kit/Button";
import { toast } from "react-toastify";

interface CampaignProductCardProps {
  product?: any;
}

const CampaignProductCard: React.FC<CampaignProductCardProps> = (props) => {
  const { product } = props;
  const router = useRouter();

  const [isShowButton, setIsShowButton] = useState(false);

  const navigateProductDetail = () => {
    // router.push("/product/" + product?._id);
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
      className="relative w-full min-w-[170px] cursor-pointer transition-all max-md:min-w-[163px]"
      onClick={navigateProductDetail}
      onMouseMove={() => setIsShowButton(true)}
      onMouseLeave={() => setIsShowButton(false)}
    >
      <div className="absolute -right-0 top-[3px] z-10 h-[30px] w-[79px]">
        <ImageKit src={PyramidIcon} className="" />
        <div className="absolute left-1/2 top-1 flex -translate-x-1/2 items-center gap-1 text-xs font-bold text-white">
          {/* <div className="h-3 w-3">
            <ImageKit src={ImageHand} className="h-3 w-3" />
          </div> */}
          <p>{formatNumberToK(product?.discountPrice)}</p>
        </div>
      </div>

      <div className="mr-1 mt-3 rounded-lg border border-transparent shadow-card hover:border-primary">
        <ImageKit src={product?.imageList[0]} className="rounded-lg" />

        <div className="flex flex-col p-3">
          <p className="line-clamp-2 text-sm font-bold max-sm:text-[10.5px]">
            {product?.productName}
          </p>

          <div className="mt-2 flex gap-3">
            <div className="flex-1">
              <Button className="!line-clamp-2 flex flex-1 flex-col !gap-0 !whitespace-normal !bg-[#13C44F] !p-0 px-1 !text-[10px] leading-3">
                <p>Hot cash {product.hc}k/order</p>
              </Button>
            </div>

            <div className="flex-1">
              <Button
                className="!line-clamp-2 flex w-full flex-1 flex-col !gap-0 !whitespace-normal !p-0 px-1 !text-[10px] leading-3"
                variant="secondary"
              >
                <p>
                  Chiết khấu <br />
                  {product.coms * 100}%
                </p>
              </Button>
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
          {" "}
          <p className="text-sm font-bold text-white">Lấy link Affiliate</p>
        </div>
      )}
    </div>
  );
};

export default CampaignProductCard;
