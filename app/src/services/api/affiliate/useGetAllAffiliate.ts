import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export const useGetAllAffiliate = () => {
  return useMutation({
    mutationKey: ["AFFILIATE_ALL"],
    mutationFn: async (body: any) => {
      const res = await axios.post("/api/affiliate", body);

      return res.data;
    },
  });
};
