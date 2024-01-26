const add = (a: number, b: number) => a + b
const three = add(1, 2)


// 定义实现一个函数的科里化
// const Currying =
//     (fn, arr = []) =>
//         (...args) =>
//             ((arg) => (arg.length === fn.length) ? fn(...arg) : Currying(fn, arg))

// 先对F做一个范围大的约束  用来约束传入的泛型参数类型
// 判断F参数是否大于等于1个
type CurryingFn<F extends Function> = F extends (
    // 取出第一个参数
    first: infer First,
    // 取出剩余参数
    ...remaining: infer Rest
    // 取出返回值
) => infer Ret 
// 判断剩余参数数量是否大于0
? Rest['length'] extends 0
// 如果没有剩余参数 返回F
? F
// 如果还存在剩余参数  使用递归的方式拆解参数
: (first: First) => CurryingFn<(...arg: Rest) => Ret>
// 无参数
: never 
// 做签名
function Currying<F extends Function>(fn:F): CurryingFn<F>
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
