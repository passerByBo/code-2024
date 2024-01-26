// type Last<T extends unknown[]> = T extends [...rest:unknown[], last: infer Last] ? Last : never
type Last<T extends unknown[]> = T['length'] extends 0 ? never : [never, ...T][T['length']]

type arr1 = ['a', 'b', 'c']
type arr2 = [3,2,1]

type head1 = Last<arr1>
type head2 = Last<arr2>


export {}

