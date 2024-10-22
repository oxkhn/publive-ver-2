'use client'
import CustomTextField from '@/@core/components/mui/TextField'
import { useFormSampleContext } from '@/services/provider/FormProvider'
import { Button, Card, CardContent, CardHeader, Grid, Typography } from '@mui/material'
import { useParams } from 'next/navigation'
import { useEffect } from 'react'
import DialogApproveForm from './DialogApproveForm'
import { useModal } from '@/hooks/useModal'
import DialogApproveShipping from './DialogApproveShipping'

const FormDetail = () => {
    const { formId } = useParams()
    const { formDetail, getDetail } = useFormSampleContext()
    const { isOpenModal: isOpenApprove, closeModal: closeApprove, openModal: openApprove } = useModal()
    const { isOpenModal: isOpenShipping, closeModal: closeShipping, openModal: openShipping } = useModal()

    useEffect(() => {
        getDetail(formId as string)
    }, [formId])

    return (
        <Grid container spacing={6}>
            <DialogApproveForm open={isOpenApprove} handleClose={closeApprove} />
            <DialogApproveShipping open={isOpenShipping} handleClose={closeShipping} />
            <Grid item sm={12} className='flex gap-4'>
                <p className='text-2xl font-semibold'>INV - 093421</p>
                <div className='py-1 px-2 rounded font-semibold bg-gray-400 grid place-items-center text-sm'>
                    Pending approval
                </div>
            </Grid>
            <Grid item sm={8}>
                <Card>
                    <CardContent>
                        <p className='text-xl font-semibold'>Sumary</p>

                        <Grid container className='mt-4'>
                            <Grid item sm={6}>
                                <table className='w-full border-collapse text-sm'>
                                    <tr>
                                        <th className='p-2 text-left text-gray-400 font-normal'>Email</th>
                                        <td className='font-semibold'>{formDetail?.email}</td>
                                    </tr>
                                    <tr>
                                        <th className='p-2 text-left text-gray-400 font-normal'>Name</th>
                                        <td className='font-semibold'>{formDetail?.name}</td>
                                    </tr>
                                    <tr>
                                        <th className='p-2 text-left text-gray-400 font-normal'>Phone</th>
                                        <td className='font-semibold'>{formDetail?.phone}</td>
                                    </tr>
                                </table>
                            </Grid>
                            <Grid item sm={6}>
                                <table className='w-full border-collapse text-sm'>
                                    <tr>
                                        <th className='p-2 text-left text-gray-400 font-normal'>Receive Name</th>
                                        <td className='font-semibold'>{formDetail?.receiveName}</td>
                                    </tr>
                                    <tr>
                                        <th className='p-2 text-left text-gray-400 font-normal'>Receive Phone</th>
                                        <td className='font-semibold'>{formDetail?.receivePhoneNumber}</td>
                                    </tr>
                                    <tr>
                                        <th className='p-2 text-left text-gray-400 font-normal'>Receive Address</th>
                                        <td className='font-semibold'>{formDetail?.address}</td>
                                    </tr>
                                </table>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
                <Card className='mt-6'>
                    <CardContent>
                        <table className='w-full gap-2 table-auto border-spacing-y-2'>
                            <thead>
                                <tr className='text-left h-10 bg-gray-200'>
                                    <th className='pl-2'>SKU</th>
                                    <th>Name</th>
                                    <th>Avaliable Stock</th>
                                </tr>
                            </thead>
                            <tbody>
                                {formDetail?.products?.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{item.sku}</td>
                                            <td>
                                                <div className='flex gap-2 items-center'>
                                                    <img
                                                        width={38}
                                                        height={38}
                                                        src={item.imageList[0]}
                                                        alt=''
                                                        className='rounded'
                                                    />
                                                    <Typography
                                                        className='truncate max-w-[200px] text-sm'
                                                        color='text.primary'
                                                    >
                                                        {item.productName}
                                                    </Typography>
                                                </div>
                                            </td>
                                            <td>{item.availableStock}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </CardContent>
                </Card>
            </Grid>

            <Grid item sm={4}>
                <Card>
                    <CardContent className='flex flex-col gap-4'>
                        <p className='text-lg font-semibold'>Action</p>
                        <Button variant='contained' color='primary' onClick={openApprove}>
                            Process
                        </Button>
                        <Button variant='contained' color='primary' onClick={openShipping}>
                            Add Shipping
                        </Button>
                    </CardContent>
                </Card>

                <div className='mt-6 p-4'>
                    <p className='text-xl font-semibold'>Form Tracking Logs</p>

                    <div className='mt-4 flex flex-col gap-2'>
                        {/* Log Event 1 */}
                        <div className='bg-gray-100 p-2 rounded-lg'>
                            <p className='font-medium text-gray-800'>Invoice Created</p>
                            <p className='text-sm text-gray-500'>10 Oct 2024, 10:00 AM</p>
                        </div>

                        {/* Log Event 2 */}
                        <div className='bg-gray-100 p-2 rounded-lg'>
                            <p className='font-medium text-gray-800'>Payment Received</p>
                            <p className='text-sm text-gray-500'>12 Oct 2024, 2:15 PM</p>
                        </div>

                        {/* Log Event 3 */}
                        <div className='bg-gray-100 p-2 rounded-lg'>
                            <p className='font-medium text-gray-800'>Invoice Shipped</p>
                            <p className='text-sm text-gray-500'>14 Oct 2024, 5:00 PM</p>
                        </div>

                        {/* Log Event 4 */}
                        <div className='bg-gray-100 p-2 rounded-lg'>
                            <p className='font-medium text-gray-800'>Delivered</p>
                            <p className='text-sm text-gray-500'>16 Oct 2024, 9:30 AM</p>
                        </div>
                    </div>
                </div>
            </Grid>
        </Grid>
    )
}

export default FormDetail
