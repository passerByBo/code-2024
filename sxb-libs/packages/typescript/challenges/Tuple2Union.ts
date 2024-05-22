type Arr = ['1', '2', '3']

type Test = TupleToUnion<Arr> // expected to be '1' | '2' | '3'


type TupleToUnion<T extends unknown[]> = T[number]

// 这里取到的是值的类型如果想取数组的类型
type TupleToUnion2<T extends unknown[]> = T extends Array<infer U> ? U : never
type Test2 = TupleToUnion2<Arr> 

type TupleToUnion3<T extends unknown[]> = T extends (infer U) ? U : never
type Test3 = TupleToUnion3<Arr> 
