'use client'
import { ProductType } from '@/types/product.type'
import { Card, CardContent } from '@mui/material'
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
import { useMemo, useState } from 'react'
import TablePaginationComponent from '@/components/TablePaginationComponent'
import classNames from 'classnames'
import { useProductContext } from '@/services/provider/ProductProvider'
import { CampaignEmailType } from '@/types/campaignEmail.type'
import { useCampaignEmailContext } from '@/services/provider/CampaignEmailProvider'
import { toast } from 'react-toastify'
import { useConfirm } from '@/services/provider/ConfirmProvider'
import { useRouter } from 'next/navigation'
import DialogReviewEmail from './DialogReviewEmail'
import { useModal } from '@/hooks/useModal'

type Props = {}
type CampaignEmailWithActionsType = CampaignEmailType & {
    actions?: string
}

const columnHelper = createColumnHelper<CampaignEmailWithActionsType>()
const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
    const itemRank = rankItem(row.getValue(columnId), value)
    addMeta({
        itemRank
    })
    return itemRank.passed
}

export const TableCampaignEmail = (props: Props) => {
    const router = useRouter()
    const { campaigns, deleteCampaign } = useCampaignEmailContext()
    const { confirm } = useConfirm()
    const { isOpenModal, openModal, closeModal } = useModal()
    const [filename, setFilename] = useState('')

    const columns = useMemo<ColumnDef<CampaignEmailWithActionsType, any>[]>(
        () => [
            // {
            //     id: 'select',
            //     header: ({ table }) => (
            //         <Checkbox
            //             {...{
            //                 checked: table.getIsAllRowsSelected(),
            //                 indeterminate: table.getIsSomeRowsSelected(),
            //                 onChange: table.getToggleAllRowsSelectedHandler()
            //             }}
            //         />
            //     ),
            //     cell: ({ row }) => (
            //         <Checkbox
            //             {...{
            //                 checked: row.getIsSelected(),
            //                 disabled: !row.getCanSelect(),
            //                 indeterminate: row.getIsSomeSelected(),
            //                 onChange: row.getToggleSelectedHandler()
            //             }}
            //         />
            //     )
            // },
            columnHelper.accessor('name', {
                header: 'Campaign Email Name',
                cell: ({ row }) => <Typography>{row.original.name}</Typography>
            }),
            columnHelper.accessor('status', {
                header: 'Status',
                cell: ({ row }) => <Chip variant='tonal' label={row.original.status} />
            }),
            columnHelper.accessor('bu', {
                header: 'Business unit',
                cell: ({ row }) => {
                    return <Chip variant='tonal' label={row.original.bu} color='primary'></Chip>
                }
            }),

            columnHelper.accessor('startDate', {
                header: 'Time',
                cell: ({ row }) => (
                    <Typography>
                        {formatDateToDDMMYYYY(row.original.startDate?.toString())} -{' '}
                        {formatDateToDDMMYYYY(row.original.endDate?.toString())}
                    </Typography>
                )
            }),
            columnHelper.accessor('templatePath', {
                header: 'Template',
                cell: ({ row }) => (
                    <div className='flex gap-2 items-center'>
                        <p className='max-w-[100px] truncate'>{row.original.templatePath}</p>
                        <IconButton
                            color='primary'
                            onClick={() => {
                                setFilename(row.original.templatePath)
                                openModal()
                            }}
                        >
                            <i className='tabler-eye' />
                        </IconButton>
                    </div>
                )
            }),
            columnHelper.accessor('actions', {
                header: 'Actions',
                cell: ({ row }) => (
                    <div className='flex items-center'>
                        <IconButton
                            color='success'
                            onClick={() => {
                                router.push('/email-marketing/email/' + row.original._id)
                            }}
                        >
                            <i className='tabler-pencil-minus' />
                        </IconButton>

                        <IconButton
                            color='default'
                            onClick={async e => {
                                e.stopPropagation()
                                const isConfirmed = await confirm(
                                    'Bạn có chắc chắn muốn xóa campaign này? Thao tác này không thể hoàn tác.'
                                )
                                if (!isConfirmed) return

                                try {
                                    await toast.promise(deleteCampaign(row.original._id), {
                                        pending: 'Đang xóa...',
                                        success: 'Đã xoá campaign thành công 👌',
                                        error: 'Delete campaign rejected 🤯'
                                    })
                                } catch (error) {}
                            }}
                        >
                            <i className='tabler-trash' />
                        </IconButton>
                    </div>
                ),
                enableSorting: false
            })
        ],
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [campaigns]
    )

    const table = useReactTable({
        data: campaigns as CampaignEmailWithActionsType[],
        columns,
        filterFns: {
            fuzzy: fuzzyFilter
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
            <DialogReviewEmail open={isOpenModal} handleClose={closeModal} filename={filename} />
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
