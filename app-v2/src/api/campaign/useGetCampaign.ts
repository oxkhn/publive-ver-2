import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export const useGetCampaign = () => {
  return useMutation({
    mutationKey: ["GET_CAMPAIGN"],
    mutationFn: async (campaignId: string) => {
      const res = await axios.get("/api/campaign/" + campaignId);
      return res.data.data;
    },
  });
};
