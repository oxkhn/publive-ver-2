"use client";

import Image from "next/image";
import BannerImage from "../../assets/images/demo.jpg";
import { useState } from "react";
import Button from "@/packages/@ui-kit/Button2";
import LazadaLogo from "@/assets/images/logo-lazada.webp";
import ShopeeLogo from "@/assets/images/logo-shopee.webp";
import UnileverLogo from "@/assets/images/unilever.png";
import PyramidIcon from "@/assets/images/pyramids.svg";
import ImageHand from "@/assets/images/handshake.svg";
import { useRouter } from "next/navigation";
import { useIsMobile } from "@/hooks/useIsMobile";
import { toast } from "react-toastify";
import { FaCheck } from "react-icons/fa";
import { useRegisterProductContext } from "@/services/RegisterProductProvider";
import { ProductType } from "@/types/product.type";
import { MarketplaceEnum } from "@/services/ProductProvider";

interface ProductCardPreviewProps {
  product: ProductType;
}

const ProductCardPreview: React.FC<ProductCardPreviewProps> = ({ product }) => {
  const router = useRouter();
  const isMobile = useIsMobile();
  const [isHovered, setIsHovered] = useState(false);

  const { productSelected, setProductSelected } = useRegisterProductContext();

  const toggleRegister = () => {
    const index = productSelected.findIndex(
      (productSelected) => productSelected._id == product._id,
    );
    if (index >= 0) {
      let selectUpdated = productSelected;
      selectUpdated = selectUpdated.filter(
        (productSelected) => productSelected._id != product._id,
      );
      setProductSelected([...selectUpdated]);
    } else {
      setProductSelected([...productSelected, product]);
    }
  };

  return (
    <div
      className="relative flex min-w-[158px] cursor-pointer flex-col rounded-lg border bg-white transition-all duration-200 hover:rounded-b-none hover:shadow-xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => toggleRegister()}
    >
      <div className="absolute right-2 top-2 z-10 grid aspect-square h-6 place-items-center rounded-full bg-white">
        {productSelected.findIndex(
          (productSelected) => productSelected._id == product._id,
        ) >= 0 && <FaCheck className="h-4 text-green" />}
      </div>
      <div className="absolute left-2 top-2 z-10 h-6 w-6 rounded-full bg-white p-1">
        {product?.publisher == MarketplaceEnum.LAZADA && (
          <Image
            src={LazadaLogo}
            alt="logo"
            width={40}
            height={40}
            className="rounded-full"
          />
        )}
        {product?.publisher == MarketplaceEnum.SHOPEE && (
          <Image
            src={ShopeeLogo}
            alt="logo"
            width={40}
            height={40}
            className="rounded-full"
          />
        )}

        {product?.publisher == MarketplaceEnum.UNILEVER && (
          <Image
            src={UnileverLogo}
            alt="logo"
            width={40}
            height={40}
            className="rounded-full"
          />
        )}
      </div>

      <div className="overflow-hidden rounded-md">
        <Image
          width={100}
          height={100}
          src={product?.imageList?.[0]}
          alt=""
          className={`${isHovered && "scale-125"} h-full w-full transition-all duration-500`}
        />
      </div>

      <div className="flex flex-col gap-2 p-2">
        <p className="line-clamp-2 text-sm">{product?.productName}</p>
        <p className="text-xs font-normal text-primary/80">
          Hàng mẫu: {product?.availableStock}
        </p>
      </div>
    </div>
  );
};

export default ProductCardPreview;
