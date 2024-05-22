declare const config: Chainable

const result = config
  .option('foo', 123)
  .option('name', 'type-challenges')
  .option('bar', { value: 'Hello World' })
  .get()

// expect the type of result to be:
interface Result {
  foo: number
  name: string
  bar: {
    value: string
  }
}
// 原始类型中未定义泛型
// 实现中定义泛型用于推断 类型
// 默认T泛型给一个空对象  空类型模块

// Option给两个泛型 根据使用的时候可以推断出传入的类型
// key: K extends keyof T ? never : K  这里是为了排除已经存在的Key
// T类型的推断与赋值从递归开始   第一层传入{}和foo
// 第二次调用的时候传入了name
// 第三次调用的时候传入了bar
// 递归增加
type Chainable<T = {}> = {
    option: <K extends PropertyKey, V>(key: K extends keyof T ? never : K, value:V) => Chainable<Omit<T, K> & {[P in K]: V}>;
    get:() => T
}


export {}