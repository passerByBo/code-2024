type I = UnionToIntersection<'foo' | 42 | true> // expected to be 'foo' & 42 & true
type I2 = UnionToIntersection<1 | []>
type I3 = UnionToIntersection<1 | number>

// 1、联合类型extends会遍历联合类型的每一个值 进行比较
type UnionToIntersection<U> = (U extends U ? (arg:U) => void : never) extends (arg: infer T) => void ? T : never

type I4 = [] & 1
type I5 = 1 & number
type I6 = 1 | number | 2 | '1'

export {}