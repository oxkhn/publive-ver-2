import { useMutation } from "@tanstack/react-query";
import { axiosWithoutAccessToken } from "../../../axiosConfig/axiosConfig";

export const usePostLogin = () => {
  return useMutation({
    mutationKey: ["POST_LOGIN"],
    mutationFn: async (body: { email: string; password: string }) => {
      const response = await axiosWithoutAccessToken.post("/auth/login", body);
      return response.data;
    },
  });
};
