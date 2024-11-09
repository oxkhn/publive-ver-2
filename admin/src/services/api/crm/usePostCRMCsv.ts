import { ResponseType } from '@/types/response.type'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

export const usePostCRMCsv = () => {
    return useMutation({
        mutationKey: ['CREATE_USER_CRM_CSV'],
        mutationFn: async (body: any) => {
            const path = '/api/crm/upload'
            const res = await axios.post(path, body)

            return res.data
        }
    })
}
