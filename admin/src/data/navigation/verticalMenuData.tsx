// Type Imports
import type { VerticalMenuDataType } from '@/types/menuTypes'

const verticalMenuData = (): VerticalMenuDataType[] => [
    {
        label: 'Deal Management',
        icon: 'tabler-align-box-right-stretch',
        href: '/deal-management'
    },
    {
        label: 'Activity Management',
        icon: 'tabler-campfire',
        href: '/activity-management'
    },
    {
        label: 'Email Marketing',
        icon: 'tabler-mail-forward',
        href: '/email-marketing'
    },
    {
        label: 'Sample Campaign',
        icon: 'tabler-forms',
        children: [
            {
                label: 'Sample Request Management',
                href: '/sample-request-management'
            },
            {
                label: 'Stock management',
                href: '/stock-management'
            }
        ]
    }
    // {
    //     label: 'Content Library',
    //     icon: 'tabler-smart-home',
    //     children: [
    //         {
    //             label: 'Content trending'
    //         },
    //         {
    //             label: 'Training Content Gallery'
    //         },
    //         {
    //             label: 'Brand Footage & Stock',
    //             href: '/content-library/brand-footage'
    //         }
    //     ]
    // },
    // {
    //     label: 'Affiliate Performance Management',
    //     icon: 'tabler-smart-home',
    //     children: [
    //         { label: 'Affiliate Performance tracker' },
    //         {
    //             label: 'MCN ranking'
    //         },
    //         { label: 'Campaign Winner Management' }
    //     ]
    // },
    // {
    //     label: 'CRM',
    //     icon: 'tabler-smart-home'
    // }
]

export default verticalMenuData
