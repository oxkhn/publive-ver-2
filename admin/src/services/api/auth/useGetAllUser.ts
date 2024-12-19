import { useMutation } from "@tanstack/react-query"
import axios from "axios"

export const useGetAllUser = () => {
    return useMutation({
        mutationKey: ["GET_ALL_USER"],
        mutationFn: async () => {
            const res = await axios.post(process.env.NEXT_PUBLIC_API_HOST + "/auth/get-all")  
            return res.data
        }
    })
}
