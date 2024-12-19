import { RegisterDTO } from "@/services/AuthProvider";
import { useMutation } from "@tanstack/react-query";
import { axiosWithoutAccessToken } from "../../../axiosConfig/axiosConfig";

export const usePostRegister = () => {
  return useMutation({
    mutationKey: ["POST_REGISTER"],
    mutationFn: async (registerDTO: RegisterDTO) => {
      const response = await axiosWithoutAccessToken.post("/auth/register", registerDTO);
      return response.data;
    },
  });
};
