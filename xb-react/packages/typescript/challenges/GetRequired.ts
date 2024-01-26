type I =  GetRequired<{foo: number, bar?:string}>

// extends前面的 可以赋值给后面的  为true 标识前面的包含后面的所有内容  也就是前面是后面的子类型   内容更多
// type S = Omit<I, 'bar'> extends I ? 1 : 2
// 可有可无的属性 是子类型

type GetRequired<T> = {
    [Key in keyof T as Omit<T, Key> extends T ? never : Key]: T[Key]
}

export {}