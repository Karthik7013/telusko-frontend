import { useCallback, useEffect, useRef, useState } from "react"

export function useStateSafe<T>(initialValue: T | (() => T)) {
    const [state, setState] = useState<T>(initialValue)
    const mountedRef = useRef(true)

    useEffect(() => {
        return () => { mountedRef.current = false }
    }, [])

    const setStateSafe = useCallback((value: React.SetStateAction<T>) => {
        if (mountedRef.current) {
            setState(value)
        }
    }, [])

    return [state, setStateSafe] as const
}
