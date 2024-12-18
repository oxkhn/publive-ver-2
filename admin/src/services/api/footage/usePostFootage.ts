import { ResponseType } from '@/types/response.type'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

export const usePostFootage = () => {
    return useMutation({
        mutationKey: ['CREATE_FOOTAGE'],
        mutationFn: async (body: any) => {
            const path = '/api/footage/create-or-update'
            const res = await axios.post(path, body)

            return res.data
        }
    })
}
