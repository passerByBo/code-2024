export type Ref = {current: any} | ((instance: any) => void)

export type ElementType = any

export type Key = any

export type Props = {
    [key: PropertyKey]: any;
    children?: any
}

export interface ReactElement {
    $$typeof: symbol | number;
    type: ElementType;
    key: Key;
    props: Props;
    __mark: 'react18'
}