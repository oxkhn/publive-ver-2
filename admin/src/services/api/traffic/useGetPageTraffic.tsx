import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

export const useGetPageTraffic = () => {
    return useMutation({
        mutationKey: ['GET_PAGE_TRAFFIC'],
        mutationFn: async () => {
            const res = await axios.get(process.env.NEXT_PUBLIC_API_HOST + '/tracking/page')
            console.log(res.data)

            return res.data
        }
    })
}
