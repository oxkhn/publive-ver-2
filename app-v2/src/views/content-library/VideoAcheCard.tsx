import Image from "next/image";
import ImageDemo from "@/assets/images/demo.jpg";
import { GrView } from "react-icons/gr";
import { FcLike } from "react-icons/fc";
import Button from "@/packages/@ui-kit/Button2";

type CourseType = {
  name: string; // Tên của khóa học
  description: string; // Mô tả ngắn gọn của khóa học
  duration: string; // Thời lượng của khóa học (ví dụ: "45 phút", "1 giờ")
  likes: number; // Số lượt thích của khóa học
  downloads: number; // Số lượt tải của khóa học
};

type Props = {
  course: CourseType;
};
const VideoAcheCard = (props: Props) => {
  return (
    <div className="flex cursor-pointer flex-col gap-3 rounded-md border bg-white p-4 hover:shadow-md transition-all">
      <div>
        <Image
          src={ImageDemo}
          alt=""
          className="h-[150px] rounded object-cover"
        />
      </div>

      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="rounded bg-fuchsia-200 px-2 py-1 text-xs">
            Chăm sóc sắc đẹp
          </div>
          <div className="rounded bg-blue-300 px-2 py-1 text-xs">Dove</div>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <div className="flex items-center gap-1">
            <GrView className="text-primary" />
            <p className="text-grays/50">100</p>
          </div>
          <div className="flex items-center gap-1">
            <FcLike className="text-primary" />
            <p className="text-grays/50">200</p>
          </div>
        </div>
      </div>

      <div>
        <p className="line-clamp-1 font-semibold">{props.course.name}</p>
        <p className="mt-1 text-xs">{props.course.description}</p>
      </div>

      <Button
        onClick={() => {}}
        title="Bắt đầu khoá học"
        className="mt-auto w-full"
      />
    </div>
  );
};

export default VideoAcheCard;
