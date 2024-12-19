import { useMutation } from "@tanstack/react-query";
import { axiosWithAccessToken } from "../../../axiosConfig/axiosConfig";

export const usePostTracking = () => {
  return useMutation({
    mutationKey: ["POST_TRACKING"],
    mutationFn: async (body: any) => {
      const res = await axiosWithAccessToken.post("/tracking", body);

      return res.data.data;
    },
  });
};
