import Tracking from "@/components/Tracking";
import Breadcrumb from "@/packages/@ui-kit/Breadcrumb";
import VideoSection from "@/views/home/VideoSection";
import MoreProduct from "@/views/product/[sku]/MoreProduct";
import ProductProfile from "@/views/product/[sku]/ProductProfile";

const ProductDetail = () => {
  return (
    <div className="max-w-app flex flex-col gap-20 pb-20 pt-16">
      <div className="-mb-[74px]">
        <Breadcrumb title="Campaign" />
      </div>

      <ProductProfile />
      <VideoSection />
      <MoreProduct />
      <Tracking />
    </div>
  );
};

export default ProductDetail;
