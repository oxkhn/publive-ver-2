import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export const useGetAllVideo = () => {
  return useMutation({
    mutationKey: ["ALL_VIDEO"],
    mutationFn: async (body: any) => {
      try {
        const res = await axios.post("/api/tiktok", body);

        return res.data;
      } catch (error) {}
    },
  });
};
