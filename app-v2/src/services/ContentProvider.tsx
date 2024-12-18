"use client";

import useGetProductBrand from "@/api/product/useGetProductBrand";
import useGetAllVideoTiktok from "@/api/video/useGetAllVideoTiktok";
import { ITiktokVideo } from "@/types/tiktok.type";
import { createContext, useContext, useEffect, useState } from "react";

export type FilterTiktokState = {
  limit: number;
  page: number;
  createAt: number;
  title: string;
  hashtags: string[];
};

export type BrandState = {
  bu: string;
  brand: string[];
};

type ContentContextProps = {
  videos: ITiktokVideo[];
  filterTiktok: FilterTiktokState;
  updateFilterTiktok: <K extends keyof FilterTiktokState>(
    key: K,
    value: FilterTiktokState[K],
  ) => void;
  brands: BrandState[];
};

type Props = {
  children: React.ReactNode;
};

const ContentContext = createContext<ContentContextProps | undefined>(
  undefined,
);

export const ContentProvider = (props: Props) => {
  const [videos, setVideos] = useState<ITiktokVideo[]>([]);
  const [brands, setBrands] = useState<BrandState[]>([]);
  const [filterTiktok, setFilterTiktok] = useState<FilterTiktokState>({
    limit: 50,
    page: 1,
    createAt: 0,
    title: "",
    hashtags: [],
  });

  const updateFilterTiktok = <K extends keyof FilterTiktokState>(
    key: K,
    value: FilterTiktokState[K],
  ) => {
    setFilterTiktok((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const _getAllVideo = useGetAllVideoTiktok();
  const getAllVideoTiktok = async () => {
    try {
      const body = filterTiktok;
      const res = await _getAllVideo.mutateAsync(body);

      setVideos(res);
    } catch (error) {
      console.log(error);
    }
  };

  const _getBrands = useGetProductBrand();
  const getBrands = async () => {
    try {
      const res = await _getBrands.mutateAsync();
      setBrands(res);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllVideoTiktok();
  }, [filterTiktok]);

  useEffect(() => {
    getBrands();
  }, []);

  const value = {
    videos,
    filterTiktok,
    brands,
    updateFilterTiktok,
  };

  return (
    <ContentContext.Provider value={value}>
      {props.children}
    </ContentContext.Provider>
  );
};

export const useContentContext = () => {
  const context = useContext(ContentContext);
  if (context === undefined) {
    throw new Error("useContentContext must be used within a ContentProvider");
  }
  return context;
};
