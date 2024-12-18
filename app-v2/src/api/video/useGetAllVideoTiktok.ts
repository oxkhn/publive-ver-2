import { ITiktokVideo } from "@/types/tiktok.type";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const useGetAllVideoTiktok = () => {
  return useMutation({
    mutationKey: ["GET_ALL_VIDEO"],
    mutationFn: async (body: any) => {
      const path = "/api/tiktok/";
      const res = await axios.post(path, body);

      return res.data.data as ITiktokVideo[];
    },
  });
};

export default useGetAllVideoTiktok;
