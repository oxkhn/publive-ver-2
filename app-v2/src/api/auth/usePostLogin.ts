import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export const usePostLogin = () => {
  return useMutation({
    mutationKey: ["POST_LOGIN"],
    mutationFn: async (body: { email: string; password: string }) => {
      const response = await axios.post("/api/auth/login", body);
      return response.data;
    },
  });
};
