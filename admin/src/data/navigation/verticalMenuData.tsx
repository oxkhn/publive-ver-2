// Type Imports
import type { VerticalMenuDataType } from '@/types/menuTypes'

const verticalMenuData = (): VerticalMenuDataType[] => [
    {
        label: 'Dashboard',
        suffix: {
            label: '5',
            color: 'error'
        },
        icon: 'tabler-smart-home',
        children: [
            // This is how you will normally render menu item
            {
                label: 'CRM',
                icon: 'tabler-circle',
                href: '/dashboards/crm'
            },
            {
                label: 'Analytics',
                icon: 'tabler-circle',
                href: '/dashboards/analytics'
            },
            {
                label: 'Ecommerce',
                icon: 'tabler-circle',
                href: '/dashboards/ecommerce'
            },
            {
                label: 'Academy',
                icon: 'tabler-circle',
                href: '/dashboards/academy'
            },
            {
                label: 'Logistics',
                icon: 'tabler-circle',
                href: '/dashboards/logistics'
            }
        ]
    },
    { label: 'System management', isSection: false },
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
        label: 'Affiliate Management',
        icon: 'tabler-align-box-right-stretch',
        href: '/affiliate-management'
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
    },
    {
        label: 'Content Library',
        icon: 'tabler-smart-home',
        children: [
            {
                label: 'Content trending'
            },
            {
                label: 'Training Content Gallery'
            },
            {
                label: 'Brand Footage & Stock',
                href: '/content-library/brand-footage'
            }
        ]
    },
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
    {
        label: 'CRM',
        icon: 'tabler-smart-home',
        children: [
            {
                label: 'Dashboard',
                href: '/crm/dashboard'
            },
            {
                label: 'User List',
                href: '/crm'
            },
            {
                label: 'User List1',
                href: '/crm/user-list1'
            }
        ]
    },
    {
        label: 'Traffic measurement',
        icon: 'tabler-brand-google-analytics',
        href: '/traffic-measurement'
    },
    {
        label: 'Sample product',
        icon: 'tabler-brand-google-analytics',
        children: [
            {
                label: 'Product management',
                href: '/product-management'
            },
            {
                label: 'KOC management',
                href: '/koc-management'
            }
        ]
    },
    {
        label: 'Calender',
        icon: 'tabler-brand-google-analytics',
        href: '/dashboardEcom'
    }
]

export default verticalMenuData
