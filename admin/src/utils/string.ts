export const ensurePrefix = (str: string, prefix: string) => (str.startsWith(prefix) ? str : `${prefix}${str}`)
export const withoutSuffix = (str: string, suffix: string) =>
    str.endsWith(suffix) ? str.slice(0, -suffix.length) : str
export const withoutPrefix = (str: string, prefix: string) => (str.startsWith(prefix) ? str.slice(prefix.length) : str)

export const formatVND = (amount: number) => {
    return amount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })
}

export function formatDateToDDMMYYYY(input: string): string {
    // Convert the input string to a Date object
    const date = new Date(input)

    // Ensure that the input string is converted into a valid Date object
    if (isNaN(date.getTime())) {
        throw new Error('Invalid date format')
    }

    // Extract day, month, and year
    const day = String(date.getDate()).padStart(2, '0') // Get the day
    const month = String(date.getMonth() + 1).padStart(2, '0') // Get the month (0-based, so add 1)
    const year = date.getFullYear() // Get the full year

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
