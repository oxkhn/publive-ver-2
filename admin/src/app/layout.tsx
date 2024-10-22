// Third-party Imports
import 'react-perfect-scrollbar/dist/css/styles.css'

// Type Imports
import type { ChildrenType } from '@core/types'

// Style Imports
import '@/app/globals.css'
import { Inter } from 'next/font/google'

// Generated Icon CSS Imports
import '@assets/iconify-icons/generated-icons.css'

export const metadata = {
    title: 'PubLive',
    description:
        'Tham gia PubLive ngay hôm nay, chia sẻ sản phẩm yêu thích và nhận hoa hồng không giới hạn cho mỗi giao dịch thành công!'
}

const inter = Inter({ subsets: ['latin'] })

const RootLayout = ({ children }: ChildrenType) => {
    // Vars
    const direction = 'ltr'

    return (
        <html id='__next' lang='en' dir={direction} className={inter.className}>
            <body className='flex is-full min-bs-full flex-auto flex-col'>{children}</body>
        </html>
    )
}

export default RootLayout
