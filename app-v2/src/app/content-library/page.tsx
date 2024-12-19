import Filter from "@/views/content-library/Filter";
import { ContentProvider } from "@/services/ContentProvider";

const ContentLibraryPage = () => {
  return (
    <div className="max-w-app relative flex flex-col gap-8 pt-16">
      <Filter />
    </div>
  );
};

export default ContentLibraryPage;
