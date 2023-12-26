import { useCallback, useEffect, useState } from "react";

interface Disconnect{
    disconnect: () => void
}

class Stateful<T> {
  constructor(protected value: T) {}

  private listeners = new Set<(value: T) => void>();

  public setState(value: T) {
    this.update(value)
  }

  public subscribe(callback: (Value: T) => void):Disconnect {
    this.listeners.add(callback)
    return {
        disconnect: () => {
            console.log('-----------------取消订阅', Math.random())
            this.listeners.delete(callback)
        }
    }
  }

  public snapshot(): T {
    return this.value;
  }

  public emit() {
    console.log("[状态更新]", Math.random());
    for (const listener of Array.from(this.listeners)) {
      listener(this.snapshot());
    }
  }

  protected update(value:T) {
    if (this.value !== value) {
      this.value = value;
      this.emit()
    }
  }
}

class Atom<T> extends Stateful<T> {
    setValue(value: T){
        super.update(value)
    }
}


class Selector<T> extends Stateful<T>{
    constructor(private readonly generate: SelectorGenerator<T>){
        super(undefined as any)
        this.value = generate(this.snapshot())
    }

}

// 基础状态
export function atom<V>(value: {
    key: string;
    default: V;
}) {
    return new Atom<V>(value.default)
}
// {
//     key: 'charCountState',
//     get: ({get}) => {
//         const text = get(textState);
//         return text.length
//     }
// }
type SelectorGenerator<V> = (context: {get: <T>(dep: Atom<T>) => T}) => V
// 相当于action
export function selector<V>(value: {key: string; get: SelectorGenerator<V>}) {
    return new Selector<V>(value.get)
}

function tuplify<T extends unknown[]>(...elements: T){
    return elements
}

// 改变基础状态
export function useRecoilState<T>(atom: Stateful<T>) {

    const value = useRecoilValue(atom)
    return tuplify(value, useCallback((value: T) => atom.setState(value),[atom]))
}

// 获取基本状态值 不改变 基础状态更新后改变试图（双向）
export function useRecoilValue<T>(value: Stateful<T>) {
    const [, updateState] = useState({})

    useEffect(() => {
        const {disconnect} = value.subscribe(() => updateState({}))
        return () => disconnect()
    },[value])


    return value.snapshot()
}
