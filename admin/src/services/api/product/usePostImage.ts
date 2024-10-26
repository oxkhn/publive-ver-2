import { ResponseType } from '@/types/response.type'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

export const usePostImage = () => {
    return useMutation({
        mutationKey: ['CREATE_PRODUCT_IMAGE'],
        mutationFn: async (body: any) => {
            const path = '/api/upload-s3/image'
            const res = await axios.post(path, body)

            return res.data as ResponseType<string>
        }
    })
}
