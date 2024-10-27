import ImageKit from "@/packages/@ui-kit/Image";
import ImageDemo from "@/assets/images/demo.svg";
import Line from "@/packages/@ui-kit/Line";
import { FaRegCopy } from "react-icons/fa6";
import { ProductType } from "@/types/product.type";
import { formatVND } from "@/utils/string";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface ProductInforProps {
  product?: ProductType;
}

const ProductInfo: React.FC<ProductInforProps> = (props) => {
  const { product } = props;
  const router = useRouter();
  const [activeImage, setActiveImage] = useState("");
  useEffect(() => {
    setActiveImage(product?.imageList[0] || "");
  }, [product]);

  function copyTextToClipboard(text: string): void {
    if (text == "") {
      toast.info("Sản phẩm không có affiliate link");
      return;
    }
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
    <div className="mt-6 flex gap-12 rounded-lg bg-white p-8 shadow-card max-lg:flex-col max-lg:items-center max-md:p-2">
      <div className="flex w-[455px] max-w-full flex-col gap-4">
        <ImageKit
          src={activeImage}
          className="aspect-square w-[455px] max-w-full rounded-md md:h-[455px]"
        />

        <div className="flex w-full gap-4 overflow-auto">
          {product?.imageList.map((_, i) => (
            <div
              key={i}
              className="cursor-pointer rounded-lg border border-grays/15"
              onClick={() => setActiveImage(_)}
            >
              <ImageKit
                key={i}
                src={_}
                className="h-[84px] w-[84px] rounded-md"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1">
        <div className="flex items-center gap-4">
          <div className="w-fit rounded-md bg-primary px-2 py-1">
            <p className="text-sm font-bold italic text-white">Chính hãng</p>
          </div>
          <div className="w-fit rounded-md bg-secondary px-2 py-1">
            <p className="text-sm font-bold italic text-white">
              {product?.publisher == "SP" ? "Shopee" : "Lazada"}
            </p>
          </div>
        </div>

        <p className="mt-1 line-clamp-2 text-2xl font-bold">
          {product?.productName}
        </p>

        <div className="mt-3 flex gap-4">
          <div className="flex items-center gap-1 text-sm">
            <p className="font-bold">-</p>
            <p className="text-grays/50">Đăng ký</p>
          </div>
          <div className="h-4 w-[1px] bg-grays/15"></div>
          <div className="flex items-center gap-1 text-sm">
            <p className="font-bold">-</p>
            <p className="text-grays/50">Đã bán</p>
          </div>
        </div>

        <div className="mt-6 flex h-[64px] rounded-md">
          <div className="grid h-full place-items-center rounded-l-md bg-[#EF4B35] px-12 max-md:px-3">
            <p className="font-bold text-white max-sm:text-center max-sm:text-sm">
              Hoa hồng {(product?.commission || 0) * 100}%
            </p>
          </div>
          <div className="flex flex-1 items-center justify-center gap-4 bg-grays/5 max-sm:gap-2">
            <p className="text-grays/50 line-through">
              {formatVND(product?.price)}
            </p>
            <p className="text-2xl">{formatVND(product?.discountPrice)}</p>
            <div className="rounded-sm bg-primary px-2 py-1 text-xs font-bold text-white">
              <p>
                {(
                  (((product?.price || 0) - (product?.discountPrice || 0)) /
                    (product?.price || 1)) *
                  100
                ).toFixed(0)}
                % Giảm
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 flex gap-4 text-sm">
          <p className="w-[150px] flex-shrink-0 font-bold text-grays/50 max-sm:w-[60px]">
            Mô tả
          </p>
          <p className="line-clamp-2">{product?.description}</p>
        </div>

        <div className="mt-6 flex gap-4 text-sm">
          <p className="w-[150px] font-bold text-grays/50 max-sm:w-[60px]">
            Quà tặng
          </p>
          <p className="font-bold max-sm:flex-1">{product?.productGift}</p>
        </div>

        <div className="mt-6 flex gap-4 text-sm">
          <p className="w-[150px] font-bold text-grays/50 max-sm:w-[60px]">
            Videos
          </p>
          <div className="flex flex-1 flex-col gap-2">
            <div className="flex gap-4">
              <p className="font-bold max-sm:flex-1">
                Tìm thêm cảm hứng về thương hiệu
              </p>
              <p
                className="cursor-pointer text-primary underline"
                onClick={() => {
                  router.push("/content-library");
                }}
              >
                Xem thêm
              </p>
            </div>
          </div>
        </div>

        <Line className="mb-3 mt-6" />

        <div className="flex items-center gap-3">
          <ImageKit src="" className="h-[52px] w-[52px] rounded-full" />
          <p className="font-bold">{product?.brand}</p>
        </div>

        <div className="mt-3 flex w-fit max-w-full items-center gap-3 rounded-md bg-grays/5 p-2 text-sm">
          {product?.publisher == "SP" ? (
            <ImageKit
              src="/logoSocials/shoppe.svg"
              className="h-6 w-6 rounded-full"
            />
          ) : (
            <ImageKit
              src="/logoSocials/lazada.png"
              className="h-6 w-6 rounded-full"
            />
          )}

          <p className="line-clamp-1 max-w-[330px] max-sm:max-w-[250px]">
            {product?.productLink}
          </p>

          <div
            className="flex cursor-pointer items-center gap-1 rounded-md px-2 text-primary hover:underline"
            onClick={() => {
              copyTextToClipboard(product?.productLink || "");
            }}
          >
            <FaRegCopy />
            <p className="max-sm:hidden">Copy</p>
          </div>
        </div>

        {product?.affiliateLink && (
          <div className="mt-3 flex w-fit max-w-full items-center gap-3 rounded-md bg-grays/5 p-2 text-sm">
            <p>Affiliate link:</p>
            <p className="line-clamp-1 max-w-[330px] max-sm:max-w-[250px]">
              {product?.affiliateLink}
            </p>

            <div
              className="flex cursor-pointer items-center gap-1 rounded-md px-2 text-primary hover:underline"
              onClick={() => {
                copyTextToClipboard(product?.affiliateLink || "");
              }}
            >
              <FaRegCopy />
              <p className="max-sm:hidden">Copy</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductInfo;
