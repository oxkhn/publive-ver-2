export const ensurePrefix = (str: string, prefix: string) => (str.startsWith(prefix) ? str : `${prefix}${str}`)
export const withoutSuffix = (str: string, suffix: string) =>
    str.endsWith(suffix) ? str.slice(0, -suffix.length) : str
export const withoutPrefix = (str: string, prefix: string) => (str.startsWith(prefix) ? str.slice(prefix.length) : str)

export const formatVND = (amount: number) => {
    return amount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })
}
export function formatDateToDDMMYYYY(input: string): string {
    // Ensure input is a non-empty string
    if (!input || typeof input !== 'string') {
        throw new Error('Invalid date format: input should be a non-empty string')
    }

    // Convert the input string to a Date object
    const date = new Date(input.trim())

    // Check if the Date object is valid
    if (isNaN(date.getTime())) {
        throw new Error('Invalid date format')
    }

    // Extract day, month, and year
    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const year = date.getFullYear()

    return `${day}/${month}/${year}`
}

export const isStringValid = (value: string) => {
    return value && value.trim().length > 0 // Checks if string is not empty or only whitespace
}

export const isValidURL = (value: string) => {
    const urlPattern = new RegExp(
        '^(https?:\\/\\/)?' + // validate the protocol
            '((([a-zA-Z\\d]([a-zA-Z\\d-]*[a-zA-Z\\d])*)\\.?)+[a-zA-Z]{2,}|' + // domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
            '(\\:\\d+)?(\\/[-a-zA-Z\\d%_.~+]*)*' + // port and path
            '(\\?[;&a-zA-Z\\d%_.~+=-]*)?' + // query string
            '(\\#[-a-zA-Z\\d_]*)?$',
        'i'
    ) // fragment locator
    return !!urlPattern.test(value)
}

export function calculateTimePassed(startDate: string | Date): string | null {
    if (!startDate) {
        console.log('Invalid start date.')
        return null
    }

    const start = new Date(startDate)
    if (isNaN(start.getTime())) {
        console.log('Invalid start date.')
        return null
    }

    const now = new Date()
    const diffInMs = now.getTime() - start.getTime()

    // If more than 1 day has passed, calculate in days
    const daysPassed = Math.floor(diffInMs / (1000 * 60 * 60 * 24))
    if (daysPassed >= 1) {
        return `${daysPassed} day(s) ago`
    }

    // If less than 1 day but more than 1 hour has passed, calculate in hours
    const hoursPassed = Math.floor(diffInMs / (1000 * 60 * 60))
    if (hoursPassed >= 1) {
        return `${hoursPassed} hour(s) ago`
    }

    // If less than 1 hour, calculate in minutes
    const minutesPassed = Math.floor(diffInMs / (1000 * 60))
    return `${minutesPassed} minute(s) ago`
}
