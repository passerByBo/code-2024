type trimmed = Trim<'  Hello World  '> // expected to be 'Hello World'

type trimedleft = TrimLeft<'  Hello World  '> // expected to be 'Hello World  '


// type Trim<S extends string> = S extends ` ${infer F}${infer L} ` ? Trim<`${F}${L}`> : S

// type TrimLeft<S extends string> = S extends ` ${infer F}${infer L}`  ? TrimLeft<`${F}${L}`> : S

type pattern = ' ' | '\t' | '\n'

type Trim<S> = S extends `${pattern}${infer R}` ? Trim<R> : S extends `${infer L}${pattern}` ? Trim<L> : S


type TrimLeft<S> = S extends `${pattern}${infer R}` ? TrimLeft<R> : S