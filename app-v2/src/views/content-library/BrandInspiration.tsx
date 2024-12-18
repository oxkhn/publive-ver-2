import { useContentContext } from "@/services/ContentProvider";
import { Tooltip } from "@mui/material";
import { LiaQuestionCircleSolid } from "react-icons/lia";
import { BsStars } from "react-icons/bs";
import BrandVideo from "@/components/BrandVideo";

const BrandInspiration = () => {
  const { videos } = useContentContext();

  return (
    <div className="flex flex-col gap-16 px-8 pb-20">
      <div className="flex flex-col gap-8">
        <div className="flex items-center gap-2">
          <BsStars className="font-semibold text-primary" />
          <p className="font-semibold text-primary">Tìm hiểu sản phẩm </p>
          <Tooltip
            title="Các thông tin về nhãn hàng/ sản phẩm bạn cần biết"
            arrow
          >
            <LiaQuestionCircleSolid className="text-grays/50" />
          </Tooltip>
        </div>

        <div className="flex gap-8 overflow-auto">
          {[...Array(10)].map((item, index) => {
            return <BrandVideo key={index} />;
          })}
        </div>
      </div>

      <div className="flex flex-col gap-8">
        <div className="flex items-center gap-2">
          <BsStars className="font-semibold text-primary" />
          <p className="font-semibold text-primary">Ý tưởng review sản phẩm</p>
          <Tooltip
            title="Lợi ích & Tính năng nổi bật của sản phẩm; Ý tưởng review sản phẩm"
            arrow
          >
            <LiaQuestionCircleSolid className="text-grays/50" />
          </Tooltip>
        </div>

        <div className="grid grid-cols-[repeat(auto-fill,_minmax(158px,_1fr))] justify-between gap-x-8 gap-y-4 max-sm:gap-x-4">
          {[...Array(10)].map((item, index) => {
            return <BrandVideo key={index} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default BrandInspiration;
