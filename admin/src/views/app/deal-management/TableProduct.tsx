'use client'
import { ProductType } from '@/types/product.type'
import { Card, CardContent, Divider } from '@mui/material'
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
import { useMemo } from 'react'
import TablePaginationComponent from '@/components/TablePaginationComponent'
import classNames from 'classnames'
import { useProductContext } from '@/services/provider/ProductProvider'

type Props = {}
type ProductWithActionsType = ProductType & {
    actions?: string
}
const columnHelper = createColumnHelper<ProductWithActionsType>()
const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
    const itemRank = rankItem(row.getValue(columnId), value)
    addMeta({
        itemRank
    })
    return itemRank.passed
}

export const TableProduct = (props: Props) => {
    const { products } = useProductContext()
    const columns = useMemo<ColumnDef<ProductWithActionsType, any>[]>(
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
            columnHelper.accessor('sku', {
                header: 'SKU',
                cell: ({ row }) => <Typography>{row.original.sku}</Typography>
            }),
            columnHelper.accessor('brand', {
                header: 'Ngành hàng',
                cell: ({ row }) => <Typography>{row.original.bu}</Typography>
            }),
            columnHelper.accessor('brand', {
                header: 'Phân loại',
                cell: ({ row }) => <Typography>{row.original.cat}</Typography>
            }),
            columnHelper.accessor('brand', {
                header: 'Thương hiệu',
                cell: ({ row }) => <Typography>{row.original.brand}</Typography>
            }),
            columnHelper.accessor('productName', {
                header: 'Tên sản phẩm',
                cell: ({ row }) => (
                    <div className='flex items-center gap-2'>
                        <img
                            width={38}
                            height={38}
                            src={row.original.imageList[0]}
                            alt=''
                            className='rounded backdrop-blur-md'
                        />
                        <p className='text-primary'>+{row.original.imageList.length - 1}</p>
                        <Typography className='truncate max-w-[200px] text-sm line-clamp-2  ml-2' color='text.primary'>
                            {row.original.productName}
                        </Typography>
                    </div>
                )
            }),
            columnHelper.accessor('publisher', {
                header: 'Sàn',
                cell: ({ row }) => {
                    return (
                        <Chip
                            variant='outlined'
                            label={row.original.publisher == 'SP' ? 'Shopee' : 'Lazada'}
                            color={row.original.publisher == 'SP' ? 'primary' : 'secondary'}
                        ></Chip>
                    )
                }
            }),
            columnHelper.accessor('commission', {
                header: 'Chiết khấu',
                cell: ({ row }) => <Typography>{(row.original.commission * 100).toFixed(0)}%</Typography>
            }),
            columnHelper.accessor('actions', {
                header: 'Actions',
                cell: ({ row }) => (
                    <div className='flex items-center'>
                        {/* <IconButton>
                  <i className='tabler-edit text-textSecondary' />
                </IconButton> */}
                        <OptionMenu
                            iconButtonProps={{ size: 'medium' }}
                            iconClassName='text-textSecondary'
                            options={[
                                // { text: 'Download', icon: 'tabler-download' },
                                {
                                    text: 'Delete',
                                    icon: 'tabler-trash'
                                    // menuItemProps: { onClick: () => deleteProduct(row.original.sku) }
                                }
                                // { text: 'Edit', icon: 'tabler-edit' }
                            ]}
                        />
                    </div>
                ),
                enableSorting: false
            })
        ],
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [products]
    )

    const table = useReactTable({
        data: products as ProductWithActionsType[],
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
                                                (classNames({ selected: row.getIsSelected() }), 'cursor-pointer')
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
