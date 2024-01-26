// https://stackoverflow.com/questions/68961864/how-does-the-equals-work-in-typescript
// 不能解决false和true | false   
type Equil2<A, B> = [A] extends [B] ? ([B] extends [A] ? true : false) : false
type Res = Equil2<any, false>
//  type Res2 = Equil<any, false>
// 元组类型
// 不能解决访问标识符和any的问题  any和string
// type Equil<A, B> = [A, B] extends [B, A] ? true : false

// 减掉never {}keyof[T]

// The assignability rule for conditional types <...> requires that the types after extends be "identical" as that is defined by the checker
// 条件类型 < ... > 的可赋值规则要求扩展后的类型与检查器定义的类型“相同
type Equil<X, Y> = (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y ? 1 : 2 ? true : false
type Equals<X, Y> =
    (<T>() => (T extends /*1st*/ X ? 1 : 2)) extends /*2nd*/
    (<T>() => (T extends /*3rd*/ Y ? 1 : 2))
    ? true
    : false;

export default Equals


// declare let x: <T>() => (T extends /*1st*/ X ? 1 : 2) // Substitute an actual type for X
// declare let y: <T>() => (T extends /*3rd*/ Y ? 1 : 2) // Substitute an actual type for Y
// y = x // Should this be an error or not?

// 这里他们讨论的是第一个和第三个扩展关键字。检查器只允许在 x 后面的类型(即 X 和 Y)相同的情况下将 x 赋值给 y。如果两者都用数字代替
// declare let x: <T>() => (T extends number ? 1 : 2)
// declare let y: <T>() => (T extends number ? 1 : 2)
// y = x // Should this be an error or not?
//当然，它不应该是一个错误，因为有2个变量的相同类型。现在如果你用数字代替 X 用字符串代替 Y

// declare let x: <T>() => (T extends number ? 1 : 2)
// declare let y: <T>() => (T extends string ? 1 : 2)
// y = x // Should this be an error or not?

// 现在扩展之后的类型不相同，所以会有一个错误。
//现在让我们看看为什么扩展后的类型必须是相同的变量可赋值。如果它们是相同的，那么所有的东西都应该是清楚的，因为你只有两个相同类型的变量，
// 它们总是可以互相赋值的。至于另一种情况，考虑我描述的最后一种情况，使用 Equals < number，string > 。想象一下这不是一个错误

// declare let x: <T>() => (T extends number ? 1 : 2)
// declare let y: <T>() => (T extends string ? 1 : 2)
// y = x // Imagine this is fine

// declare let x: <T>() => (T extends number ? 1 : 2)
// declare let y: <T>() => (T extends string ? 1 : 2)

// const a = x<string>() // "a" is of type "2" because string doesn't extend number
// const b = x<number>() // "b" is of type "1"

// const c = y<string>() // "c" is of type "1" because string extends string
// const d = y<number>() // "d" is of type "2"

// y = x
// // According to type declaration of "y" we know, that "e" should be of type "1"
// // But we just assigned x to y, and we know that "x" returns "2" in this scenario
// // That's not correct
// const e = y<string>() 
// // Same here, according to "y" type this should be "2", but since "y" is now "x",
// // this is actually "1"
// const f = y<number>()

// 类似地，如果类型不是字符串和数字，它们没有任何共同之处，而是一些更复杂的东西。让我们试试 X 的{ foo: string，bar: number }和 Y 的{ foo: string }

declare let x: <T>() => (T extends { foo: string, bar: number } ? 1 : 2)
declare let y: <T>() => (T extends { foo: string } ? 1 : 2)

// "a" is of type "2" because {foo: string} doesn't extend {foo: string, bar: number}
const a = x<{ foo: string }>()

// "b" is of type "1"
const b = y<{ foo: string }>()

y = x
// According to type declaration of "y" this should be of type "1", but we just
// assigned x to y, and "x" returns "2" in this scenario
const c = y<{ foo: string }>()

// 如果您切换类型，并对 X 尝试{ foo: string } ，对 Y 尝试{ foo: string，bar: number } ，那么将再次出现调用 y < { foo: string } > ()的问题。你可以看到，总是有一些错误
// 更准确地说，如果 X 和 Y 不相同，总会有某种类型扩展其中一个，而不扩展另一个。如果你试图用这种类型的 T，你得到的是无意义的。实际上，如果尝试赋 y = x，编译器会给出如下错误:

// Type '<T>() => T extends number ? 1 : 2' is not assignable to type '<T>() => T extends string ? 1 : 2'.
//   Type 'T extends number ? 1 : 2' is not assignable to type 'T extends string ? 1 : 2'.
//     Type '1 | 2' is not assignable to type 'T extends string ? 1 : 2'.
//       Type '1' is not assignable to type 'T extends string ? 1 : 2'.

// 因为总有一个类型可以赋值给 X 和 Y 中的一个而不是另一个，所以它被迫把 x 的返回类型看作1 | 2，这个类型不能赋值给 T 扩展... ？1:2，因为 T 可以延伸这个... 或者不能。

// 这基本上就是 Equals 类型归结起来的，希望它或多或少地清楚，它是如何工作的。
export { }