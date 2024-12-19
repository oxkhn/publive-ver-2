import { Data } from "./../../../../admin/src/types/pages/profileTypes";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export const useGetProductDetail = () => {
  return useMutation({
    mutationKey: ["PRODUCT_DETAIL"],
    mutationFn: async (sku: string) => {
      const res = await axios.get("/api/product/" + sku);
      return res.data.data;
    },
  });
};
