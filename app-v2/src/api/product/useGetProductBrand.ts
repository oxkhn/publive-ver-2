import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { axiosWithoutAccessToken } from "../../../axiosConfig/axiosConfig";

const useGetProductBrand = () => {
  return useMutation({
    mutationKey: ["GET_PRODUCT_BRAND"],
    mutationFn: async () => {
      const res = await axiosWithoutAccessToken.get("/product/brand");
      return res.data.data;
    },
  });
};

export default useGetProductBrand;
