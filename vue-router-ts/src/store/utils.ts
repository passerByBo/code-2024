import {modules} from './modules'
type GetGetter<Module> = Module extends { getters: infer G } ? G : unknown;

type GetGetters<Modules> = {
    [K in keyof Modules]: GetGetter<Modules[K]>
}

type ModuleGetters = GetGetters<typeof modules>

// 使用模板字符串类型拼接具体的getters需求
type AddPrefix<Prefix, Keys> = `${Prefix & string}/${Keys & string}`

// 拆分具体某个getter模块
type GetSpliceKey<K, M> = AddPrefix<K, keyof M>


// 得到user层
type GetSpliceKeys<Modules> = {
    [K in keyof Modules]: GetSpliceKey<K, Modules[K]>
}[keyof Modules]

type xx2 = GetSpliceKeys<ModuleGetters>

type GetFunc<T,A,B> = T[A & keyof T][B & keyof T[A & keyof T]]

type GetSpliceObj<T> = {
    [K in GetSpliceKeys<T>]: K extends `${infer A}/${infer B}` ? GetFunc<T,A,B> : unknown
}

type ModulesGetters = GetSpliceObj<ModuleGetters>

type Getters = {
    [K in keyof ModulesGetters]: ReturnType<ModulesGetters[K]>
}

export type {
    Getters
}