import { useMutation } from "@tanstack/react-query";
import { axiosWithAccessToken } from "../../../axiosConfig/axiosConfig";

export const useGetProfile = () => {
  return useMutation({
    mutationKey: ["GET_PROFILE"],
    mutationFn: async () => {
      const response = await axiosWithAccessToken.get("/auth/profile")
      return response.data;
    },
  });
};
