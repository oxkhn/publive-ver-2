"use client";

import Image from "next/image";
import BannerImage from "../../assets/images/banner.jpg";

const Banner = () => {
  return (
    <div>
      <Image
        src={BannerImage}
        alt="banner"
        width={1000}
        height={1000}
        className="w-full"
      />
    </div>
  );
};

export default Banner;
