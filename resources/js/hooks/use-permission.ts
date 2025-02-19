import type { Role } from '@/types/roles'
import { usePage } from '@inertiajs/react'
import { useCallback } from 'react'

export function usePermission() {
    const pageProps = usePage().props
    const auth = pageProps.auth
    const isAcmeUser = auth.acme_user || false

    const checkRole = useCallback(
        (code: Role) => {
            const roles = Array.isArray(auth?.user?.roles)
                ? auth?.user?.roles
                : []
            return (roles || []).some((item) => item.code === code)
        },
        [auth]
    )

    return {
        isAcmeUser,
        isAcmeAdmin: isAcmeUser && checkRole('ADMIN'),
        isAdmin: checkRole('ADMIN'),
        isMember: checkRole('MEMBER'),
        id: auth.user.id,
        userEmail: auth.user?.email || null
    }
}
