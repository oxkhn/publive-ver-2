import FullCourse from "@/views/content-library/course-detail/FullCourse";
import Lesson from "@/views/content-library/course-detail/Lesson";

const CourseDetail = () => {
  return (
    <div className="max-w-app relative flex gap-4 pb-20 pt-16 max-lg:flex-col">
      <Lesson />
      <FullCourse />
    </div>
  );
};

export default CourseDetail;
