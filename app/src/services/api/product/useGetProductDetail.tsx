import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export const useGetProductDetail = () => {
  return useMutation({
    mutationKey: ["product"],
    mutationFn: async (productId: string) => {
      const res = await axios.get(`/api/product/${productId}`);
      return res.data;
    },
    retry: 0,
  });
};
