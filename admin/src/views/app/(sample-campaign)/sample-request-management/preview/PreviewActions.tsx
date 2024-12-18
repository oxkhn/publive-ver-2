// React Imports
import { useState } from 'react'

// Next Imports
import Link from 'next/link'
import { useParams } from 'next/navigation'

// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'

// Type Imports

// Component Imports

// Util Imports

const PreviewActions = ({ onButtonClick }: { onButtonClick: () => void }) => {
    // Hooks

    return (
        <>
            <Card>
                <CardContent className='flex flex-col gap-4'>
                    <Button
                        fullWidth
                        variant='contained'
                        className='capitalize'
                        startIcon={<i className='tabler-send' />}
                        onClick={() => {}}
                    >
                        Send Invoice
                    </Button>
                    <Button fullWidth color='secondary' variant='tonal' className='capitalize'>
                        Download
                    </Button>
                    <div className='flex items-center gap-4'>
                        <Button
                            fullWidth
                            color='secondary'
                            variant='tonal'
                            className='capitalize'
                            onClick={onButtonClick}
                        >
                            Print
                        </Button>
                        <Button fullWidth component={Link} color='secondary' variant='tonal' className='capitalize'>
                            Edit
                        </Button>
                    </div>
                    <Button
                        fullWidth
                        color='success'
                        variant='contained'
                        className='capitalize'
                        onClick={() => {}}
                        startIcon={<i className='tabler-currency-dollar' />}
                    >
                        Add Payment
                    </Button>
                </CardContent>
            </Card>
        </>
    )
}

export default PreviewActions
