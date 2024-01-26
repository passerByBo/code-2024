import { useRef, useEffect, type EffectCallback, type DependencyList } from 'react'
const useUpdateEffect = (callback: EffectCallback, deps: DependencyList) => {
    const hasMounted = useRef(false)

    useEffect(() => {
        if (hasMounted.current) {
            callback()
        } else {
            hasMounted.current = true
        }
    }, deps)

}


export default useUpdateEffect