export type ResponseType<T> = {
    statusCode: number
    data: T
    message: string
}