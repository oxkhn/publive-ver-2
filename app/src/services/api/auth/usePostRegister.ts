import { RegisterDTO } from "@/services/provider/AuthProvider";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export const usePostRegister = () => {
  return useMutation({
    mutationKey: ["POST_REGISTER"],
    mutationFn: async (registerDTO: RegisterDTO) => {
      const response = await axios.post("/api/user/register", registerDTO);
      return response.data;
    },
  });
};
