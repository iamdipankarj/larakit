import { usePage } from '@inertiajs/react'
import { useMemo } from 'react'

export function useOrgData() {
    const pageProps = usePage().props
    const listData = pageProps.org_list || {}

    const orgList = useMemo(
        () =>
            Object.entries(listData).map(([key, value]) => {
                return {
                    value: key,
                    label: value
                }
            }),
        [listData]
    )

    return {
        orgList
    }
}
