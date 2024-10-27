'use client'
import { ProductType } from '@/types/product.type'
import { Button, Card, CardContent, Divider, MenuItem } from '@mui/material'
import {
    ColumnDef,
    createColumnHelper,
    FilterFn,
    flexRender,
    getCoreRowModel,
    getFacetedMinMaxValues,
    getFacetedRowModel,
    getFacetedUniqueValues,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    RowSelectionState,
    useReactTable
} from '@tanstack/react-table'
import { Checkbox, Chip, IconButton, Switch, TablePagination, Typography } from '@mui/material'
import { rankItem } from '@tanstack/match-sorter-utils'

import tableStyles from '@core/styles/table.module.css'
import OptionMenu from '@/@core/components/option-menu'
import { formatDateToDDMMYYYY, formatVND } from '@/utils/string'
import { useMemo } from 'react'
import TablePaginationComponent from '@/components/TablePaginationComponent'
import classNames from 'classnames'
import { useProductContext } from '@/services/provider/ProductProvider'
import { useCampaignContext } from '@/services/provider/CampaignProvider'
import { CampaignTypeWithId } from '@/types/campaign.type'
import { toast } from 'react-toastify'
import { useConfirm } from '@/services/provider/ConfirmProvider'
import { useModal } from '@/hooks/useModal'
import DialogCreateCampaign from './DialogCreateCampaing'
import { useCampaignDetailContext } from '../../../services/provider/CampaignDetailProvider'
import DialogSelectAddOption from './DialogSelectAddOption'
import { useRouter } from 'next/navigation'
import DialogReviewProduct from './DialogReviewProduct'
import CustomTextField from '@/@core/components/mui/TextField'
import Image from 'next/image'

type Props = {}
type CampaignWithActionsType = CampaignTypeWithId & {
    actions?: string
}
const columnHelper = createColumnHelper<CampaignWithActionsType>()
const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
    const itemRank = rankItem(row.getValue(columnId), value)
    addMeta({
        itemRank
    })
    return itemRank.passed
}

export const TableCampaign = (props: Props) => {
    const router = useRouter()
    const { campaigns, deleteCampaignById, onReload } = useCampaignContext()
    const { initCampaign } = useCampaignDetailContext()
    const { confirm } = useConfirm()
    const { isOpenModal, openModal, closeModal } = useModal()
    const { isOpenModal: isOpenModalSelect, openModal: openModalSelect, closeModal: closeModalSelect } = useModal()
    const { isOpenModal: isOpenModalReview, openModal: openModalReview, closeModal: closeModalReview } = useModal()

    const columns = useMemo<ColumnDef<CampaignWithActionsType, any>[]>(
        () => [
            columnHelper.accessor('name', {
                header: 'Thông tin',
                maxSize: 100,
                cell: ({ row }) => (
                    <div className='flex relative flex-col gap-1 overflow-hidden'>
                        <div className='flex gap-2 items-center'>
                            <p className='font-bold truncate max-w-[300px]'>{row.original.name}</p>
                        </div>
                        <p className='text-sm flex gap-3 mt-2'>
                            <span className='text-gray-400'>Brand Name: </span>
                            {row.original.brandName}
                        </p>
                        <p className='text-sm flex gap-3'>
                            <span className='text-gray-400'>Description: </span>
                            <div
                                className='line-clamp-2'
                                dangerouslySetInnerHTML={{ __html: row.original.description }}
                            ></div>
                        </p>
                        <p className='text-sm flex gap-3'>
                            <span className='text-gray-400'>Register time: </span>
                            {formatDateToDDMMYYYY(row.original.registerStartDate.toString())} -{' '}
                            {formatDateToDDMMYYYY(row.original.registerEndDate.toString())}
                        </p>
                        <p className='text-sm flex gap-3'>
                            <span className='text-gray-400'>Campaign period: </span>
                            {formatDateToDDMMYYYY(row.original.startDate.toString())} -{' '}
                            {formatDateToDDMMYYYY(row.original.endDate.toString())}
                        </p>
                        <p className='text-sm flex gap-3'>
                            <span className='text-gray-400'>Hashtags: </span>
                            {row.original.tags}
                        </p>
                        <div className='text-sm flex gap-3 items-center'>
                            <p className='text-gray-400'>Campaign type: </p>
                            {row.original.type == 1 && (
                                <div className='px-1.5 py-0.5 bg-red-500 rounded-md text-white font-semibold'>
                                    <p>Chiến thần livestream</p>
                                </div>
                            )}
                            {row.original.type == 2 && (
                                <div className='px-1.5 py-0.5 bg-green-500 rounded-md text-white font-semibold'>
                                    <p>Chiến thần đu đơn</p>
                                </div>
                            )}
                        </div>
                        <Image
                            src={row.original.banner || ''}
                            alt=''
                            width={200}
                            height={100}
                            className='w-full mt-2'
                        />
                    </div>
                )
            }),
            columnHelper.accessor('productSKUs', {
                header: 'Product',
                cell: ({ row }) => (
                    <div className='flex flex-col gap-1'>
                        <p>
                            <span>Product in campaign: </span> {row.original.productSKUs?.length}
                        </p>
                        <div className='flex gap-2'>
                            <Button
                                className='w-fit'
                                variant='text'
                                onClick={() => {
                                    initCampaign(row.original)
                                    openModalReview()
                                }}
                            >
                                Review
                            </Button>
                        </div>
                    </div>
                )
            }),
            columnHelper.accessor('status', {
                header: 'Product',
                cell: ({ row }) => (
                    <CustomTextField
                        select
                        fullWidth
                        value={row.original.status}
                        id='custom-select-category'
                        onChange={e => {
                            // handleInputChange(e.target.value, 'status')
                        }}
                    >
                        <MenuItem value='active'>Active</MenuItem>
                        <MenuItem value='inactive'>Inactive</MenuItem>
                        <MenuItem value='completed'>Completed</MenuItem>
                    </CustomTextField>
                )
            }),
            columnHelper.accessor('actions', {
                header: 'Action',
                cell: ({ row }) => (
                    <div className='gap-2 flex'>
                        <IconButton
                            color='success'
                            onClick={() => {
                                initCampaign(row.original)
                                openModal()
                            }}
                        >
                            <i className='tabler-pencil-minus' />
                        </IconButton>

                        <IconButton
                            color='default'
                            onClick={async () => {
                                const isConfirmed = await confirm(
                                    'Bạn có chắc chắn muốn xóa campaign này? Thao tác này không thể hoàn tác.'
                                )
                                if (!isConfirmed) return

                                try {
                                    await toast.promise(deleteCampaignById(row.original._id), {
                                        pending: 'Đang xóa...',
                                        success: 'Đã xoá campaign thành công 👌',
                                        error: 'Delete campaign rejected 🤯'
                                    })

                                    onReload()
                                } catch (error) {}
                            }}
                        >
                            <i className='tabler-trash' />
                        </IconButton>
                    </div>
                )
            }),
            columnHelper.accessor('registerLink', {
                header: 'Winner list',
                cell: ({ row }) => (
                    <IconButton
                        color='error'
                        onClick={() => {
                            router.push('/activity-management/kol-register/' + row.original._id)
                        }}
                    >
                        <i className='tabler-crown' />
                    </IconButton>
                )
            })
        ],
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [campaigns]
    )

    const table = useReactTable({
        data: campaigns as CampaignWithActionsType[],
        columns,
        filterFns: {
            fuzzy: fuzzyFilter
        },
        defaultColumn: {
            maxSize: 100
        },
        initialState: {
            pagination: {
                pageSize: 50
            }
        },
        getRowId: row => row.sku,
        state: {
            // rowSelection
        },
        enableRowSelection: true,
        globalFilterFn: fuzzyFilter,
        // onRowSelectionChange: setRowSelection,
        getCoreRowModel: getCoreRowModel(),
        // onGlobalFilterChange: setGlobalFilter,
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getFacetedRowModel: getFacetedRowModel(),
        getFacetedUniqueValues: getFacetedUniqueValues(),
        getFacetedMinMaxValues: getFacetedMinMaxValues()
    })

    return (
        <Card>
            <DialogReviewProduct open={isOpenModalReview} handleClose={closeModalReview} />
            <DialogCreateCampaign open={isOpenModal} handleClose={closeModal} />
            <DialogSelectAddOption open={isOpenModalSelect} handleClose={closeModalSelect} />
            <CardContent>
                <table className={tableStyles.table}>
                    <thead className='bg-gray-200 font-bold'>
                        {table.getHeaderGroups().map(headerGroup => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map(header => (
                                    <th key={header.id}>
                                        {header.isPlaceholder ? null : (
                                            <>
                                                <div
                                                    className={classNames({
                                                        'flex items-center': header.column.getIsSorted(),
                                                        'cursor-pointer select-none': header.column.getCanSort()
                                                    })}
                                                    onClick={header.column.getToggleSortingHandler()}
                                                >
                                                    {flexRender(header.column.columnDef.header, header.getContext())}
                                                    {{
                                                        asc: <i className='tabler-chevron-up text-xl' />,
                                                        desc: <i className='tabler-chevron-down text-xl' />
                                                    }[header.column.getIsSorted() as 'asc' | 'desc'] ?? null}
                                                </div>
                                            </>
                                        )}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    {table.getFilteredRowModel().rows.length === 0 ? (
                        <tbody>
                            <tr>
                                <td colSpan={table.getVisibleFlatColumns().length} className='text-center'>
                                    No data available
                                </td>
                            </tr>
                        </tbody>
                    ) : (
                        <tbody>
                            {table
                                .getRowModel()
                                .rows.slice(0, table.getState().pagination.pageSize)
                                .map(row => {
                                    return (
                                        <tr
                                            key={row.id}
                                            className={
                                                (classNames({ selected: row.getIsSelected() }),
                                                'cursor-pointer hover:bg-gray-200')
                                            }
                                        >
                                            {row.getVisibleCells().map(cell => (
                                                <td key={cell.id}>
                                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                </td>
                                            ))}
                                        </tr>
                                    )
                                })}
                        </tbody>
                    )}
                </table>

                <TablePagination
                    component={() => <TablePaginationComponent table={table} />}
                    count={table.getFilteredRowModel().rows.length}
                    rowsPerPage={table.getState().pagination.pageSize}
                    page={table.getState().pagination.pageIndex}
                    onPageChange={(_, page) => {
                        table.setPageIndex(page)
                    }}
                />
            </CardContent>
        </Card>
    )
}
