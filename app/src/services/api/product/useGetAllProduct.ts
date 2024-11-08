import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export const useGetAllProduct = () => {
  return useMutation({
    mutationKey: ["ALL_PRODUCT"],
    mutationFn: async (body: any) => {
      try {
        const res = await axios.post("/api/product", body);

        return res.data;
      } catch (error) {}
    },
  });
};
