'use client'
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
import { TablePagination, Typography } from '@mui/material'
import { rankItem } from '@tanstack/match-sorter-utils'

import tableStyles from '@core/styles/table.module.css'
import { useMemo } from 'react'
import TablePaginationComponent from '@/components/TablePaginationComponent'
import classNames from 'classnames'
import { useRouter } from 'next/navigation'
import { useAffiliateManagementContext } from '@/services/provider/AffiliateManagementProdvider'
import { AffiliateManagementType } from '@/types/affiliate.type'

type Props = {}
type AffiliateWithActionsType = AffiliateManagementType & {
    actions?: string
}

const columnHelper = createColumnHelper<AffiliateWithActionsType>()
const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
    const itemRank = rankItem(row.getValue(columnId), value)
    addMeta({
        itemRank
    })
    return itemRank.passed
}

export const TableAffiliateManagement = (props: Props) => {
    const { trackingProducts } = useAffiliateManagementContext()

    const columns = useMemo<ColumnDef<AffiliateWithActionsType, any>[]>(
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
            columnHelper.accessor('product.sku', {
                header: 'sku',
                cell: ({ row }) => <Typography className='text-center'>{row.original?.product.sku}</Typography>
            }),
            columnHelper.accessor('product', {
                header: 'Sản phẩm',
                cell: ({ row }) => (
                    <div className='flex items-center gap-2'>
                        <img className='w-[50px] h-[50px] rounded-md' src={row.original?.product?.imageList?.[0]} />
                        <Typography className='max-w-[400px] truncate'>{row.original?.product?.productName}</Typography>
                    </div>
                )
            }),
            columnHelper.accessor('product.bu', {
                header: 'Ngành hàng',
                cell: ({ row }) => <Typography className='text-center'>{row.original?.product.bu}</Typography>
            }),
            columnHelper.accessor('product.brand', {
                header: 'Thương hiệu',
                cell: ({ row }) => <Typography className='text-center'>{row.original?.product.brand}</Typography>
            }),
            columnHelper.accessor('count', {
                header: 'Lượt view',
                cell: ({ row }) => <Typography className='text-center'>{row.original.count}</Typography>
            })
        ],
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [trackingProducts]
    )

    const table = useReactTable({
        data: trackingProducts as AffiliateWithActionsType[],
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
