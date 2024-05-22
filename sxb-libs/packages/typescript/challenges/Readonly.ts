interface Todo {
    title: string
    description: string;
    completed: boolean
}

const todo: MyReadonly<Todo> = {
    title: "Hey",
    description: "foobar",
    completed: false
}
todo.title = "Hello" // Error: cannot reassign a readonly property
todo.description = "barFoo" // Error: cannot reassign a readonly property


const todo2: MyReadonly2<Todo, 'completed'> = {
    title: "Hey",
    description: "foobar",
    completed: false
}

// 排除的部分
todo2.completed = true

type MyReadonly<T> = {
    +readonly [Key in keyof T]:  T[Key]
}

type MyReadonly2<T, K extends keyof T = keyof T> = {
    +readonly [Key in keyof T]:  T[Key]
} & {
    [Key in keyof T as key extends K ? never : Key]: T[Key]
}

type MyReadonly3<T, K extends keyof T = keyof T> = Readonly<Omit<T, K>> & Pick<T, K>
const todo3: MyReadonly3<Todo, 'completed'> = {
    title: "Hey",
    description: "foobar",
    completed: false
}

// 排除的部分
todo3.completed = true

const a:PropertyKey = ''

export {} 