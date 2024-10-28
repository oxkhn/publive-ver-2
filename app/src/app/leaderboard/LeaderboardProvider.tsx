"use client";
import { useGetAllAffiliate } from "@/services/api/affiliate/useGetAllAffiliate";
import { useGetAllAffiliate2 } from "@/services/api/affiliate/useGetAllAffiliate2";
import { useGetAllVideo } from "@/services/api/video/useGetAllVideo";
import { AffiliateType } from "@/types/affiliate.type";
import {
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";

interface LeaderBoardContextProps {
  affiliates: AffiliateType[];
  setName: any;
  name: string;
  setChanelFilter: any;
  chanelFilter: any;
  random: any;
}

const ContentVideoContext = createContext<LeaderBoardContextProps | undefined>(
  undefined,
);

export const LeaderboardProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [affiliates, setAffiliates] = useState<AffiliateType[]>([]);
  const _getAllAffiliate = useGetAllAffiliate2();
  const [chanelFilter, setChanelFilter] = useState();

  const [name, setName] = useState("");

  const handleGetData = async () => {
    try {
      const body = {
        limit: 100,
        page: 1,
        fb: chanelFilter == 4,
        tiktok: chanelFilter == 3,
        shopee: chanelFilter == 1,
        youtube: chanelFilter == 2,
      };

      const res = await _getAllAffiliate.mutateAsync();
      const arr = res.data;

      setAffiliates(arr);
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
  }, [name]);

  const shuffleArray = (arr) => {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]]; // Swap elements
    }
    return arr;
  };

  useEffect(() => {
    handleGetData();
  }, [chanelFilter]);

  const random = () => {
    const arr = shuffleArray(affiliates);
    console.log(arr);
    setAffiliates([...arr]);
  };

  const value = {
    affiliates,
    name,
    setName,
    chanelFilter,
    random,
    setChanelFilter,
  };

  return (
    <ContentVideoContext.Provider value={value}>
      {children}
    </ContentVideoContext.Provider>
  );
};

export const useLeaderboardContext = () => {
  const context = useContext(ContentVideoContext);

  if (context === undefined) {
    throw new Error(
      "useCreateContext must be used within an CreateProductProvider",
    );
  }

  return context;
};
