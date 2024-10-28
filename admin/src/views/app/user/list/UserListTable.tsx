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

declare module '@tanstack/table-core' {
    interface FilterFns {
        fuzzy: FilterFn<unknown>
    }
    interface FilterMeta {
        itemRank: RankingInfo
    }
}

type ICRMDataTypeWithAction = ICRMData & {
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

// Vars
const userRoleObj: UserRoleType = {
    admin: { icon: 'tabler-crown', color: 'error' },
    author: { icon: 'tabler-device-desktop', color: 'warning' },
    editor: { icon: 'tabler-edit', color: 'info' },
    maintainer: { icon: 'tabler-chart-pie', color: 'success' },
    subscriber: { icon: 'tabler-user', color: 'primary' }
}

const userStatusObj: UserStatusType = {
    'PC Contributor': 'success',
    'Mass 1UL': 'warning',
    'HC Contributor': 'secondary'
}

// Column Definitions
const columnHelper = createColumnHelper<ICRMDataTypeWithAction>()

const UserListTable = () => {
    const { affiliates } = useCrmContext()
    // States
    const [addUserOpen, setAddUserOpen] = useState(false)
    const [rowSelection, setRowSelection] = useState({})
    const [data, setData] = useState(...[affiliates])
    const [filteredData, setFilteredData] = useState(data)
    const [globalFilter, setGlobalFilter] = useState('')

    useEffect(() => {
        setData(affiliates)
        setFilteredData(affiliates)
    }, [affiliates])

    const columns = useMemo<ColumnDef<ICRMDataTypeWithAction, any>[]>(
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
                header: 'User',
                cell: ({ row }) => (
                    <div className='flex items-center gap-4'>
                        {/* {getAvatar({ avatar: '', fullName: row.original.affiliateName })} */}
                        <div className='flex flex-col'>
                            <Typography color='text.primary' className='font-medium'>
                                {row.original.affiliateName}
                            </Typography>
                            <Typography variant='body2'>{row.original.userName}</Typography>
                        </div>
                    </div>
                )
            }),
            columnHelper.accessor('kolType', {
                header: 'Kol Type',
                cell: ({ row }) => (
                    <div className='flex items-center gap-4'>
                        <Chip
                            variant='tonal'
                            label={row.original.kolType}
                            size='small'
                            color={userStatusObj[row.original.kolType]}
                            className='capitalize'
                        />
                    </div>
                )
            }),
            columnHelper.accessor('retention', {
                header: 'Retention',
                cell: ({ row }) => (
                    <div className='flex items-center gap-4'>
                        <Chip variant='tonal' label={row.original.retention} size='small' className='capitalize' />
                    </div>
                )
            }),
            columnHelper.accessor('followers', {
                header: 'Followers',
                cell: ({ row }) => (
                    <div className='flex items-center gap-4'>
                        <p className='capitalize'>{row.original.followers}</p>
                    </div>
                )
            }),
            columnHelper.accessor('facebook', {
                header: 'Social',
                cell: ({ row }) => (
                    <div className='mt-2.5 flex items-center gap-3'>
                        {row.original.tiktokLink && (
                            <Link href={row.original.tiktokLink} target='_blank'>
                                <Image
                                    alt=''
                                    src='/logoSocials/tiktok_1.svg'
                                    className='h-4 w-4 hover:bg-grays/10'
                                    width={20}
                                    height={20}
                                />
                            </Link>
                        )}

                        {row.original.facebookLink && (
                            <Link
                                target='_blank'
                                href={row.original.facebookLink}
                                className='cursor-pointer rounded-full p-1 hover:bg-grays/15'
                            >
                                <Image alt='' src='/logoSocials/fb_1.svg' className='h-4 w-4' width={20} height={20} />
                            </Link>
                        )}
                        {row.original.youtubeLink && (
                            <Link
                                target='_blank'
                                href={row.original.youtubeLink}
                                className='cursor-pointer rounded-full p-1 hover:bg-grays/15'
                            >
                                <Image alt='' src='/logoSocials/yt_1.svg' className='h-4 w-4' width={20} height={20} />
                            </Link>
                        )}
                        {row.original.shopeeLSLink && (
                            <Link
                                target='_blank'
                                href={row.original.shopeeLSLink}
                                className='cursor-pointer rounded-full p-1 hover:bg-grays/15'
                            >
                                <Image
                                    alt=''
                                    src='/logoSocials/shopee_1.svg'
                                    className='h-4 w-4'
                                    width={20}
                                    height={20}
                                />
                            </Link>
                        )}
                    </div>
                )
            })
        ],
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [data, filteredData]
    )

    const table = useReactTable({
        data: filteredData as ICRMData[],
        columns,
        filterFns: {
            fuzzy: fuzzyFilter
        },
        state: {
            rowSelection,
            globalFilter
        },
        initialState: {
            pagination: {
                pageSize: 10
            }
        },
        enableRowSelection: true, //enable row selection for all rows
        // enableRowSelection: row => row.original.age > 18, // or enable row selection conditionally per row
        globalFilterFn: fuzzyFilter,
        onRowSelectionChange: setRowSelection,
        getCoreRowModel: getCoreRowModel(),
        onGlobalFilterChange: setGlobalFilter,
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getFacetedRowModel: getFacetedRowModel(),
        getFacetedUniqueValues: getFacetedUniqueValues(),
        getFacetedMinMaxValues: getFacetedMinMaxValues()
    })

    const getAvatar = (params: Pick<UsersType, 'avatar' | 'fullName'>) => {
        const { avatar, fullName } = params

        if (avatar) {
            return <CustomAvatar src={avatar} size={34} />
        } else {
            return <CustomAvatar size={34}>{getInitials(fullName as string)}</CustomAvatar>
        }
    }

    return (
        <>
            <Card>
                <CardHeader title='Filters' className='pbe-4' />
                {/* <TableFilters setData={setFilteredData} tableData={data} /> */}
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
                    <div className='flex flex-col sm:flex-row max-sm:is-full items-start sm:items-center gap-4'>
                        <DebouncedInput
                            value={globalFilter ?? ''}
                            onChange={value => setGlobalFilter(String(value))}
                            placeholder='Search User'
                            className='max-sm:is-full'
                        />
                    </div>
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
