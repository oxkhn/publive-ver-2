import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export const useGetAllAffiliate = () => {
  return useMutation({
    mutationKey: ["AFFILIATE_ALL"],
    mutationFn: async (campaignId: string) => {
      const path = "/api2/campaign/" + campaignId + "/affiliate";

      const res = await axios.post(path);

      return res.data;
    },
  });
};
