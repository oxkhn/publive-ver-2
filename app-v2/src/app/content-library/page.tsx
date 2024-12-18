import Filter from "@/views/content-library/Filter";
import ImageBanner from "@/assets/images/banner_trending.png";
import Image from "next/image";
import { ContentProvider } from "@/services/ContentProvider";
import TrendingList from "@/views/content-library/TrendingList";

const ContentLibraryPage = () => {
  return (
    <div className="max-w-app relative flex flex-col gap-8 pt-16">
      <ContentProvider>
        <Filter />
      </ContentProvider>
    </div>
  );
};

export default ContentLibraryPage;
