"use client";
import { useGetAllCampaign } from "@/api/campaign/useGetAllCampaign";
import { CampaignTypeWithId } from "@/types/campaign.type";
import { createContext, useContext, useEffect, useState } from "react";

type CampaignContextProps = {
  campaigns: CampaignTypeWithId[];
};

const CampaignContext = createContext<CampaignContextProps | undefined>(
  undefined,
);

type Props = {
  children: React.ReactNode;
};

export const CampaignProvider = (props: Props) => {
  const [campaigns, setCampaigns] = useState<CampaignTypeWithId[]>([]);
  const [filterValue, setFilterValue] = useState({
    name: "",
    type: 0,
    bu: "",
    cat: "",
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

  useEffect(() => {
    getAllCampaign();
  }, []);

  const value = { campaigns };

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
