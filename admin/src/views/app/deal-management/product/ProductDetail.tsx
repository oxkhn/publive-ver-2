'use client'

import CustomTextField from '@/@core/components/mui/TextField'
import EditorBasic from '@/components/Editer'
import { Box, Button, Card, Grid, Typography } from '@mui/material'
import Image from 'next/image'
import { useState } from 'react'

const ProductDetail = () => {
    return (
        <Grid container spacing={6}>
            <Grid item>
                <CustomTextField label='Product Name' fullWidth></CustomTextField>
            </Grid>
            <Grid item sm={12} spacing={4}>
                <Typography className='text-sm'>Description</Typography>

                <EditorBasic onContentChange={() => {}} />
            </Grid>
        </Grid>
    )
}

export default ProductDetail
