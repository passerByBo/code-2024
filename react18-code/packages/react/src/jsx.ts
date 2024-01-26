import { REACT_ELEMENT_TYPE, REACT_ELEMENT_TYPE } from 'shared/ReactSymbols'
import type { Ref, ElementType, Key, Props, ReactElement } from 'shared/ReactType'

const CreateReactElement = function (
    type: ElementType,
    key: Key,
    ref: Ref,
    props: Props
) {
    const element: ReactElement = {
        $$typeof: REACT_ELEMENT_TYPE,
        type: type,
        key,
        ref,
        props,
        __mark: 'React18',
    };

    return element;
}

function hasValidKey(config: any) {
    return config.key !== undefined;
}

function hasValidRef(config: any) {
    return config.ref !== undefined;
}

export const jsxDEV = (type: ElementType, config: any, ...maybeChildren: any) => {
    let key: Key = null;
    const props: any = {};
    let ref: Ref = null!;
    for (const prop in config) {
        const val = config[prop];
        if (prop === 'key') {
            if (hasValidKey(config)) {
                key = '' + val;
            }
            continue;
        }
        if (prop === 'ref' && val !== undefined) {
            if (hasValidRef(config)) {
                ref = val;
            }
            continue;
        }
        if ({}.hasOwnProperty.call(config, prop)) {
            props[prop] = val;
        }
    }

    const maybeChildrenLength = maybeChildren.length;
    if (maybeChildrenLength) {
        // 将多余参数作为children
        if (maybeChildrenLength === 1) {
            props.children = maybeChildren[0];
        } else {
            props.children = maybeChildren;
        }
    }

    return CreateReactElement(type, key, ref, props);
}