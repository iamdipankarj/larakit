import { useEffect, useRef } from 'react'

type TimeoutCallback = () => void

/**
 * A custom Hook to schedule a callback after a given delay.
 *
 * Usage:
 *   useTimeout(() => {
 *     // Your callback logic
 *   }, 3000);
 *
 * @param {TimeoutCallback} callback - The function to be invoked after the delay.
 * @param {number | null} delay - Delay in milliseconds. If null, no timeout will be set.
 */
export function useTimeout(
    callback: TimeoutCallback,
    delay: number | null
): void {
    const savedCallback = useRef<TimeoutCallback>(callback)

    // Remember the latest callback if it changes
    useEffect(() => {
        savedCallback.current = callback
    }, [callback])

    useEffect(() => {
        // If delay is null, do not schedule the timeout
        if (delay == null) {
            return
        }

        // Set up the timeout
        const id = setTimeout(() => {
            savedCallback.current()
        }, delay)

        // Clear the timeout if the component unmounts or if delay changes
        return () => clearTimeout(id)
    }, [delay])
}
