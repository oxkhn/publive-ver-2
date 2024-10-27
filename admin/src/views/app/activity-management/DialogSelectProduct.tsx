'use client'

import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Grid, Table } from '@mui/material'
import { useEffect, useState } from 'react'
import { useModal } from '@/hooks/useModal'
import { useGetAllProduct } from '@/services/api/product/useGetAllProduct'
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
    Row,
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
import { ProductType } from '@/types/product.type'
import CustomTextField from '@/@core/components/mui/TextField'
import { useCampaignDetailContext } from '../../../services/provider/CampaignDetailProvider'
import { toast } from 'react-toastify'
import { useCampaignContext } from '@/services/provider/CampaignProvider'

type Props = {
    open: boolean
    handleClose: any
}
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

const DialogSelectProduct = (props: Props) => {
    const { open, handleClose } = props
    const { onReload } = useCampaignContext()
    const { handleInputChange, onSubmit, campaignData } = useCampaignDetailContext()
    const [products, setProducts] = useState<ProductType[]>([])
    const [searchValue, setSearchValue] = useState('')
    const _getAllProduct = useGetAllProduct()

    const initData = async () => {
        try {
            const res = await _getAllProduct.mutateAsync({})
            setProducts(res.data)
        } catch (error) {}
    }

    useEffect(() => {
        initData()
    }, [])

    const reloadProduct = async () => {
        try {
            const body = {
                name: searchValue,
                sku: searchValue
            }

            const res = await _getAllProduct.mutateAsync(body)
            setProducts(res.data)
        } catch (error) {}
    }

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
                ),
                sortingFn: (
                    rowA: Row<ProductWithActionsType>,
                    rowB: Row<ProductWithActionsType>,
                    _columnId: string
                ): number => {
                    const aSelected = rowA.getIsSelected() ? 1 : 0
                    const bSelected = rowB.getIsSelected() ? 1 : 0

                    // Sort selected rows to the top
                    return aSelected === bSelected ? 0 : aSelected > bSelected ? -1 : 1
                }
            },
            columnHelper.accessor('sku', {
                header: 'SKU',
                cell: ({ row }) => <Typography className='w-fit'>{row.original.sku}</Typography>
            }),
            columnHelper.accessor('productName', {
                header: 'Tên sản phẩm',
                cell: ({ row }) => (
                    <div className='flex gap-2 items-center'>
                        {/* <img width={50} height={50} src={row.original.imageList[0]} alt='' className='rounded' /> */}
                        <Typography className='truncate max-w-[400px]' color='text.primary'>
                            {row.original.productName}
                        </Typography>
                    </div>
                )
            })
        ],
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [products]
    )

    // Create the initial row selection based on SKUs
    const initialRowSelection = () => {
        const selection: Record<string, boolean> = {}
        if (campaignData.productSKUs && campaignData.productSKUs.length > 0) {
            campaignData.productSKUs.forEach(sku => {
                selection[sku] = true
            })
        }

        return selection
    }

    useEffect(() => {
        setRowSelection(initialRowSelection())
    }, [campaignData, open])

    const [rowSelection, setRowSelection] = useState<RowSelectionState>({})
    const table = useReactTable({
        data: products as ProductWithActionsType[],
        columns,

        filterFns: {
            fuzzy: fuzzyFilter
        },
        initialState: {
            pagination: {
                pageSize: 1000
            }
        },
        getRowId: row => row.sku,
        state: {
            rowSelection
        },
        enableRowSelection: true,
        globalFilterFn: fuzzyFilter,
        onRowSelectionChange: setRowSelection,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getFacetedRowModel: getFacetedRowModel(),
        getFacetedUniqueValues: getFacetedUniqueValues(),
        getFacetedMinMaxValues: getFacetedMinMaxValues()
    })

    const handleSubmit = () => {
        const selectedRows = table.getSelectedRowModel().rows
        const skus = selectedRows.map(row => row.original.sku)
        handleInputChange(skus, 'productSKUs')

        const updatedData = {
            ...campaignData,
            ['productSKUs']: skus
        }

        toast
            .promise(onSubmit(updatedData), {
                pending: 'Đang khởi tạo campaign.',
                success: 'Tạo campaign thành công.',
                error: 'Tạo campaign thất bại.'
            })
            .then(() => {
                onReload()
                handleClose()
            })
    }

    return (
        <>
            <Dialog open={open} fullWidth maxWidth='lg'>
                <DialogTitle className='flex  justify-between items-center'>
                    <p className='font-semibold'>Select Product</p>
                    <IconButton color='primary' onClick={handleClose}>
                        <i className='tabler-x' />
                    </IconButton>
                </DialogTitle>

                <DialogContent>
                    <Grid container spacing={6} overflow='hidden'>
                        <Grid item sm={12}>
                            <Table stickyHeader className={tableStyles.table} aria-label='sticky table'>
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
                                                                    'cursor-pointer select-none':
                                                                        header.column.getCanSort()
                                                                })}
                                                                onClick={header.column.getToggleSortingHandler()}
                                                            >
                                                                {flexRender(
                                                                    header.column.columnDef.header,
                                                                    header.getContext()
                                                                )}
                                                                {{
                                                                    asc: <i className='tabler-chevron-up text-xl' />,
                                                                    desc: <i className='tabler-chevron-down text-xl' />
                                                                }[header.column.getIsSorted() as 'asc' | 'desc'] ??
                                                                    null}
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
                                                                {flexRender(
                                                                    cell.column.columnDef.cell,
                                                                    cell.getContext()
                                                                )}
                                                            </td>
                                                        ))}
                                                    </tr>
                                                )
                                            })}
                                    </tbody>
                                )}
                            </Table>
                        </Grid>
                    </Grid>
                </DialogContent>

                <DialogActions className='flex justify-between'>
                    <div className='flex gap-2 items-center'>
                        <CustomTextField
                            placeholder='Enter name or SKU'
                            value={searchValue}
                            onChange={e => setSearchValue(e.target.value)}
                        />
                        <Button variant='text' color='primary' onClick={reloadProduct}>
                            Apply
                        </Button>

                        {/* <p>
                            Selected: <span>{campaignData?.productSKUs?.length}</span>
                        </p> */}
                    </div>
                    <Button variant='contained' color='primary' onClick={handleSubmit}>
                        Add Product
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default DialogSelectProduct
