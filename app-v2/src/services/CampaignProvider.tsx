"use client";
import { useGetAllCampaign } from "@/api/campaign/useGetAllCampaign";
import { useGetCampaign } from "@/api/campaign/useGetCampaign";
import { CampaignTypeWithId } from "@/types/campaign.type";
import { createContext, useContext, useEffect, useState } from "react";

export const ActiveEnum = {
  ALL: 0,
  ACTIVE: 1,
  INACTIVE: 2,
};

interface FilterCampaignType {
  name: string;
  type: number;
  bu: string;
  cat: string;
  startDate: string;
  endDate: string;
  status: number;
}

type CampaignContextProps = {
  campaigns: CampaignTypeWithId[];
  campaignDetail: CampaignTypeWithId | undefined;
  getCampaign: (campaignId: string) => void;

  filterValue: FilterCampaignType;
  handleFilterChange: (value: any, name: keyof CampaignTypeWithId) => void;
};

const CampaignContext = createContext<CampaignContextProps | undefined>(
  undefined,
);

type Props = {
  children: React.ReactNode;
};

export const CampaignProvider = (props: Props) => {
  const [campaigns, setCampaigns] = useState<CampaignTypeWithId[]>([]);
  const [campaignDetail, setCampaignDetail] = useState<CampaignTypeWithId>();
  const [filterValue, setFilterValue] = useState<FilterCampaignType>({
    name: "",
    type: 0,
    bu: "",
    cat: "",
    startDate: "",
    endDate: "",
    status: 0,
  });

  const handleFilterChange = (value: any, name: keyof CampaignTypeWithId) => {
    setFilterValue((prevData) => {
      const updatedData = {
        ...prevData,
        [name]: value,
      };

      return updatedData;
    });
  };

  const _getALlCampaign = useGetAllCampaign();
  const getAllCampaign = async () => {
    try {
      const body = {
        name: filterValue.name,
        type: filterValue.type,
      };
      const res = await _getALlCampaign.mutateAsync(body);
      setCampaigns(res.data);
    } catch (error) {}
  };

  const _getCampaign = useGetCampaign();
  const getCampaign = async (campaignId: string) => {
    try {
      const res = await _getCampaign.mutateAsync(campaignId);
      console.log(res);
      setCampaignDetail(res);
    } catch (error) {}
  };

  useEffect(() => {
    getAllCampaign();
  }, [filterValue]);

  const value = {
    campaigns,
    campaignDetail,
    getCampaign,

    filterValue,
    handleFilterChange,
  };

  return (
    <CampaignContext.Provider value={value}>
      {props.children}
    </CampaignContext.Provider>
  );
};

export const useCampaignContext = () => {
  const context = useContext(CampaignContext);
  if (context === undefined) {
    throw new Error("useCampaignContext must be used within a CampaignContext");
  }
  return context;
};
