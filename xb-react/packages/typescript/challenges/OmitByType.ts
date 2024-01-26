import type Equals from './utils/Equals'


type OmitBoolean = OmitByType<{
    name: string
    count: number
    isReadonly: boolean
    isEnable: boolean
}, boolean>




type OmitByType<T, U> = {
    [K in keyof T as Equals<T[K], U> extends false ? K : never]:  T[K]
} 