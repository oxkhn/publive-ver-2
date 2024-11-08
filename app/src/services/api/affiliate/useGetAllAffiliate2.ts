import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export const useGetAllAffiliate2 = () => {
  return useMutation({
    mutationKey: ["AFFILIATE_ALL_2"],
    mutationFn: async () => {
      const path = "/api/campaign/affiliate/all";

      const res = await axios.post(path);

      return res.data;
    },
  });
};
