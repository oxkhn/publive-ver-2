import { useContentContext } from "@/services/ContentProvider";
import { Pagination, Switch, ToggleButton, Tooltip } from "@mui/material";
import { LiaQuestionCircleSolid } from "react-icons/lia";
import { BsStars } from "react-icons/bs";
import BrandVideo from "@/components/BrandVideo";
import VideoAcheCard from "./VideoAcheCard";
import DropdownV2 from "@/packages/@ui-kit/Dropdown2";
import DropdownItem from "@/packages/@ui-kit/Dropdown/DropdownItem";
import { useState } from "react";
import Input from "@/packages/@ui-kit/Input";
import { IoSearchOutline } from "react-icons/io5";
import Button from "@/packages/@ui-kit/Button";
import Image from "next/image";
import { useTypewriter, Cursor } from "react-simple-typewriter";

const courses = [
  {
    name: "Cách sáng tạo nội dung hấp dẫn cho TikTok",
    description:
      "Khóa học hướng dẫn cách tạo nội dung sáng tạo, dễ tiếp cận trên TikTok, sử dụng các sản phẩm của Unilever như Dove, Lifebuoy và P/S.",
    duration: "45 phút",
    likes: 1200,
    downloads: 850,
  },
  {
    name: "Chiến lược xây dựng nội dung bền vững",
    description:
      "Học cách lập kế hoạch nội dung bền vững, sáng tạo nội dung có giá trị lâu dài cho các sản phẩm của Unilever như Comfort và OMO.",
    duration: "1 giờ",
    likes: 950,
    downloads: 640,
  },
  {
    name: "Bí quyết viral nội dung với sản phẩm P/S",
    description:
      "Phương pháp tối ưu để nội dung của bạn trở nên lan tỏa nhanh chóng, với các mẹo sử dụng sản phẩm P/S trong các tình huống thực tế.",
    duration: "30 phút",
    likes: 1500,
    downloads: 1120,
  },
  {
    name: "Nghệ thuật kể chuyện với sản phẩm của Unilever",
    description:
      "Biến các sản phẩm của Unilever thành nhân vật chính trong câu chuyện của bạn, từ đó tăng độ hấp dẫn và khả năng chuyển đổi người dùng.",
    duration: "50 phút",
    likes: 890,
    downloads: 570,
  },
  {
    name: "Hướng dẫn quay video quảng bá sản phẩm Sunsilk",
    description:
      "Chi tiết từng bước từ lên ý tưởng, quay video cho đến biên tập nội dung để tạo ra video quảng bá chất lượng cho Sunsilk.",
    duration: "40 phút",
    likes: 1100,
    downloads: 720,
  },
  {
    name: "Cách sử dụng sản phẩm Unilever trong kịch bản video",
    description:
      "Tích hợp các sản phẩm của Unilever như OMO, Knorr và Dove vào các kịch bản video, giúp KOC có nội dung tự nhiên, thuyết phục hơn.",
    duration: "55 phút",
    likes: 980,
    downloads: 690,
  },
  {
    name: "Phân tích xu hướng nội dung năm 2024 cho KOC",
    description:
      "Dự đoán các xu hướng nội dung hot nhất năm 2024 và hướng dẫn KOC cách sử dụng sản phẩm của Unilever để đón đầu xu hướng này.",
    duration: "1 giờ 30 phút",
    likes: 2100,
    downloads: 1320,
  },
  {
    name: "Sáng tạo nội dung viral với Lifebuoy trong 7 ngày",
    description:
      "Khóa học cấp tốc trong 7 ngày để KOC có thể tự tạo nội dung quảng bá Lifebuoy thu hút hàng nghìn lượt xem và tương tác.",
    duration: "1 giờ 15 phút",
    likes: 1800,
    downloads: 1250,
  },
  {
    name: "Chiến lược review sản phẩm OMO hiệu quả",
    description:
      "Chiến lược cụ thể cho KOC về cách review sản phẩm OMO để thu hút sự chú ý và tăng lượt click vào liên kết mua hàng.",
    duration: "35 phút",
    likes: 1020,
    downloads: 650,
  },
  {
    name: "Cách tối ưu hóa mô tả sản phẩm của Unilever",
    description:
      "Học cách viết mô tả sản phẩm ngắn gọn, xúc tích nhưng vẫn đầy đủ thông tin, tập trung vào các sản phẩm như P/S, Dove và Sunsilk.",
    duration: "25 phút",
    likes: 760,
    downloads: 480,
  },
  {
    name: "Phương pháp biên tập video chuyên nghiệp với Dove",
    description:
      "Hướng dẫn KOC cách chỉnh sửa video chuyên nghiệp với sản phẩm Dove, từ chỉnh màu, cắt ghép cho đến chèn âm thanh phù hợp.",
    duration: "1 giờ",
    likes: 1350,
    downloads: 980,
  },
  {
    name: "Nội dung ngắn nhưng hiệu quả với Sunsilk",
    description:
      "Chiến lược tạo nội dung ngắn gọn, phù hợp với các nền tảng như TikTok, Reels và Shorts, sử dụng sản phẩm Sunsilk làm ví dụ thực tế.",
    duration: "20 phút",
    likes: 1400,
    downloads: 1120,
  },
  {
    name: "Tăng doanh số bán hàng với kịch bản quảng cáo Lifebuoy",
    description:
      "Hướng dẫn cách xây dựng kịch bản quảng cáo sáng tạo và chốt đơn hàng cho sản phẩm Lifebuoy trên các nền tảng trực tuyến.",
    duration: "50 phút",
    likes: 1700,
    downloads: 1400,
  },
  {
    name: "Hướng dẫn live stream bán hàng sản phẩm của Unilever",
    description:
      "Hướng dẫn KOC cách lên kịch bản, dàn dựng, và cách tạo điểm nhấn trong các buổi live stream bán hàng sử dụng sản phẩm của Unilever.",
    duration: "1 giờ 10 phút",
    likes: 2500,
    downloads: 1750,
  },
  {
    name: "Phân tích hành vi khách hàng và nội dung phù hợp",
    description:
      "Khóa học chuyên sâu giúp KOC hiểu hành vi khách hàng và tối ưu hóa nội dung quảng bá sản phẩm của Unilever để tăng tỷ lệ chuyển đổi.",
    duration: "2 giờ",
    likes: 1800,
    downloads: 1500,
  },
];

const BrandInspiration2 = () => {
  const { videos } = useContentContext();

  const [hideCompleted, setHideCompleted] = useState(false);
  const [cursor, hideCursor] = useState(true);

  const [text] = useTypewriter({
    words: ["Education, talents, and career opportunities. All in one place."],
    typeSpeed: 20,
    loop: 1,
    onLoopDone: () => hideCursor(false),
  });

  return (
    <div className="flex flex-col gap-8 px-8 pb-20">
      <div className="flex w-full justify-center bg-white">
        <div className="flex w-fit flex-col items-center gap-4 py-12">
          <p className="size-[60%] text-center text-3xl">
            {text}
            {cursor && <Cursor />}
          </p>
          <p className="size-[75%] text-center text-grays">
            Grow your skill with the most reliable online courses and
            certifications in marketing, information technology, programming,
            and data science.
          </p>
          <Input
            value={""}
            className="!rounded-md"
            classContainer="w-[40%] min-w-[200px"
            icon={<IoSearchOutline />}
            placeholder="Tìm nhãn hiệu của bạn"
            onChange={(e: any) => {}}
          />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BsStars className="font-semibold text-secondary" />
          <p className="font-semibold text-secondary">Tìm hiểu sản phẩm </p>
          <Tooltip
            title="Các thông tin về nhãn hàng/ sản phẩm bạn cần biết"
            arrow
          >
            <LiaQuestionCircleSolid className="text-grays/50" />
          </Tooltip>
        </div>
        <div className="flex items-center gap-4">
          <DropdownV2
            value="Tất cả khoá học"
            onSelected={() => {}}
            className="!z-[1] !h-7"
          >
            <DropdownItem title="Tất cả khoá học" />
          </DropdownV2>
          <div className="flex items-center">
            <Switch
              checked={hideCompleted}
              onChange={() => {
                setHideCompleted(!hideCompleted);
              }}
              inputProps={{ "aria-label": "iOS style switch" }}
            />
            <p>Ẩn khoá học đã hoàn thành</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {courses.slice(0, 6).map((_, index) => {
          return <VideoAcheCard course={_} key={index} />;
        })}
      </div>

      <div className="grid w-full place-items-center">
        <Pagination count={6} />
      </div>

      <div className="mt-20 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BsStars className="font-semibold text-secondary" />
          <p className="font-semibold text-secondary">
            Ý tưởng review sản phẩm
          </p>
          <Tooltip
            title="Lợi ích & Tính năng nổi bật của sản phẩm; Ý tưởng review sản phẩm"
            arrow
          >
            <LiaQuestionCircleSolid className="text-grays/50" />
          </Tooltip>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {courses.slice(4, 10).map((_, index) => {
          return <VideoAcheCard course={_} key={index} />;
        })}
      </div>
      <div className="grid w-full place-items-center">
        <Pagination count={6} />
      </div>
      <div className="flex gap-8 max-lg:flex-col">
        <div className="flex items-center gap-4 rounded-md bg-primary/10 p-4">
          <div className="flex flex-1 flex-col justify-between gap-4">
            <p className="font-bold text-primary">Earn a Certificate</p>
            <p className="text-sm">
              Get the right professional certificate program for you.
            </p>
            <Button title="View program" />
          </div>
          <Image
            width={100}
            height={100}
            src={""}
            alt=""
            className="aspect-[3/2] w-[180px] rounded-md"
          />
        </div>
        <div className="flex items-center gap-4 rounded-md bg-red/10 p-4">
          <div className="flex flex-1 flex-col justify-between gap-4">
            <p className="font-bold text-red">Best Rated Courses</p>
            <p className="text-sm">
              Enroll now in the most popular and best rated courses.
            </p>
            <Button
              title="View program"
              className="bg-red/80 hover:bg-red/65"
            />
          </div>
          <Image
            width={100}
            height={100}
            src={""}
            alt=""
            className="aspect-[3/2] w-[180px] rounded-md"
          />
        </div>
      </div>
    </div>
  );
};

export default BrandInspiration2;
