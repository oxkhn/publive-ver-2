'use server'

import { db as userData } from '@/data/userList'
import UserList from '@/views/app/user/list'

export const getUserData = async () => {
    return userData
}

const UserPage =async () => {
    const data = await getUserData()

    return <UserList userData={data} />
}

export default UserPage
