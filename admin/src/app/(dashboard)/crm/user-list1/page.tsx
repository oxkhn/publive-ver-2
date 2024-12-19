'use server'

import { CrmProvider } from '@/services/provider/CrmProvider'
import UserList1 from '@/views/app/user/list1'
import { Breadcrumbs, Grid, Link, Typography } from '@mui/material'

const UserPage1 = async () => {
    return (
        <CrmProvider>
            <Breadcrumbs aria-label='breadcrumb' className='mb-2'>
                <Link underline='hover' color='inherit' href='/'>
                    Home
                </Link>
                <Typography sx={{ color: 'text.primary' }}>CRM Management</Typography>
            </Breadcrumbs>
            <Grid className='mt-4'>
                <UserList1 />
            </Grid>
        </CrmProvider>
    )
}

export default UserPage1
