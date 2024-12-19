import { useMutation } from "@tanstack/react-query";
import { axiosWithAccessToken } from "../../../axiosConfig/axiosConfig";
import { registerProductDTO } from "@/services/RegisterProductProvider";

const usePostRegisterProduct = () => {
  return useMutation({
    mutationKey: ["POST_REGISTER_PRODUCT"],
    mutationFn: async (body: registerProductDTO) => {
      const res = await axiosWithAccessToken.post("/form-register/", body);

      return res.data;
    },
  });
};

export default usePostRegisterProduct;
