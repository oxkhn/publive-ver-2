import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export const useGetCampaignDetail = () => {
  return useMutation({
    mutationKey: ["GET_CAMPAIGN"],
    mutationFn: async (id: string) => {
      const response = await axios.get("/api/campaign/" + id);
      return response.data;
    },
  });
};
