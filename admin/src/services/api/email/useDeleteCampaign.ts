import { ResponseType } from '@/types/response.type'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

export const useDeleteCampaign = () => {
    return useMutation({
        mutationKey: ['DELETE_CAMPAIGN'],
        mutationFn: async (id: string) => {
            const path = '/api/email/campaign/' + id
            const res = await axios.delete(path)

            return res.data as ResponseType<string>
        }
    })
}
