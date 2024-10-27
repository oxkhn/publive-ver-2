import ImageKit from "@/packages/@ui-kit/Image";
import clsx from "clsx";
import { useEffect, useState } from "react";

export interface BrandLogoProps {
  className?: string;
  brandName:
    | "Dove Deo"
    | "Dove Scrub"
    | "Lifebuoy Jarvis"
    | "Dove SCL"
    | "Hazeline"
    | "Lifebuoy Core"
    | "Lux"
    | "P/S eTB"
    | "CloseUp"
    | "Tresemme"
    | "Clear"
    | "Dove hair"
    | "Sunsilk"
    | "Simple"
    | "Vaseline"
    | "Pond's"
    | "Omo Capsule"
    | "Omo Tablet"
    | "Lingerie Detergent"
    | "Comfort dryer sheet"
    | "Vim Block"
    | "Sunlight DW Tablet";
}
const BrandLogo: React.FC<BrandLogoProps> = ({ className, brandName }) => {
  const [brandSrc, setBrandSrc] = useState<string>("");

  const getBrandSrc = () => {
    switch (brandName) {
      // case "HAZELINE":
      //   setBrandSrc("/logoBrands/hazeline.svg");
      //   break;
      // case "POND":
      //   setBrandSrc("/logoBrands/pond.svg");
      //   break;
      // case "VASELINE":
      //   setBrandSrc("/logoBrands/vaseline.svg");
      //   break;
      // case "SIMPLE":
      //   setBrandSrc("/logoBrands/simple.svg");
      //   break;
      // case "CLEAR":
      //   setBrandSrc("/logoBrands/clear.svg");
      //   break;
      // case "DOVE":
      //   setBrandSrc("/logoBrands/dove.svg");
      //   break;
      // case "TRESEMME":
      //   setBrandSrc("/logoBrands/tresemme.svg");
      //   break;
      // case "SUNSILK":
      //   setBrandSrc("/logoBrands/sunsilk.svg");
      //   break;
      // case "MICHIRU":
      //   setBrandSrc("/logoBrands/michiru.svg");
      //   break;
      default:
        setBrandSrc("/logoBrands/dove.svg");
        break;
    }
  };
  useEffect(() => {
    getBrandSrc();
  }, [brandName]);

  const classes = clsx(`w-[52px] h-[52px]`, className);

  return <ImageKit src={brandSrc} className={classes} />;
};

export default BrandLogo;
