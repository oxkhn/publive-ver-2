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
import { useRouter } from 'next/navigation'
import CustomTextField from '@/@core/components/mui/TextField'
import Image from 'next/image'
import { useBrandFootageContext } from '@/services/provider/BrandFootageProvider'
import { FootageTypeWithId } from '@/types/footage.type'

type Props = {}
type FootageWithActionsType = FootageTypeWithId & {
    actions?: string
}
const columnHelper = createColumnHelper<FootageWithActionsType>()
const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
    const itemRank = rankItem(row.getValue(columnId), value)
    addMeta({
        itemRank
    })
    return itemRank.passed
}

export const TableFootage = (props: Props) => {
    const router = useRouter()
    const { footages } = useBrandFootageContext()
    const { confirm } = useConfirm()
    const { isOpenModal, openModal, closeModal } = useModal()
    const { isOpenModal: isOpenModalSelect, openModal: openModalSelect, closeModal: closeModalSelect } = useModal()
    const { isOpenModal: isOpenModalReview, openModal: openModalReview, closeModal: closeModalReview } = useModal()

    const columns = useMemo<ColumnDef<FootageWithActionsType, any>[]>(
        () => [
            columnHelper.accessor('title', {
                header: 'Title',
                maxSize: 100,
                cell: ({ row }) => (
                    <div className='flex relative gap-1 overflow-hidden'>
                        <Image src={row.original.thumbnailUrl || ''} alt='' width={50} height={50} className='ml-2' />

                        <div className='flex gap-2 items-center'>
                            <p className='font-bold truncate max-w-[300px]'>{row.original.title}</p>
                        </div>
                    </div>
                )
            }),
            columnHelper.accessor('description', {
                header: 'Description',
                cell: ({ row }) => (
                    <div className='flex flex-col gap-1'>
                        <p>{row.original.description}</p>
                    </div>
                )
            }),

            columnHelper.accessor('actions', {
                header: 'Action',
                cell: ({ row }) => (
                    <div className='gap-2 flex'>
                        <IconButton color='success' onClick={() => {}}>
                            <i className='tabler-pencil-minus' />
                        </IconButton>

                        <IconButton color='default' onClick={async () => {}}>
                            <i className='tabler-trash' />
                        </IconButton>
                    </div>
                )
            })
        ],
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [footages]
    )

    const table = useReactTable({
        data: footages as FootageWithActionsType[],
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
