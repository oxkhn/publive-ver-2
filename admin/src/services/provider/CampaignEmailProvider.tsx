'use client'
import { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { usePostCreateCampaignEmail } from '../api/email/usePostCreateCampaignEmail'
import { CampaignEmailType } from '@/types/campaignEmail.type'
import { useGetCampaigns } from '../api/email/useGetCampaigns'
import { useDeleteCampaign } from '../api/email/useDeleteCampaign'
import { usePostEmailViaCsv } from '../api/email/usePostEmailViaCsv'
import { useGetEmails } from '../api/email/useGetEmails'
import { PartnerType } from '@/types/partner.type'
import { useDeleteEmail } from '../api/email/useDeleteEmail'
import { useCreateEmail } from '../api/email/useCreateEmail'
import { useGetCampaign } from '../api/email/useGetCampaign'
import { usePostTemplate } from '../api/email/usePostTemplate'
import { useGetTemplate } from '../api/email/useGetTemplate'
import { usePostConfig } from '../api/email/usePostConfig'
import { usePostSendMail } from '../api/email/usePostSendMail'
import { useGetTemplateContent } from '../api/email/useGetTemplateContent'
import { usePostTemplateCustom } from '../api/email/usePostTemplateCustom'

type CampaignEmailContextProps = {
    campaigns: CampaignEmailType[]
    emails: PartnerType[]
    campaignDetail: CampaignEmailType | undefined
    templates: any[]
    createCampaign: () => void
    reloadData: () => void
    deleteCampaign: (id: string) => Promise<void>
    createEmailFromCSV: (file: any, id: string) => void
    uploadTemplate: (file: any) => void
    getEmails: (id: string) => Promise<void>
    deleteEmail: (id: string) => Promise<void>
    createEmail: (email: PartnerType) => Promise<void>
    handleFilterEmail: (value: string, campaignId: string) => void
    initCampaign: (id: string) => void
    handleInputCampaignChange: (value: any, name: keyof CampaignEmailType) => void
    postConfig: () => void
    getTemplateContent: (filename: string) => Promise<any>
    sendMail: (emails: string[], id: string) => Promise<void>
    createTemplateCustom: (banner: any, content: string, name: string) => Promise<any>
}
const CampaignEmailContext = createContext<CampaignEmailContextProps | undefined>(undefined)

const defaultConfig = {
    name: '',
    note: '',
    subject: '',
    templatePath: '',
    createBy: '',
    host: '',
    port: 0,
    secure: false,
    username: '',
    password: '',
    startDate: new Date(),
    endDate: new Date(),
    pushlishTime: new Date(),
    publisher: '',
    status: 'edit',
    _id: ''
}

export const CampaignEmailProvider = (props: PropsWithChildren) => {
    const [campaigns, setCampaigns] = useState<CampaignEmailType[]>([])
    const [emails, setEmails] = useState<PartnerType[]>([])
    const [campaignDetail, setCampaignDetail] = useState<CampaignEmailType>(defaultConfig)
    const [templates, setTemplates] = useState([])

    const [filterEmail, setFilterEmail] = useState({
        name: '',
        email: ''
    })

    const _getCampaigns = useGetCampaigns()
    const getCampaigns = async () => {
        try {
            const res = await _getCampaigns.mutateAsync()
            setCampaigns(res.data)
        } catch (error) {}
    }

    const reloadData = () => {
        getCampaigns()
    }

    const _postCreateCampaign = usePostCreateCampaignEmail()
    const createCampaign = async () => {
        try {
            toast
                .promise(_postCreateCampaign.mutateAsync(campaignDetail), {
                    pending: 'Khởi tạo campaign ...',
                    success: 'Tạo campaign thành công.',
                    error: 'Tạo campaign thất bai.'
                })
                .then(res => {
                    getCampaigns()
                })
        } catch (error) {
            toast.error('Tạo campaign thất bai.')
        }
    }

    const _postCreateEmail = useCreateEmail()
    const createEmail = async (email: PartnerType) => {
        try {
            await _postCreateEmail
                .mutateAsync(email)
                .then(() => {
                    toast.success('Thêm email thành công.')
                    return true
                })
                .catch(() => {
                    toast.error('Thêm email thất bại.')
                    return false
                })

            getEmails(email.campaignId)
        } catch (error) {}
    }

    const _deleteCampaign = useDeleteCampaign()
    const deleteCampaign = async (id: string): Promise<void> => {
        try {
            await _deleteCampaign.mutateAsync(id)
            getCampaigns()
            return
        } catch (error) {}
    }

    const _deleteEmail = useDeleteEmail()
    const deleteEmail = async (id: string): Promise<void> => {
        try {
            await _deleteEmail.mutateAsync(id)
            return
        } catch (error) {}
    }

    const _createEmailCsv = usePostEmailViaCsv()
    const createEmailFromCSV = async (file: any, id: string) => {
        try {
            const formData = new FormData()
            formData.append('file', file)

            await _createEmailCsv
                .mutateAsync({ formData, id })
                .then(() => {
                    toast.success('Upload file thành công.')
                    return true
                })
                .catch(() => {
                    toast.error('Upload file thất bại.')
                    return false
                })
        } catch (error) {
            toast.error('Upload email fail.')
        }
    }

    const _getEmail = useGetEmails()
    const getEmails = async (id: string) => {
        try {
            _getEmail.mutateAsync({ id, data: filterEmail }).then(res => {
                setEmails(res.data)
            })
        } catch (error) {}
    }

    const handleFilterEmail = async (value: string, campaignId: string) => {
        try {
            const data = { name: value, email: value }
            const res = await _getEmail.mutateAsync({ id: campaignId, data })
            setEmails(res.data)
        } catch (error) {}
    }

    const _getCampaign = useGetCampaign()
    const initCampaign = async (id: string) => {
        try {
            const res = await _getCampaign.mutateAsync(id)
            setCampaignDetail(res.data)
        } catch (error) {}
    }

    const handleInputCampaignChange = (value: any, name: keyof CampaignEmailType) => {
        setCampaignDetail((prevData: any) => {
            const updatedData = {
                ...prevData,
                [name]: value
            }

            return updatedData
        })
    }

    const _uploadTemplate = usePostTemplate()
    const uploadTemplate = async (file: any) => {
        const formData = new FormData()
        formData.append('file', file)

        await _uploadTemplate
            .mutateAsync(formData)
            .then(() => {
                toast.success('Upload file thành công.')
                return true
            })
            .catch(() => {
                toast.error('Upload file thất bại.')
                return false
            })
    }

    const _getTemplates = useGetTemplate()
    const getTemplate = async () => {
        try {
            const res = await _getTemplates.mutateAsync()
            setTemplates(res.data)
        } catch (error) {}
    }

    const _updateConfig = usePostConfig()
    const postConfig = async () => {
        try {
            await _updateConfig
                .mutateAsync(campaignDetail)
                .then(() => {
                    toast.success('Upload config thành công.')
                    return true
                })
                .catch(() => {
                    toast.error('Upload config thất bại.')
                    return false
                })
        } catch (error) {}
    }

    const _sendMail = usePostSendMail()
    const sendMail = async (emails: string[], id: string) => {
        try {
            const body = {
                data: emails,
                id: id
            }

            await _sendMail
                .mutateAsync(body)
                .then(() => {
                    toast.success('Gửi mail thành công.')
                    return true
                })
                .catch(() => {
                    toast.error('Gửi mail thất bại.')
                    return false
                })
        } catch (error) {}
    }

    const _getTemplateContent = useGetTemplateContent()
    const getTemplateContent = async (fileName: string) => {
        try {
            if (fileName != '') {
                const res = await _getTemplateContent.mutateAsync(fileName)
                return res.data
            }
        } catch (error) {}
    }

    const _postTemplateCustom = usePostTemplateCustom()
    const createTemplateCustom = async (banner: any, content: string, name: string) => {
        try {
            const formData = new FormData()
            formData.append('banner', banner)
            formData.append('content', content)
            formData.append('name', name)

            await _postTemplateCustom.mutateAsync(formData)
            getTemplate()
        } catch (error) {
            toast.error('Create fail.')
        }
    }

    useEffect(() => {
        getCampaigns()
        getTemplate()
    }, [])

    const value = {
        campaigns,
        emails,
        campaignDetail,
        templates,
        handleFilterEmail,
        createCampaign,
        reloadData,
        deleteCampaign,
        createEmailFromCSV,
        getEmails,
        deleteEmail,
        createEmail,
        initCampaign,
        handleInputCampaignChange,
        uploadTemplate,
        postConfig,
        sendMail,
        getTemplateContent,
        createTemplateCustom
    }
    return <CampaignEmailContext.Provider value={value}>{props.children}</CampaignEmailContext.Provider>
}

export const useCampaignEmailContext = () => {
    const context = useContext(CampaignEmailContext)
    if (context === undefined) {
        throw new Error('useCampaignEmailContext must be used within a CampaignEmailContext')
    }
    return context
}
