const add = (a: number, b: number) => a + b
const three = add(1, 2)


// 定义实现一个函数的科里化
// const Currying =
//     (fn, arr = []) =>
//         (...args) =>
//             ((arg) => (arg.length === fn.length) ? fn(...arg) : Currying(fn, arg))

// Fn 接受两个泛型参数  第一个是传入函数类型的参数   第二个是传入函数的返回值
// 判断当前类型是否为单元素元组
type Fn<Args, R> = Args extends [infer Fist] 
// 当传入函数的参数只有1个的时候  推断出当前函数的参数类型和返回值类型   返回一个函数  其实和传入的函数是同类型
? (p: Fist) => R
// 当函数存在多个参数的时候 取出第一个参数和剩余参数
: Args extends [arg: infer First, ...rest: infer Rest]
// 拆分参数  递归生成函数
? (p:First) => Fn<Rest, R>
:never

// 做签名
function Currying<F extends (...args: any[]) => {}>(fn:F): Fn<Parameters<F>, ReturnType<F>>
function Currying(func){
    return function curried(...args){
        if(args.length === func.length){
            func.apply(this, args)
        } else {
            return function(...args2){
                return curried.apply(this, args.concat(args2))
            }
        }
    }
}




const curriedAdd = Currying(add)
const five = curriedAdd(2)(3)

export {}
