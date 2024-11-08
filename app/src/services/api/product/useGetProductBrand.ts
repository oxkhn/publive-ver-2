import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export const useGetProductBrand = () => {
  return useMutation({
    mutationKey: ["GET_BRAND"],
    mutationFn: async () => {
      try {
        const res = await axios.get("/api/product/brand");
        return res.data;
      } catch (error) {
        console.log(error);
      }
    },
  });
};
