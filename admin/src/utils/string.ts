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
