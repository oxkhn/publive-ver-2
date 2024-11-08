import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export const useGetProfile = () => {
  return useMutation({
    mutationKey: ["GET_PROFILE"],
    mutationFn: async (token: string) => {
      const response = await axios.get("/api/auth/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    },
  });
};
