import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

export const useGetFormDetail = () => {
    return useMutation({
        mutationKey: ['GET_ALL_FORM_SAMPLE'],
        mutationFn: async (id: string) => {
            const path = '/api/form-register/' + id
            const res = await axios.get(path)
            return res.data
        }
    })
}
