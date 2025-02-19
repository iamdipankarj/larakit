export function formatString(input: string) {
    return input
        .toLowerCase() // Convert the entire string to lowercase
        .replace(/_/g, ' ') // Replace underscores with spaces
        .replace(/\b\w/g, (char) => char.toUpperCase()) // Capitalize the first letter of each word
}

export const LARAKIT_LOCAL_ORG_CODE = 'larakit_local_org_code'
export const LARAKIT_ORG_CODE = 'larakit_org_code'

export function abbreviateNumber(num: number): string {
    if (num < 1000) {
        return num.toString()
    } else if (num < 100000) {
        return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K'
    } else if (num < 10000000) {
        return (num / 100000).toFixed(1).replace(/\.0$/, '') + 'L'
    } else {
        return (num / 10000000).toFixed(1).replace(/\.0$/, '') + 'Cr'
    }
}

// @TODO Reduce duplication
export function abbreviateNumberWithSuffix(num: number): {
    formattedValue: number
    suffix: string
} {
    if (num < 1000) {
        return { formattedValue: num, suffix: '' } // Less than 1,000
    } else if (num < 100000) {
        return {
            formattedValue: Math.floor((num / 1000) * 100) / 100,
            suffix: 'K'
        } // Thousands
    } else if (num < 10000000) {
        return {
            formattedValue: Math.floor((num / 100000) * 100) / 100,
            suffix: 'L'
        } // Lakhs
    } else {
        return {
            formattedValue: Math.floor((num / 10000000) * 100) / 100,
            suffix: 'Cr'
        } // Crores
    }
}

export function getFormattedCurrency(value: any) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 2
    }).format(Number.parseInt(value))
}
