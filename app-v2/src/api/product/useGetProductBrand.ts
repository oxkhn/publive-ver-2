import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const useGetProductBrand = () => {
  return useMutation({
    mutationKey: ["GET_PRODUCT_BRAND"],
    mutationFn: async () => {
      const res = await axios.get("/api/product/brand");
      return res.data.data;
    },
  });
};

export default useGetProductBrand;
