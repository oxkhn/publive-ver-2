export type FootageType = {
    userId: string
    title: string
    description: string
    tags: string[]
    fileUrl: string
    thumbnailUrl: string
    status: 'pending' | 'approved' | 'rejected'
    views: number
    likes: number
    bu: string
    cat: string
    brand: string
}

export type FootageTypeWithId = FootageType & { _id: string }
