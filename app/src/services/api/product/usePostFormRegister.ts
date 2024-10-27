import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export const usePostFormRegister = () => {
  return useMutation({
    mutationKey: ["CREATE_FORM"],
    mutationFn: async (body: any) => {
      const res = await axios.post("/api/form", body);

      return res.data;
    },
  });
};
