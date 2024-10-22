import { ResponseType } from '@/types/response.type'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

export const usePostPreformanceAffiliate = () => {
    return useMutation({
        mutationKey: ['CREATE_AFFILIATE_CSV'],
        mutationFn: async (body: any) => {
            const path = '/api/campaign/upload-performance'
            const res = await axios.post(path, body)

            return res.data as ResponseType<string>
        }
    })
}
