import RequiredKeys from './RequiredKeys'

type Result = RequiredKeys<{ foo: number; bar?: string; too: string }>;

type capitalized = Capitalize<'hello world'> // expected to be 'Hello world'


type Capitalize<T extends string> = T extends `${infer U}${infer O}` ? `${Uppercase<U>}${O}` : T

export {}
