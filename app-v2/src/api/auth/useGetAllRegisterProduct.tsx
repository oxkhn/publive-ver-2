import { useMutation } from "@tanstack/react-query";
import { axiosWithAccessToken } from "../../../axiosConfig/axiosConfig";

const useGetAllRegisterProduct = () => {
  return useMutation({
    mutationKey: ["GET_ALL_REGISTER_PRODUCT"],
    mutationFn: async () => {
      const res = await axiosWithAccessToken.get("/form-register/user");
      return res.data;
    },
  });
};

export default useGetAllRegisterProduct;
