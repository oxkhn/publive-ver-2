"use client";
import { useGetAllVideo } from "@/services/api/video/useGetAllVideo";
import { VideoTiktokType } from "@/types/tiktok.type";
import {
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";

interface ContectVideoProps {
  videos: VideoTiktokType[];
  setName: any;
  name: string;
  setFilterDateActive: any;
  filterDateActive: any;
  category: string;
  setCategory: any;
}

const ContentVideoContext = createContext<ContectVideoProps | undefined>(
  undefined,
);

const filterDate = [
  {
    value: 0,
    title: "Tất cả",
  },
  {
    value: 1,
    title: "7 ngày qua",
  },
  {
    value: 2,
    title: "30 ngày qua",
  },
  {
    value: 3,
    title: "6 tháng qua",
  },
];

export const ContentVideoProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [videos, setVideos] = useState<VideoTiktokType[]>([]);

  const _getAllVideo = useGetAllVideo();

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  // const [time, setTime] = useState(
  //   Math.floor(Date.now() / 1000) - 300 * 24 * 3600,
  // );

  const [filterDateActive, setFilterDateActive] = useState(filterDate[0]);

  const handleGetData = async () => {
    try {
      const body = {
        limit: 100,
        page: 1,
        name: name + " " + (category == "Tất cả" ? "" : category),
        createAt: filterDateActive.value,
      };
      const res = await _getAllVideo.mutateAsync(body);
      const arr = res.data;

      setVideos(arr);
    } catch (error) {}
  };

  useLayoutEffect(() => {
    // Sử dụng debounce: chỉ thực hiện call API sau 500ms từ lần nhập cuối
    const delayDebounceFn = setTimeout(() => {
      //   if (name) {
      handleGetData();
      //   }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [name, filterDateActive, category]);

  useEffect(() => {
    handleGetData();
  }, []);

  const value = {
    videos,
    name,
    setName,
    setFilterDateActive,
    filterDateActive,
    category,
    setCategory,
  };

  return (
    <ContentVideoContext.Provider value={value}>
      {children}
    </ContentVideoContext.Provider>
  );
};

export const useContentVideoContext = () => {
  const context = useContext(ContentVideoContext);

  if (context === undefined) {
    throw new Error(
      "useCreateContext must be used within an CreateProductProvider",
    );
  }

  return context;
};
