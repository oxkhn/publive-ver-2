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
    useReactTable
} from '@tanstack/react-table'
import { IconButton, TablePagination, Typography } from '@mui/material'
import { rankItem } from '@tanstack/match-sorter-utils'

import tableStyles from '@core/styles/table.module.css'
import OptionMenu from '@/@core/components/option-menu'
import { formatDateToDDMMYYYY, formatVND } from '@/utils/string'
import { useMemo, useState } from 'react'
import TablePaginationComponent from '@/components/TablePaginationComponent'
import classNames from 'classnames'
import { useProductContext } from '@/services/provider/ProductProvider'
// import { KOCRegisterType } from '@/types/KOCRegister.type'
import { toast } from 'react-toastify'
import { useConfirm } from '@/services/provider/ConfirmProvider'
import { useRouter } from 'next/navigation'
import { useModal } from '@/hooks/useModal'
import { KOCAnalysType } from '@/types/userTypes'
import { useSampleProductContext } from '@/services/provider/SampleProductProvider'

type Props = {}
// type KOCRegisterWithActionsType = any & {
//     actions?: string
// }

const columnHelper = createColumnHelper<KOCAnalysType>()
const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
    const itemRank = rankItem(row.getValue(columnId), value)
    addMeta({
        itemRank
    })
    return itemRank.passed
}

export const TableKOCRegister = (props: Props) => {
    const { kocAnalys } = useSampleProductContext()

    const columns = useMemo<ColumnDef<KOCAnalysType, any>[]>(
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
                header: 'KOC',
                cell: ({ row }) => (
                    <div className='flex items-center gap-2'>
                        <img className='w-[50px] h-[50px] rounded-md' src='' />
                        <Typography className='line-clamp-1'>{row.original.name}</Typography>
                    </div>
                )
            }),
            columnHelper.accessor('email', {
                header: 'Email',
                cell: ({ row }) => (
                    <div className='flex items-center gap-2'>
                        <Typography className='line-clamp-1'>{row.original.email}</Typography>
                    </div>
                )
            }),
            columnHelper.accessor('phoneNumber', {
                header: 'Số điện thoại',
                cell: ({ row }) => (
                    <div className='flex items-center gap-2'>
                        <Typography className='line-clamp-1'>{row.original.phoneNumber}</Typography>
                    </div>
                )
            }),

            columnHelper.accessor('productCount', {
                header: 'Số sản phẩm đăng ký',
                cell: ({ row }) => <Typography>{row.original.productCount}</Typography>
            })

            // columnHelper.accessor('actions', {
            //     header: 'Actions',
            //     cell: ({ row }) => (
            //         <div className='flex items-center'>
            //             <IconButton
            //                 color='success'
            //                 onClick={() => {
            //                     router.push('/email-marketing/email/' + row.original._id)
            //                 }}
            //             >
            //                 <i className='tabler-pencil-minus' />
            //             </IconButton>

            //             <IconButton
            //                 color='default'
            //                 onClick={async e => {
            //                     e.stopPropagation()
            //                     const isConfirmed = await confirm(
            //                         'Bạn có chắc chắn muốn xóa campaign này? Thao tác này không thể hoàn tác.'
            //                     )
            //                     if (!isConfirmed) return

            //                     try {
            //                         // await toast.promise(deleteCampaign(row.original._id), {
            //                         //     pending: 'Đang xóa...',
            //                         //     success: 'Đã xoá campaign thành công 👌',
            //                         //     error: 'Delete campaign rejected 🤯'
            //                         // })
            //                     } catch (error) {}
            //                 }}
            //             >
            //                 <i className='tabler-trash' />
            //             </IconButton>
            //         </div>
            //     ),
            //     enableSorting: false
            // })
        ],
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [kocAnalys]
    )

    const table = useReactTable({
        data: kocAnalys as KOCAnalysType[],
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
