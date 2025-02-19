import { useEffect, useState } from 'react'

/**
 * Custom hook to observe and handle online/offline network activity.
 * @returns {Object} - The current network status and a flag indicating if the user was offline.
 */
export function useNetworkStatus() {
    const [isOnline, setIsOnline] = useState(navigator.onLine)
    const [wasOffline, setWasOffline] = useState(false)

    useEffect(() => {
        const handleOnline = () => {
            setIsOnline(true)
            setWasOffline((prev) => prev || !navigator.onLine)
        }

        const handleOffline = () => {
            setIsOnline(false)
            setWasOffline(true)
        }

        window.addEventListener('online', handleOnline)
        window.addEventListener('offline', handleOffline)

        return () => {
            window.removeEventListener('online', handleOnline)
            window.removeEventListener('offline', handleOffline)
        }
    }, [])

    return { isOnline, wasOffline, setWasOffline }
}
