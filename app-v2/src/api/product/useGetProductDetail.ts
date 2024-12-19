import { useMutation } from "@tanstack/react-query";
import { axiosWithoutAccessToken } from "../../../axiosConfig/axiosConfig";

export const useGetProductDetail = () => {
  return useMutation({
    mutationKey: ["PRODUCT_DETAIL"],
    mutationFn: async (sku: string) => {
      const res = await axiosWithoutAccessToken.get("/product/" + sku);
      return res.data.data;
    },
  });
};
