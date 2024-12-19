'use client'

// React Imports
import { useEffect, useState, useMemo } from 'react'

// Next Imports
import Link from 'next/link'
import { useParams } from 'next/navigation'

// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'
import Checkbox from '@mui/material/Checkbox'
import IconButton from '@mui/material/IconButton'
import { styled } from '@mui/material/styles'
import TablePagination from '@mui/material/TablePagination'
import type { TextFieldProps } from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'

// Third-party Imports
import classnames from 'classnames'
import { rankItem } from '@tanstack/match-sorter-utils'
import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable,
    getFilteredRowModel,
    getFacetedRowModel,
    getFacetedUniqueValues,
    getFacetedMinMaxValues,
    getPaginationRowModel,
    getSortedRowModel
} from '@tanstack/react-table'
import type { ColumnDef, FilterFn } from '@tanstack/react-table'
import type { RankingInfo } from '@tanstack/match-sorter-utils'

// Type Imports
import type { ThemeColor } from '@core/types'

// Component Imports
import TableFilters from './TableFilters'
import AddUserDrawer from './AddUserDrawer'
import OptionMenu from '@core/components/option-menu'
import TablePaginationComponent from '@components/TablePaginationComponent'
import CustomTextField from '@core/components/mui/TextField'
import CustomAvatar from '@core/components/mui/Avatar'

// Util Imports
import { getInitials } from '@/utils/getInitials'

// Style Imports
import tableStyles from '@core/styles/table.module.css'
import { UsersType } from '@/types/userTypes'
import { ICRMData } from '@/types/crmData.type'
import { useCrmContext } from '@/services/provider/CrmProvider'
import Image from 'next/image'
import { CardContent } from '@mui/material'
import DialogUploadCSV from './DialogUploadCSV'
import { useModal } from '@/hooks/useModal'
import { useAuthContext } from '@/services/provider/AuthProvider'

declare module '@tanstack/table-core' {
    interface FilterFns {
        fuzzy: FilterFn<unknown>
    }
    interface FilterMeta {
        itemRank: RankingInfo
    }
}

type UserTypeWithAction = UsersType & {
    action?: string
}

type UserRoleType = {
    [key: string]: { icon: string; color: string }
}

type UserStatusType = {
    [key: string]: ThemeColor
}

// Styled Components
const Icon = styled('i')({})

const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
    // Rank the item
    const itemRank = rankItem(row.getValue(columnId), value)

    // Store the itemRank info
    addMeta({
        itemRank
    })

    // Return if the item should be filtered in/out
    return itemRank.passed
}

const DebouncedInput = ({
    value: initialValue,
    onChange,
    debounce = 500,
    ...props
}: {
    value: string | number
    onChange: (value: string | number) => void
    debounce?: number
} & Omit<TextFieldProps, 'onChange'>) => {
    // States
    const [value, setValue] = useState(initialValue)

    useEffect(() => {
        setValue(initialValue)
    }, [initialValue])

    useEffect(() => {
        const timeout = setTimeout(() => {
            onChange(value)
        }, debounce)

        return () => clearTimeout(timeout)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value])

    return <CustomTextField {...props} value={value} onChange={e => setValue(e.target.value)} />
}

// Column Definitions
const columnHelper = createColumnHelper<UserTypeWithAction>()

const UserListTable = () => {
    const { allUsers } = useAuthContext()

    function getTimeDifference(startDateString: string): string {
        // Chuyển đổi chuỗi ngày thành đối tượng Date
        const startDate: Date = new Date(startDateString)
        const now: Date = new Date()

        // Tính khoảng thời gian chênh lệch tính bằng mili giây
        const diffInMs: number = now.getTime() - startDate.getTime()

        // Chuyển đổi mili giây thành các đơn vị thời gian
        const millisecondsInHour: number = 1000 * 60 * 60
        const millisecondsInDay: number = millisecondsInHour * 24
        const millisecondsInMonth: number = millisecondsInDay * 30 // Giả định mỗi tháng có 30 ngày

        let result: string = ''

        if (diffInMs < millisecondsInDay) {
            // Trả về giờ
            const hours: number = Math.floor(diffInMs / millisecondsInHour)
            result = `${hours} giờ trước`
        } else if (diffInMs < millisecondsInMonth) {
            // Trả về ngày
            const days: number = Math.floor(diffInMs / millisecondsInDay)
            result = `${days} ngày trước`
        } else {
            // Trả về tháng
            const months: number = Math.floor(diffInMs / millisecondsInMonth)
            result = `${months} tháng trước`
        }

        return result
    }

    const columns = useMemo<ColumnDef<UserTypeWithAction, any>[]>(
        () => [
            columnHelper.accessor('name', {
                header: 'User',
                cell: ({ row }) => (
                    <div className='flex items-center gap-4'>
                        {/* {getAvatar({ avatar: '', fullName: row.original.affiliateName })} */}
                        <div className='flex items-center gap-2'>
                            <img src='row.original.avatar' className='w-[50px] h-[50px] rounded-md' alt='' />
                            <Typography variant='body2'>{row.original.name}</Typography>
                        </div>
                    </div>
                )
            }),
            columnHelper.accessor('email', {
                header: 'Email',
                cell: ({ row }) => <Typography variant='body2'>{row.original.email}</Typography>
            }),
            columnHelper.accessor('phoneNumber', {
                header: 'Số điện thoại',
                cell: ({ row }) => (
                    <div className='flex items-center gap-4'>
                        <Chip variant='tonal' label={row.original.phoneNumber} size='small' className='capitalize' />
                    </div>
                )
            }),
            columnHelper.accessor('social.shopeeUsername', {
                header: 'Shoppe username',
                cell: ({ row }) => (
                    <div className='flex items-center gap-4'>
                        <p className='capitalize'>{row.original.social.shopeeUsername.linkUrl}</p>
                    </div>
                )
            }),
            columnHelper.accessor('affiliateLinkCopied', {
                header: 'Số link affiliate đã lưu',
                cell: ({ row }) => (
                    <div className='flex items-center gap-4'>
                        <p className='capitalize'>{row.original.affiliateLinkCopied}</p>
                    </div>
                )
            }),
            columnHelper.accessor('lastActive', {
                header: 'Lần cuối truy cập',
                cell: ({ row }) => (
                    <div className='flex items-center gap-4'>
                        <p className='capitalize'>{getTimeDifference(row.original.lastActive)}</p>
                    </div>
                )
            })
            // columnHelper.accessor('action', {
            //     header: 'Action',
            //     cell: ({ row }) => (
            //         <div className='flex items-center'>
            //             <IconButton color='success'>
            //                 <i className='tabler-pencil-minus' />
            //             </IconButton>

            //             <IconButton color='secondary'>
            //                 <i className='tabler-trash' />
            //             </IconButton>
            //         </div>
            //     )
            // })
        ],
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [allUsers]
    )

    const table = useReactTable({
        data: allUsers as UsersType[],
        columns,
        filterFns: {
            fuzzy: fuzzyFilter
        },
        initialState: {
            pagination: {
                pageSize: 10
            }
        },
        enableRowSelection: true, //enable row selection for all rows
        // enableRowSelection: row => row.original.age > 18, // or enable row selection conditionally per row
        globalFilterFn: fuzzyFilter,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getFacetedRowModel: getFacetedRowModel(),
        getFacetedUniqueValues: getFacetedUniqueValues(),
        getFacetedMinMaxValues: getFacetedMinMaxValues()
    })

    const { isOpenModal, closeModal, openModal } = useModal()

    return (
        <>
            <Card>
                <DialogUploadCSV open={isOpenModal} handleClose={closeModal} />
                {/* <CardContent className='pbe-4 flex justify-end'>
                    <Button
                        variant='contained'
                        color='primary'
                        startIcon={<i className='tabler-plus' />}
                        onClick={openModal}
                    >
                        Upload CRM
                    </Button>
                </CardContent> */}
                <div className='flex justify-between flex-col items-start md:flex-row md:items-center p-6 border-bs gap-4'>
                    <CustomTextField
                        select
                        value={table.getState().pagination.pageSize}
                        onChange={e => table.setPageSize(Number(e.target.value))}
                        className='max-sm:is-full sm:is-[70px]'
                    >
                        <MenuItem value='10'>10</MenuItem>
                        <MenuItem value='25'>25</MenuItem>
                        <MenuItem value='50'>50</MenuItem>
                    </CustomTextField>
                    <div className='flex flex-col sm:flex-row max-sm:is-full items-start sm:items-center gap-4'></div>
                </div>
                <div className='overflow-x-auto'>
                    <table className={tableStyles.table}>
                        <thead>
                            {table.getHeaderGroups().map(headerGroup => (
                                <tr key={headerGroup.id}>
                                    {headerGroup.headers.map(header => (
                                        <th key={header.id}>
                                            {header.isPlaceholder ? null : (
                                                <>
                                                    <div
                                                        className={classnames({
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
                                            <tr key={row.id} className={classnames({ selected: row.getIsSelected() })}>
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
                </div>
                <TablePagination
                    component={() => <TablePaginationComponent table={table} />}
                    count={table.getFilteredRowModel().rows.length}
                    rowsPerPage={table.getState().pagination.pageSize}
                    page={table.getState().pagination.pageIndex}
                    onPageChange={(_, page) => {
                        table.setPageIndex(page)
                    }}
                />
            </Card>
        </>
    )
}

export default UserListTable
