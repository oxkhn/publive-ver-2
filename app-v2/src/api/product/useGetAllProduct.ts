import { useMutation } from "@tanstack/react-query";
import { axiosWithoutAccessToken } from "../../../axiosConfig/axiosConfig";

const useGetAllProduct = () => {
  return useMutation({
    mutationKey: ["GET_ALL_PRODUCT"],
    mutationFn: async (body: any) => {
      const res = await axiosWithoutAccessToken.post("/product/", body);

      return res.data;
    },
  });
};

export default useGetAllProduct;
