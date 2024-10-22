'use client'

import { useState } from 'react'

export const useModal = (initState = false) => {
    const [isOpenModal, setIsOpenModal] = useState(initState)

    const closeModal = () => {
        if (isOpenModal) setIsOpenModal(false)
    }

    const openModal = () => {
        if (!isOpenModal) setIsOpenModal(true)
    }

    return {
        isOpenModal,
        closeModal,
        openModal
    }
}
