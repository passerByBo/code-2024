import { REACT_ELEMENT_TYPE } from "shared/ReactSymbols"
import { Type, Key, Ref, Props, ReactElement as ReactElementType } from 'shared/ReactTypes'
const ReactElement = function (type: Type, key: Key, ref: Ref, props: Props): ReactElementType {
    const element = {
        $$typeof: REACT_ELEMENT_TYPE,
        key,
        type,
        ref,
        props,
        __mark: '石晓波'
    }

    return element
}

export const jsx = (
    type: ReactElementType,
    config: any,
    ...maybeChildren: any
) => {
    let key: Key = null;
    const props: Props = {};
    let ref: Ref = null;

    for (const prop in config) {
        const val = config[prop]
        if (prop === 'key') {
            if (val !== undefined) {
                key = '' + val
            }
            continue
        }

        if (prop === 'ref') {
            if (val !== undefined) {
                ref = val
            }

            continue;
        }

        // 判断是config上自己的prop 还是原型链上的
        if ({}.hasOwnProperty.call(config, prop)) {
            props[prop] = val
        }
    }

    const maybeChildrenLength = maybeChildren.length;
    if (maybeChildrenLength) {
        if (maybeChildrenLength === 1) {
            props.children = maybeChildren[0]
        } else {
            props.children = maybeChildren
        }
    }

    return ReactElement(type, key, ref, props)
}

export const jsxDev = jsx