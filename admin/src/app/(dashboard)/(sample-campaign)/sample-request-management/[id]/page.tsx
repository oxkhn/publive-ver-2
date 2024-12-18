// Next Imports
import { redirect } from 'next/navigation'

// Type Imports
import type { InvoiceType } from '@/types/apps/invoiceTypes'

// Component Imports

// Data Imports
import Preview from '@/views/app/(sample-campaign)/sample-request-management/preview'
import { useFormSampleContext } from '@/services/provider/FormProvider'

const PreviewPage = () => {
    const { formDetail } = useFormSampleContext()

    return <Preview invoiceData={formDetail} />
}

export default PreviewPage
