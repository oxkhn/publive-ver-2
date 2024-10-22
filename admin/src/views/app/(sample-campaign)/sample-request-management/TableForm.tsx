'use client'
import { ProductType } from '@/types/product.type'
import { Card, CardContent, Grid } from '@mui/material'
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
import { formatVND } from '@/utils/string'
import { useCallback, useEffect, useMemo, useState } from 'react'
import TablePaginationComponent from '@/components/TablePaginationComponent'
import classNames from 'classnames'
import { useProductContext } from '@/services/provider/ProductProvider'
import { CampaignEmailType } from '@/types/campaignEmail.type'
import { useCampaignEmailContext } from '@/services/provider/CampaignEmailProvider'
import { toast } from 'react-toastify'
import { useConfirm } from '@/services/provider/ConfirmProvider'
import { useParams, useRouter } from 'next/navigation'
import { PartnerType, PartnerTypeWithId } from '@/types/partner.type'
import { useFormSampleContext } from '@/services/provider/FormProvider'
import { FormRegisterAffiliateTypeWithId } from '@/types/formSample.type'

type Props = {}
type FormSampleWithActionsType = FormRegisterAffiliateTypeWithId & {
    actions?: string
}

const columnHelper = createColumnHelper<FormSampleWithActionsType>()
const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
    const itemRank = rankItem(row.getValue(columnId), value)
    addMeta({
        itemRank
    })
    return itemRank.passed
}

export const TableForm = (props: Props) => {
    const { formSamples } = useFormSampleContext()
    const router = useRouter()
    const columns = useMemo<ColumnDef<FormSampleWithActionsType, any>[]>(
        () => [
            {
                id: 'select',
                header: ({ table }) => (
                    <Checkbox
                        {...{
                            checked: table.getIsAllRowsSelected(),
                            indeterminate: table.getIsSomeRowsSelected(),
                            onChange: table.getToggleAllRowsSelectedHandler()
                        }}
                    />
                ),
                cell: ({ row }) => (
                    <Checkbox
                        {...{
                            checked: row.getIsSelected(),
                            disabled: !row.getCanSelect(),
                            indeterminate: row.getIsSomeSelected(),
                            onChange: row.getToggleSelectedHandler()
                        }}
                    />
                )
            },

            columnHelper.accessor('name', {
                header: 'Name',
                cell: ({ row }) => <Typography>{row.original.name}</Typography>
            }),
            columnHelper.accessor('email', {
                header: 'Email',
                cell: ({ row }) => <Typography>{row.original.email}</Typography>
            }),
            columnHelper.accessor('status', {
                header: 'Status',
                cell: ({ row }) => <Typography>{row.original.status}</Typography>
            }),
            columnHelper.accessor('productSKUs', {
                header: 'Sản phẩm',
                cell: ({ row }) => <Typography>{row.original.productSKUs.length}</Typography>
            }),
            columnHelper.accessor('actions', {
                header: 'Actions',
                cell: ({ row }) => (
                    <div className='flex items-center'>
                        <IconButton
                            color='default'
                            onClick={async e => {
                                e.stopPropagation()
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
        [formSamples]
    )

    const table = useReactTable({
        data: formSamples as FormSampleWithActionsType[],
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
                    <thead className='bg-gray-200'>
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
                                            onClick={() => {
                                                router.push('/sample-request-management/' + row.original._id)
                                            }}
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
