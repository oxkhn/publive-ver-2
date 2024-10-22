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
import Action from './Action'

type Props = {}
type EmailWithActionsType = PartnerTypeWithId & {
    actions?: string
}

const columnHelper = createColumnHelper<EmailWithActionsType>()
const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
    const itemRank = rankItem(row.getValue(columnId), value)
    addMeta({
        itemRank
    })
    return itemRank.passed
}

export const TableEmail = (props: Props) => {
    const router = useRouter()
    const { campaignEmailId } = useParams()
    const { emails, deleteEmail, getEmails, sendMail } = useCampaignEmailContext()
    const { confirm } = useConfirm()
    const [rowSelection, setRowSelection] = useState<RowSelectionState>({})

    useEffect(() => {
        getEmails(campaignEmailId as string)
    }, [])

    const columns = useMemo<ColumnDef<EmailWithActionsType, any>[]>(
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
            columnHelper.accessor('email', {
                header: 'Email',
                cell: ({ row }) => <Typography>{row.original.email}</Typography>
            }),
            columnHelper.accessor('name', {
                header: 'Name',
                cell: ({ row }) => <Typography>{row.original.name}</Typography>
            }),
            columnHelper.accessor('actions', {
                header: 'Actions',
                cell: ({ row }) => (
                    <div className='flex items-center'>
                        <IconButton
                            color='default'
                            onClick={async e => {
                                e.stopPropagation()
                                const isConfirmed = await confirm(
                                    'Bạn có chắc chắn muốn xóa email này? Thao tác này không thể hoàn tác.'
                                )
                                if (!isConfirmed) return

                                try {
                                    await toast.promise(deleteEmail(row.original._id), {
                                        pending: 'Đang xóa...',
                                        success: 'Đã xoá email thành công 👌',
                                        error: 'Delete email rejected 🤯'
                                    })

                                    getEmails(campaignEmailId as string)
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
        [emails]
    )

    const table = useReactTable({
        data: emails as EmailWithActionsType[],
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
            rowSelection
        },
        enableRowSelection: true,
        globalFilterFn: fuzzyFilter,
        onRowSelectionChange: setRowSelection,
        getCoreRowModel: getCoreRowModel(),
        // onGlobalFilterChange: setGlobalFilter,
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getFacetedRowModel: getFacetedRowModel(),
        getFacetedUniqueValues: getFacetedUniqueValues(),
        getFacetedMinMaxValues: getFacetedMinMaxValues()
    })

    const sendMailSelection = useCallback(async () => {
        const selectedRows = table.getSelectedRowModel().rows
        const emailsSelection = selectedRows.map(row => row.original.email)

        if (emailsSelection.length === 0) {
            toast.error('Không có email nào được chọn.')
            return
        }

        try {
            sendMail(emailsSelection, campaignEmailId as string)
            table.resetRowSelection()
        } catch (error) {}
    }, [confirm, sendMail, table])

    return (
        <>
            <Grid item sm={12} alignItems='end'>
                <Action sendMailSelect={sendMailSelection} />
            </Grid>
            <Grid item sm={12}>
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
                                                            {flexRender(
                                                                header.column.columnDef.header,
                                                                header.getContext()
                                                            )}
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
                            {table?.getFilteredRowModel().rows.length === 0 ? (
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
                                                        (classNames({ selected: row?.getIsSelected() }),
                                                        'cursor-pointer hover:bg-gray-200')
                                                    }
                                                    onClick={e => {
                                                        // router.push('/email-marketing/email/' + row.original._id)
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
            </Grid>
        </>
    )
}
