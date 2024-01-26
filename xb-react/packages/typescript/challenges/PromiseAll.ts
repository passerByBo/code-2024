const promise1 = Promise.resolve(3);
const promise2 = 42;
const promise3 = new Promise<string>((resolve, reject) => {
  setTimeout(resolve, 100, 'foo');
});

// expected to be `Promise<[number, 42, string]>`
const p = PromiseAll([promise1, promise2, promise3] as const)

// 1、数组转元组 readonly [...T]
// 2、Promise的泛型内部使用一个大括号包裹 in keyof 遍历 返回值默认会是一个数组
declare function PromiseAll<T extends any[]>(values: readonly [...T]) : Promise<{[Key in keyof T]: T[Key] extends Promise<infer R> ? R : T[Key]}>

export {}