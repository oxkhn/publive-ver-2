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
        cardType: '2820087763',
        cardNumber: 'Nước giặt OMO Matic 3,6kg/3.9kg/ 4.1kg (Túi)',
        imgName: 'visa',
        date: `17 Mar ${new Date().getFullYear()}`,
        gmv: '1,4B',
        itemSold: 9880,
        order: 8639,
        estc: '44.9M',
        roas: 41.4
    },
    {
        trend: '-$839',
        status: 'rejected',
        cardType: '2855276371',
        cardNumber: 'Sữa Tắm Lifebuoy 800gr Detox Và Sạch Sâu Khỏi Bụi Mịn Pm2.5 Detox 100% Từ Thiên Nhiên Diệt Khuẩn',
        imgName: 'mastercard',
        date: `12 Feb ${new Date().getFullYear()}`,
        gmv: '1.5B',
        itemSold: 4110,
        order: 3978,
        estc: '46.9M',
        roas: 32.1
    },
    {
        trend: '+$435',
        cardType: '20567055749',
        status: 'verified',
        cardNumber: '[CHÍNH HÃNG ĐỘC QUYỀN] Smoothie Tẩy Tế Bào Chết Body Dove Chăm Da Sáng Mịn 298g',
        imgName: 'american-express',
        date: `28 Feb ${new Date().getFullYear()}`,
        gmv: '1.02B',
        itemSold: 3187,
        order: 3184,
        estc: '138.9M',
        roas: 7.3
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

const LastProduct = ({ serverMode }: { serverMode: SystemMode }) => {
    // Hooks
    const { mode } = useColorScheme()

    // Vars
    const _mode = (mode === 'system' ? serverMode : mode) || serverMode

    return (
        <Card>
            <CardHeader
                title='Top Products'
                action={<OptionMenu options={['Show all entries', 'Refresh', 'Download']} />}
            />
            <div className='overflow-x-auto'>
                <table className={tableStyles.table}>
                    <thead className='uppercase'>
                        <tr className='border-be'>
                            <th className='leading-6 plb-4 pis-6 pli-2'>Product Info</th>
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
                                        {/* <Avatar
                                            variant='rounded'
                                            className={classnames('is-[50px] bs-[30px]', {
                                                'bg-white': _mode === 'dark',
                                                'bg-actionHover': _mode === 'light'
                                            })}
                                        >
                                            <img
                                                width={30}
                                                alt={row.imgName}
                                                src={`/images/logos/${row.imgName}.png`}
                                            />
                                        </Avatar> */}
                                        <div className='flex flex-col max-w-[400px]'>
                                            <Typography color='text.primary' className='line-clamp-1 truncate'>
                                                {row.cardNumber}
                                            </Typography>
                                            <Typography variant='body2' color='text.disabled'>
                                                {row.cardType}
                                            </Typography>
                                        </div>
                                    </div>
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

export default LastProduct
