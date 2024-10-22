import { ResponseType } from '@/types/response.type'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

export const usePostCreateCampaign = () => {
    return useMutation({
        mutationKey: ['CREATE_CAMPAIGN'],
        mutationFn: async (body: any) => {
            const path = '/api/campaign'
            const res = await axios.post(path, body)

            return res.data as ResponseType<string>
        }
    })
}
