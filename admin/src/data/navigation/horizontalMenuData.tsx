// Type Imports
import type { HorizontalMenuDataType } from '@/types/menuTypes'

const horizontalMenuData = (): HorizontalMenuDataType[] => [
    {
        label: 'Deal Management',
        href: '/deal-management',
        icon: 'tabler-smart-home',
        children: [
            {
                label: 'Deal Management',
                href: '/deal-management',
                icon: 'tabler-smart-home'
            }
        ]
    }
]

export default horizontalMenuData
