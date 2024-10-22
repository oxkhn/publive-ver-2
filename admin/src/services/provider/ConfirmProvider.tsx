// components/ConfirmContext.tsx
'use client'
import DialogConfirm from '@/components/DialogConfirm'
import React, { createContext, useContext, useState, ReactNode } from 'react'

interface ConfirmContextProps {
    confirm: (message: string) => Promise<boolean>
}

const ConfirmContext = createContext<ConfirmContextProps | undefined>(undefined)

export const ConfirmProvider = ({ children }: { children: ReactNode }) => {
    const [isDialogVisible, setIsDialogVisible] = useState(false)
    const [message, setMessage] = useState<string>('')
    const [resolvePromise, setResolvePromise] = useState<(value: boolean) => void>(() => () => {})

    const confirm = (message: string): Promise<boolean> => {
        setMessage(message)
        setIsDialogVisible(true)
        return new Promise<boolean>(resolve => {
            setResolvePromise(() => resolve)
        })
    }

    const handleConfirm = () => {
        resolvePromise(true)
        setIsDialogVisible(false)
    }

    const handleCancel = () => {
        resolvePromise(false)
        setIsDialogVisible(false)
    }

    return (
        <ConfirmContext.Provider value={{ confirm }}>
            {children}
            <DialogConfirm
                isDialogVisible={isDialogVisible}
                setIsDialogVisible={setIsDialogVisible}
                onDeleted={handleConfirm}
                onCancel={handleCancel}
                message={message}
            />
        </ConfirmContext.Provider>
    )
}

export const useConfirm = (): ConfirmContextProps => {
    const context = useContext(ConfirmContext)
    if (context === undefined) {
        throw new Error('useConfirm must be used within a ConfirmProvider')
    }
    return context
}
