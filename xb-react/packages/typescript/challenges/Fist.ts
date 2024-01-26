type Fist<T extends unknown[]> = T extends [f: infer First, ...rest: unknown[]] ? First : never

// T extends [] ?  T[0] : never 可以取值
// T['length'] extends 0
type arr1 = ['a', 'b', 'c']
type arr2 = [3,2,1]

type head1 = Fist<arr1>
type head2 = Fist<arr2>


export {}

