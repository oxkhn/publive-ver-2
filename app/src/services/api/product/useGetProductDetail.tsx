import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export const useGetProductDetail = () => {
  return useMutation({
    mutationKey: ["product"],
    mutationFn: async (sku: string) => {
      const res = await axios.get(`/api2/product/${sku}`);
      return res.data;
    },
    retry: 0,
  });
};
