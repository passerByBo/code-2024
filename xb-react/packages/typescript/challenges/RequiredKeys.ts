type Result = RequiredKeys<{ foo: number; bar?: string; too: string }>;
// expected to be “foo”

// type RequiredKeys<T> = keyof {
//     [Key in keyof T as Omit<T, Key> extends T ? never : Key]: T[Key]
// };

type RequiredKeys<T, K = keyof T> = K extends keyof T ? T extends Required<Pick<T, K>> ? K : never : never

export default RequiredKeys