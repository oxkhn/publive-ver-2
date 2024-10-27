"use client";

import Filter from "./Filter";
import Infor from "./Infor";
import VideoList from "./VideoList";
import { VideoTiktokType } from "@/types/tiktok.type";
import { useGetAllVideo } from "@/services/api/video/useGetAllVideo";
import ImageKit from "@/packages/@ui-kit/Image";
import { useEffect, useState } from "react";
import Banner from "@/assets/images/banner_trending.png";
import {
  ContentVideoProvider,
  useContentVideoContext,
} from "./ContentVideoProvider";

const ContentLibraryPage = () => {
  return (
    <main className="relative mx-auto flex min-h-screen max-w-[1440px] flex-col gap-4 px-20 pb-20 pt-6 max-md:px-4">
      <ContentVideoProvider>
        <div className="relative w-full rounded-lg pt-[130px] shadow-card">
          <div className="absolute left-0 right-0 top-0 -z-10">
            <ImageKit src={Banner} className="h-[152px] w-full rounded-t-lg" />
          </div>
        </div>
        <div className="sticky top-20 z-10">
          <Filter />
        </div>

        <VideoList />
      </ContentVideoProvider>
    </main>
  );
};

export default ContentLibraryPage;
