type Test1 = [1,1,1]
type Test2 = [1,1,3]

type Todo = All<Test1, 1>
type Todo2 = All<Test2, 1>
type All<T extends unknown[], U extends unknown> = Equal<T[number], U>
type A1 = true | false

type A2 = true & false
// 数组的每一项和U进行比较   最终结果全是true返回true 只要有一个false返回false  Eque
// type All<T extends unknown[], U extends unknown> = T[number] extends U ? true : false
type Equal<X, Y> = (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y ? 1 : 2 ? true : false

// 函数签名
type FN1 = <T>() => T extends any ? 1 : 2
type FN2 = <T>() => T extends boolean ? 1 : 2

type Res = FN1 extends FN2 ? 1 : 2

let fn1:FN1 = () => 1
let fn2:FN2 = fn1

// type B1 = boolean
// type B2 = any
// const c:boolean = false
// const d:any = c
// const e:boolean = d

export {}