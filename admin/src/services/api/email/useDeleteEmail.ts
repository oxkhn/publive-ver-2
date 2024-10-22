import { ResponseType } from '@/types/response.type'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

export const useDeleteEmail = () => {
    return useMutation({
        mutationKey: ['DELETE_EMAIL'],
        mutationFn: async (id: string) => {
            const path = '/api/email/' + id
            const res = await axios.delete(path)

            return res.data as ResponseType<string>
        }
    })
}
