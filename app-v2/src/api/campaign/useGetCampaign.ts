import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { axiosWithoutAccessToken } from "../../../axiosConfig/axiosConfig";

export const useGetCampaign = () => {
  return useMutation({
    mutationKey: ["GET_CAMPAIGN"],
    mutationFn: async (campaignId: string) => {
      const res = await axiosWithoutAccessToken.get("/api/campaign/" + campaignId);
      return res.data.data;
    },
  });
};
