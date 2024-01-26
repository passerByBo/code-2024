type replaced = Replace<'types are fun!', 'fun', 'awesome'> // expected to be 'types are awesome!'
type replacedAll = ReplaceAll<'t y p e s', ' ', ''> // expected to be 'types'


type pattern = ' '
// type ExcludeStr<S extends string, T extends string> =S extends `${infer Other}${S}` //| `${infer Left}${S}${infer Right}` | `${S}${infer Other}`

// type Replace<S extends string, R extends string, P extends string> =
//     S extends `${infer F}${pattern}${infer L}`
//     ? F extends `${R}${infer other}` ? `${P}${other}${L}` : `${F}${pattern}${Replace<L, R, P>}`
//     : S extends `${R}${infer other}` ? `${P}${other}` : S

// type ReplaceAll<S extends string, R extends string, P extends string> =
//     S extends `${infer F}${infer O}`
//     ? F extends R ? `${P}${ReplaceAll<O, R, P>}` : `${F}${ReplaceAll<O, R, P>}`
//     : S

type Replace<S extends string, From extends string, To extends string> =
    S extends '' 
    ? S 
    : S extends `${infer L}${From}${infer R}`
    ? `${L}${To}${R}`
    : S



type ReplaceAll<S extends string, From extends string, To extends string> = 
S extends ''
? S
: S extends `${infer L}${From}${infer R}`
? `${L}${To}${ReplaceAll<R, From, To>}`
: S





type S1 = 'types are fun!' extends `${infer F} ${infer L} ` ? F : never
type S2 = 'fun' extends 'fun!' ? 1 : 2

type S3 = 'f' extends 'fun' ? 1 : 2


export { }

