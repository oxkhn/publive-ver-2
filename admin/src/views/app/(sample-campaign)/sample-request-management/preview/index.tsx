'use client'

// MUI Imports
import Grid from '@mui/material/Grid'

// Type Imports
import type { InvoiceType } from '@/types/apps/invoiceTypes'

// Component Imports
import PreviewActions from './PreviewActions'
import PreviewCard from './PreviewCard'
import { FormRegisterAffiliateTypeWithProduct } from '@/types/formSample.type'

const Preview = ({ invoiceData }: { invoiceData?: FormRegisterAffiliateTypeWithProduct }) => {
    // Handle Print Button Click
    const handleButtonClick = () => {
        window.print()
    }

    return (
        <Grid container spacing={6}>
            <Grid item xs={12} md={9}>
                <PreviewCard invoiceData={invoiceData} />
            </Grid>
            <Grid item xs={12} md={3}>
                <PreviewActions onButtonClick={handleButtonClick} />
            </Grid>
        </Grid>
    )
}

export default Preview
