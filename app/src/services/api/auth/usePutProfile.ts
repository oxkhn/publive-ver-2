import { RegisterDTO } from "@/services/provider/AuthProvider";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export const usePutProfile = () => {
  return useMutation({
    mutationKey: ["PUT_PROFILE"],
    mutationFn: async (body: { token: string; data: any }) => {
      const response = await axios.put("/api/user", body.data, {
        headers: {
          Authorization: `Bearer ${body.token}`,
        },
      });

      return response.data;
    },
  });
};
