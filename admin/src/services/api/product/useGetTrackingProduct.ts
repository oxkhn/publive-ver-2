import { useMutation } from "@tanstack/react-query"
import axios from "axios"

export const useGetTrackingProducts = () => {
    return useMutation({
        mutationKey: ["GET_TRACKING_PRODUCTS"],
        mutationFn: async () => {
            const res = await axios.get( process.env.NEXT_PUBLIC_API_HOST + "/tracking/product")
            console.log(res.data);
            
            return res.data;
        }
    })
}