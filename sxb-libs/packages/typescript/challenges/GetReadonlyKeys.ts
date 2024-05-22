
interface Todo {
    readonly title: string
    readonly description: string
    completed: boolean
}


// type GetReadonlyKeys<T> = keyof {
//     [K in keyof T as Equil<Pick<T, K>, Readonly<Pick<T, K>>> extends true ? K : never]: T[K]
// }

type GetReadonlyKeys<T> = {
    [P in keyof Required<T>]: Equil<
    {[K in P]: T[K]},
    {-readonly [R in P]: T[R]}
    > extends  true ?
    never: P;
}[keyof T]

type Keys = GetReadonlyKeys<Todo> // expected to be "title" | "description"

export {}