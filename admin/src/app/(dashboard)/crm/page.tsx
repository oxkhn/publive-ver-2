'use server'

import { CrmProvider } from '@/services/provider/CrmProvider'
import UserList from '@/views/app/user/list'
import { Breadcrumbs, Grid, Link, Typography } from '@mui/material'

const UserPage = async () => {
    return (
        <CrmProvider>
            <Breadcrumbs aria-label='breadcrumb' className='mb-2'>
                <Link underline='hover' color='inherit' href='/'>
                    Home
                </Link>
                <Typography sx={{ color: 'text.primary' }}>CRM Management</Typography>
            </Breadcrumbs>
            <Grid className='mt-4'>
                <UserList />
            </Grid>
        </CrmProvider>
    )
}

export default UserPage
