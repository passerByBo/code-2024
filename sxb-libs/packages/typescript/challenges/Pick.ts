interface Todo {
    title: string
    description: string
    completed: boolean
}

type MyPick<T, K extends keyof T> = {
    [Key in keyof T as Key extends K ? Key :never]: T[Key]
}

type TodoPreview = MyPick<Todo, 'title' | 'completed'>

const todo: TodoPreview = {
    title: 'Clean room',
    completed: false,
}

export {}