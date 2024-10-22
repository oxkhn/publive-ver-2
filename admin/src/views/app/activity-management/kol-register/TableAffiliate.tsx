'use client'
import { ProductType } from '@/types/product.type'
import { Button, Card, CardContent, Divider } from '@mui/material'
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
import { useEffect, useMemo, useState } from 'react'
import TablePaginationComponent from '@/components/TablePaginationComponent'
import classNames from 'classnames'
import { useProductContext } from '@/services/provider/ProductProvider'
import { useCampaignContext } from '@/services/provider/CampaignProvider'
import { CampaignTypeWithId } from '@/types/campaign.type'
import { toast } from 'react-toastify'
import { useConfirm } from '@/services/provider/ConfirmProvider'
import { useModal } from '@/hooks/useModal'
import { useParams, useRouter } from 'next/navigation'
import { useGetAffiliate } from '@/services/api/campaign/useGetAffiliate'
import { AffiliateType } from '@/types/affiliate.type'
import Image from 'next/image'
import Link from 'next/link'

type Props = {}
type AffiliateWithActionsType = AffiliateType & {
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

export const TableAffiliate = (props: Props) => {
    const { campaignId } = useParams()
    const [affiliates, setAffiliates] = useState([])
    const _getAffiliate = useGetAffiliate()

    const handleGetData = async () => {
        const res = await _getAffiliate.mutateAsync(campaignId as string)
        setAffiliates(res.data)
    }

    useEffect(() => {
        handleGetData()
    }, [])

    const columns = useMemo<ColumnDef<AffiliateWithActionsType, any>[]>(
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
            columnHelper.accessor('affiliateName', {
                header: 'Name',
                cell: ({ row }) => (
                    <div className='flex gap-3 items-center'>
                        <div className='flex h-7 w-7 items-center justify-center rounded-full bg-gray-300'>
                            <span className='text-sm font-bold text-white'>
                                {row.original.affiliateName?.charAt(0).toUpperCase()}
                            </span>
                        </div>
                        <Typography>{row.original.affiliateName}</Typography>
                    </div>
                )
            }),
            columnHelper.accessor('tiktokLink', {
                header: 'Social',
                cell: ({ row }) => (
                    <div>
                        <div className='mt-2.5 flex items-center gap-3'>
                            {row.original.tiktokLink && (
                                <Link href={row.original.tiktokLink} target='_blank'>
                                    <Image
                                        src='/logoSocials/tiktok_1.svg'
                                        className='h-4 w-4 hover:bg-grays/10'
                                        width={16}
                                        height={16}
                                        alt=''
                                    />
                                </Link>
                            )}

                            {row.original.fbLink && (
                                <Link
                                    target='_blank'
                                    href={row.original.fbLink}
                                    className='cursor-pointer rounded-full p-1 hover:bg-grays/15'
                                >
                                    <Image
                                        src='/logoSocials/fb_1.svg'
                                        className='h-4 w-4'
                                        width={16}
                                        height={16}
                                        alt=''
                                    />
                                </Link>
                            )}
                            {row.original.youtubeLink && (
                                <Link
                                    target='_blank'
                                    href={row.original.youtubeLink}
                                    className='cursor-pointer rounded-full p-1 hover:bg-grays/15'
                                >
                                    <Image
                                        src='/logoSocials/yt_1.svg'
                                        className='h-4 w-4'
                                        width={16}
                                        height={16}
                                        alt=''
                                    />
                                </Link>
                            )}
                            {row.original.shopeeLink && (
                                <Link
                                    target='_blank'
                                    href={row.original.shopeeLink}
                                    className='cursor-pointer rounded-full p-1 hover:bg-grays/15'
                                >
                                    <Image
                                        src='/logoSocials/shopee_1.svg'
                                        className='h-4 w-4'
                                        width={16}
                                        height={16}
                                        alt=''
                                    />
                                </Link>
                            )}
                        </div>
                    </div>
                )
            }),
            columnHelper.accessor('orders', {
                header: 'Order',
                cell: ({ row }) => <Typography>{row.original.orders}</Typography>
            }),
            columnHelper.accessor('ROI', {
                header: 'ROI',
                cell: ({ row }) => <Typography>{row.original.ROI}</Typography>
            }),
            columnHelper.accessor('clicks', {
                header: 'Clicks',
                cell: ({ row }) => <Typography>{row.original.clicks}</Typography>
            }),
            columnHelper.accessor('sales', {
                header: 'Sales',
                cell: ({ row }) => <Typography>{row.original.sales}</Typography>
            }),
            columnHelper.accessor('commission', {
                header: 'Commission',
                cell: ({ row }) => <Typography>{row.original.commission}</Typography>
            })
        ],
        [affiliates]
    )

    const table = useReactTable({
        data: affiliates as AffiliateWithActionsType[],
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
