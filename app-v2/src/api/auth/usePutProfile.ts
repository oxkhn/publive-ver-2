import { useMutation } from "@tanstack/react-query";
import { axiosWithAccessToken } from "../../../axiosConfig/axiosConfig";

export const usePutProfile = () => {
  return useMutation({
    mutationKey: ["PUT_PROFILE"],
    mutationFn: async (body: { token: string; data: any }) => {
      const response = await axiosWithAccessToken.put("/auth", body.data);

      return response.data;
    },
  });
};