import { type Dispatch, type SetStateAction, useEffect, useState } from 'react'

export function useLocalStorage<T>(
    key: string,
    defaultValue: T
): [T, Dispatch<SetStateAction<T>>] {
    const [storedValue, setStoredValue] = useState<T>(() => {
        try {
            const item = localStorage.getItem(key)
            if (item) {
                return JSON.parse(item) // Use existing value from localStorage
            } else {
                // Set default value if localStorage is empty
                localStorage.setItem(key, JSON.stringify(defaultValue))
                return defaultValue
            }
        } catch (error) {
            console.error('Error reading from localStorage:', error)
            return defaultValue
        }
    })

    const updateValue: Dispatch<SetStateAction<T>> = (newValueOrUpdater) => {
        try {
            const valueToStore =
                typeof newValueOrUpdater === 'function'
                    ? (newValueOrUpdater as (prev: T) => T)(storedValue)
                    : newValueOrUpdater

            setStoredValue(valueToStore)
            localStorage.setItem(key, JSON.stringify(valueToStore))

            // Trigger custom event for same-tab updates
            window.dispatchEvent(
                new CustomEvent('localStorageChange', {
                    detail: { key, newValue: valueToStore }
                })
            )
        } catch (error) {
            console.error('Error updating localStorage:', error)
        }
    }

    useEffect(() => {
        const handleStorageChange = (event: StorageEvent) => {
            if (event.key === key && event.newValue) {
                try {
                    const newValue = JSON.parse(event.newValue)
                    if (
                        JSON.stringify(newValue) !== JSON.stringify(storedValue)
                    ) {
                        setStoredValue(newValue)
                    }
                } catch (error) {
                    console.error('Error syncing localStorage value:', error)
                }
            }
        }

        const handleCustomStorageChange = (event: CustomEvent) => {
            const { key: eventKey, newValue } = event.detail
            if (
                eventKey === key &&
                JSON.stringify(newValue) !== JSON.stringify(storedValue)
            ) {
                setStoredValue(newValue)
            }
        }

        window.addEventListener('storage', handleStorageChange)
        window.addEventListener(
            'localStorageChange',
            handleCustomStorageChange as EventListener
        )

        return () => {
            window.removeEventListener('storage', handleStorageChange)
            window.removeEventListener(
                'localStorageChange',
                handleCustomStorageChange as EventListener
            )
        }
    }, [key, storedValue])

    return [storedValue, updateValue]
}
