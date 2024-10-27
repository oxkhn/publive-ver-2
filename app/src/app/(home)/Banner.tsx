import { GiCabbage } from "react-icons/gi";
import BannerDemo from "@/assets/images/banner_demo_1.jpg";
import ImageKit from "@/packages/@ui-kit/Image";

const Banner = () => {
  return (
    <div className="grid place-items-center rounded-md max-md:w-screen md:mt-6">
      <ImageKit
        src={BannerDemo}
        className="w-full rounded-md shadow-md max-md:h-auto"
      />
    </div>
  );
};

export default Banner;
