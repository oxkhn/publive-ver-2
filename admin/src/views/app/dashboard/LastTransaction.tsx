'use client'

// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Chip from '@mui/material/Chip'
import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar'
import { useColorScheme } from '@mui/material/styles'

// Third-party Imports
import classnames from 'classnames'

// Types Imports
import type { ThemeColor, SystemMode } from '@core/types'

// Components Imports
import OptionMenu from '@core/components/option-menu'

// Style Imports
import tableStyles from '@core/styles/table.module.css'

type DataType = {
    date: string
    trend: string
    imgName: string
    cardType: string
    cardNumber: string
    status: 'verified' | 'rejected' | 'pending' | 'on-hold'
}

type StatusObj = Record<
    DataType['status'],
    {
        text: string
        color: ThemeColor
    }
>

// Vars
const data: any[] = [
    {
        trend: '+$1,678',
        status: 'verified',
        cardType: '@lamlam10789',
        cardNumber: 'Lê Dương Bảo Lâm',
        imgName: 'visa',
        date: `17 Mar ${new Date().getFullYear()}`,
        gmv: '534M',
        itemSold: 2825,
        order: 2261,
        estc: '22.3M',
        roas: 23.8,
        tag1: 'High Retention',
        tag2: 'Upgraded',
        sellCat: 'Fabsol, SCL, Hair care',
        sellBrand: 'Omo Liquid, Lifebuoy Jarvis, Sunsilk'
    },
    {
        trend: '-$839',
        status: 'rejected',
        cardType: '@shopbackvn',
        cardNumber: 'Shopbackvn',
        imgName: 'mastercard',
        date: `12 Feb ${new Date().getFullYear()}`,
        gmv: '509.3M',
        itemSold: 2716,
        order: 1750,
        estc: '25.4M',
        roas: 20,
        tag1: 'Low Retention',
        tag2: 'Acquired',
        sellCat: 'Skin Care, Deo',
        sellBrand: 'Simple, Vaseline, Dove Deo'
    },
    {
        trend: '+$435',
        cardType: 'huaan',
        status: 'verified',
        cardNumber: 'HuaAnDaily',
        imgName: 'american-express',
        date: `28 Feb ${new Date().getFullYear()}`,
        gmv: '388M',
        itemSold: 1139,
        order: 1008,
        estc: '23.1M',
        roas: 16.8,
        tag1: 'One-time off',
        tag2: 'Likely churn',
        sellCat: 'Skin care, Fabsen',
        sellBrand: 'Simple, Comfort Fabsen'
    }
    // {
    //     trend: '+$2,345',
    //     status: 'pending',
    //     cardType: 'Credit',
    //     cardNumber: '*5699',
    //     imgName: 'visa',
    //     date: `08 Jan ${new Date().getFullYear()}`
    // },
    // {
    //     trend: '+$1,758',
    //     status: 'rejected',
    //     cardType: 'Credit',
    //     cardNumber: '*2451',
    //     imgName: 'visa',
    //     date: `19 Oct ${new Date().getFullYear()}`
    // }
]

const statusObj: StatusObj = {
    rejected: { text: 'Rejected', color: 'error' },
    pending: { text: 'Pending', color: 'secondary' },
    'on-hold': { text: 'On hold', color: 'warning' },
    verified: { text: 'Verified', color: 'success' }
}

const LastTransaction = ({ serverMode }: { serverMode: SystemMode }) => {
    // Hooks
    const { mode } = useColorScheme()

    // Vars
    const _mode = (mode === 'system' ? serverMode : mode) || serverMode

    return (
        <Card>
            <CardHeader
                title='Top Affiliate'
                action={<OptionMenu options={['Show all entries', 'Refresh', 'Download']} />}
            />
            <div className='overflow-x-auto'>
                <table className={tableStyles.table}>
                    <thead className='uppercase'>
                        <tr className='border-be'>
                            <th className='leading-6 plb-4 pis-6 pli-2'>Affilifate Name</th>
                            <th className='leading-6 plb-4 pie-6 pli-2 text-right'>Selling Cate</th>
                            <th className='leading-6 plb-4 pie-6 pli-2 text-right'>Selling Brands</th>
                            <th className='leading-6 plb-4 pie-6 pli-2 text-right'>GMV</th>

                            <th className='leading-6 plb-4 pie-6 pli-2 text-right'>Items sold</th>
                            <th className='leading-6 plb-4 pie-6 pli-2 text-right'>Orders</th>
                            <th className='leading-6 plb-4 pie-6 pli-2 text-right'>Est. Commission</th>
                            <th className='leading-6 plb-4 pie-6 pli-2 text-right'>ROAS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((row, index) => (
                            <tr key={index} className='border-0'>
                                <td className='pis-6 pli-2 plb-3'>
                                    <div className='flex items-center gap-4'>
                                        <div className='flex flex-col'>
                                            <Typography color='text.primary'>{row.cardNumber}</Typography>
                                            <Typography variant='body2' color='text.disabled'>
                                                {row.cardType}
                                            </Typography>

                                            <div className='flex gap-2 items-center'>
                                                <div className='text-sm px-1 w-fit rounded bg-gray-200'>{row.tag1}</div>
                                                <div className='text-sm px-1 w-fit rounded bg-gray-200'>{row.tag2}</div>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td className='pli-2 plb-3 pie-6 text-right'>
                                    <Typography color='text.primary'>{row.sellCat}</Typography>
                                </td>{' '}
                                <td className='pli-2 plb-3 pie-6 text-right'>
                                    <Typography color='text.primary'>{row.sellBrand}</Typography>
                                </td>
                                <td className='pli-2 plb-3 pie-6 text-right'>
                                    <Typography color='text.primary'>{row.gmv}</Typography>
                                </td>
                                <td className='pli-2 plb-3 pie-6 text-right'>
                                    <Typography color='text.primary'>{row.itemSold}</Typography>
                                </td>
                                <td className='pli-2 plb-3 pie-6 text-right'>
                                    <Typography color='text.primary'>{row.order}</Typography>
                                </td>
                                <td className='pli-2 plb-3 pie-6 text-right'>
                                    <Typography color='text.primary'>{row.estc}</Typography>
                                </td>
                                <td className='pli-2 plb-3 pie-6 text-right'>
                                    <Typography color='text.primary'>{row.roas}</Typography>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Card>
    )
}

export default LastTransaction
