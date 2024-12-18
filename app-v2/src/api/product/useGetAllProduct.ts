import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const useGetAllProduct = () => {
  return useMutation({
    mutationKey: ["GET_ALL_PRODUCT"],
    mutationFn: async (body: any) => {
      const path = "/api/product/";
      const res = await axios.post(path, body.data);

      return res.data;
    },
  });
};

export default useGetAllProduct;
