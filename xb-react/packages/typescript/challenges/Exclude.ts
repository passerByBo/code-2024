type Result = MyExclude<'a' | 'b' | 'c', 'a'> // 'b' | 'c'

// 联合类型 extends的时候会和每一项进行匹配
type MyExclude<T, U extends  T> = T extends U ?  never : T

export {}
