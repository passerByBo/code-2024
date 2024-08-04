import { pipe, flow, identity } from 'fp-ts/function';
import * as O from 'fp-ts/Option';
import * as E from 'fp-ts/Either';
import { makeMatch } from 'ts-adt/MakeADT';
import * as J from 'fp-ts/Json';
import base64 from 'base-64';

// 导入比较麻烦 可以借助于@unsplash/ts-namespace-import-plugin 自动导入命名空间
// tsconfig 的 compiilerOptions/plugin  [{name: '@unsplash/ts-namespace-import-plugin'}]
// 快捷导入的方式 针对于fp-ts的配置如下链接
//https://gist.github.com/MrFunctor/7f60d5ad211b9f9e56ab02d4695a0f1b
// {
//     "compiilerOptions": {
//         "plugins": [
//             {
//                 "name": "@unsplash/ts-namespace-import-plugin",
//                 "namespaces": {
//                     "E": {
//                         "importPath": "fp-ts/Either"
//                     },
//                     "O": {
//                         "importPath": "fp-ts/Option"
//                     }
//                 }

//             }
//         ]
//     }
// }

const concat = (s1: string, s2: string) => s1 + s2;

const trim = (s: string) => s.trim();

const size = (s: string) => s.length;

const isAtLeast3 = (n: number) => n >= 3;

pipe('hello', size, isAtLeast3);
// 第一个的参数和最后一个的返回值，赋值是顺序从前往后执行赋值
const isValid = flow(concat, trim, size, isAtLeast3);

const myFlow =
  <A, B, C>(f: (a: A) => B, g: (b: B) => C) =>
  (a: A): C =>
    g(f(a));
// (s1:string, s2:string) -> boolean

// ----------------------------Option-----------------------------
// map flatten match|fold    map+flatten=chain    getOreElse= match(() =>(),identory)
// fromPredicate boolean
// Functor的功能，并且包含从函子中取值的功能函数 容器要么有值要么没有值

// type Option<A> = Some<A> | None

// O.some(3) 来构建 容器的值
// O.none  没有值可以直接用常量代替

// 做容错 Ethier中的left和right
const inverse = (x: number): O.Option<number> => (x === 0 ? O.none : O.some(1 / x));

inverse(0); // O.none
inverse(2); // O.some(0.5)
// match 和fold  可以判断走那个条件并返回不同的值

const getUiMessageWithInverse = (x: number): string =>
  pipe(
    x,
    // 根据传入的x 返回node还是some
    inverse,
    // 判断返回的是什么并执行对应的函数 返回string
    O.match(
      () => `Cannot get the inverse of ${x}`,
      ix => `The inverse of ${x} is ${ix}`,
    ),
  );

getUiMessageWithInverse(0); // Cannot get the inverse of 0
getUiMessageWithInverse(2); // The inverse of 2 is 0.5

const safeInverse = (x: number) =>
  pipe(
    x,
    inverse,
    O.match(() => 0, identity), // number
  );

safeInverse(0);
safeInverse(2);

// 提供的工具函数  更方便的取值
const safeInverse2 = (x: number) =>
  pipe(
    x,
    inverse, // Option<number>
    O.getOrElse(() => 0), // number
  );

safeInverse2(0);
safeInverse2(2);

const safeInverse3 = (x: number) =>
  pipe(
    x,
    inverse, // Option<number>
    // 如果想返回不同类型的值，如果Option<number> 异常场景想取出不同类型的值，可以使用getOrElseW
    // match也是同样的道理 Match<string | number>  matchW()
    O.getOrElseW(() => 'invalid'), // number
  );

type Nullable<A> = A | null | undefined;
const s: Nullable<number> = 1;

const value1: number | null = 3;
const value2: number | null = null;

const v1 = O.fromNullable(value1); // O.some(3)
const v2 = O.fromNullable(value2); // O.none

// flatten  chain
// 映射  展开  链式调用

const head = (as: ReadonlyArray<any>) => (as.length === 0 ? O.none : O.some(as[0]));
const toUppercase = (s: string) => s.toUpperCase();
const addPrefix = (prefix: string) => (s: string) => s + prefix;

const getBestMovie = (title: string[]): O.Option<string> =>
  pipe(title, head, O.map(toUppercase), O.map(addPrefix('Best - ')));
// O.none map会返回本身 不会影响执行

const inverseHead = (ns: ReadonlyArray<number>) =>
  pipe(
    ns,
    head,
    O.map(inverse), // 形成嵌套
  );

// 如果上一个函数已经返回O.some(1)或者O.none 继续传递给返回Option类型的函数  会形成O.some(O.none)嵌套的场景
// O.flatten O.some(O.none) -> O.none
// O.flatMap = map+flatten
// 但是在fp-ts中 O.chain(f) 将当前的Option映射到另外一个Option并返回扁平化的Option
const inverseHead2 = (ns: ReadonlyArray<number>) =>
  pipe(
    ns,
    head,
    O.chain(inverse), // 形成嵌套并解开
  );

// 谓词  函数接受一个或者多个参数 并返回bool  是否满足条件  常用的filter find都接受一个谓词函数

//predicate谓词
const isEvent = (a: number) => a % 2 === 0;
// 接受一个A并返回Option < A > Some < A > 或者None
const getEven = O.fromPredicate(isEvent);

getEven(3); //O.none
getEven(4); //O.some(4)

type Discount = Readonly<{
  percentage: number;
  expired: boolean;
}>;

const isDiscountValid = (discount: Discount) => !discount.expired;
const getDiscountText = (discount: Discount) =>
  pipe(
    discount, // {percentage: number,expired: boolean}
    O.fromPredicate(isDiscountValid), // O.some(Discount) | O.none
    O.map(({ percentage }) => `${percentage} % DISCOUNT`), // O.some(string)
  );

// Option中的  错误处理

type Movie = Readonly<{
  title: string;
  releaseYear: number;
  ratingPosition: number;
  award?: string;
}>;

const movie1: Movie = {
  title: 'The Kingdom of Monads',
  releaseYear: 2023,
  ratingPosition: 1,
  award: 'Oscar',
};

const movie2: Movie = {
  title: 'natueal Transformations',
  releaseYear: 2023,
  ratingPosition: 3,
};

const movie3: Movie = {
  title: 'Fun with for loops',
  releaseYear: 2023,
  ratingPosition: 74,
};

const getMovieHighlight = (movie: Movie): string =>
  pipe(
    movie,
    getMovieAwardHighlight, // Option<string>
    // 只有接受到O.none的时候才会继续函数
    // 这里就需要使用到O.alt(f) alternative computation
    O.alt(() => getMovieTop10Highlight(movie)), // Option<string>
    // else 对Option进行了取值
    O.getOrElse(() => `Released in ${movie.releaseYear}`),
  );

const getMovieAwardHighlight = (movie: Movie): O.Option<string> =>
  pipe(
    movie.award, // string | undefined
    O.fromNullable, // O.some(number) | O.none
    O.map(award => `Awarded with ${award}`), // Option<string>
  );

const getMovieTop10Highlight = (movie: Movie): O.Option<string> =>
  pipe(
    movie,
    O.fromPredicate(({ ratingPosition }) => ratingPosition <= 10), // Option<Movie>
    O.map(({ ratingPosition }) => `In Top 10 at position: ${ratingPosition}`), // Option<string>
  );

// f的返回值为number | string
const f = (a: O.Option<number>) =>
  pipe(
    a,
    O.altW(() => O.some('invalid')),
  );

// ------------------------------------Either--------------------------------------
// tryCatch  tryCatchK map+mapLeft=bimap
// 错误捕获处理

// 如上知道了错误的结果 但是不知道错误的过程
// None -> Left<E>
// Some<A> -> Right<A>

// type Either<E, A> = Left<E> | Right<A>
// Either<Error, string>
type Item = {
  [key: string]: any;
};

type Account = Readonly<{
  balance: number;
  frozen: boolean;
}>;

type Cart = Readonly<{
  items: Item[];
  total: number;
}>;

type AccountFrozen = Readonly<{
  type: 'AccountFrozen';
  message: string;
}>;

type NotEnoughBalance = Readonly<{
  type: 'NotEnoughBalance';
  message: string;
}>;

const pay =
  (amount: number) =>
  (account: Account): E.Either<AccountFrozen | NotEnoughBalance, Account> =>
    account.frozen
      ? E.left({
          type: 'AccountFrozen',
          message: 'Cannot pay with frozen account',
        })
      : account.balance < amount
        ? E.left({
            type: 'NotEnoughBalance',
            message: `Cannot pay ${amount} a banlance of ${account.balance}`,
          })
        : E.right({
            ...account,
            balance: account.balance - amount,
          });

const checkouyt = (cart: Cart) => (account: Account) =>
  pipe(
    account,
    pay(cart.total), // 返回值为Either的left或者right
    E.match(
      e => 'handle error', // 所有的错误都走的这里，如果想要做错误的单独分开处理 可以使用ts-adt的库
      a => 'handle success ...',
    ),
  );
// E.left<AccountFrozen>
// E.left<NotEnoughBalance>
// E.right<Account>

// 使用type对错误的模式进行匹配
const matchError = makeMatch('type');

const checkouyt2 = (cart: Cart) => (account: Account) =>
  pipe(
    account,
    pay(cart.total), // 返回值为Either的left或者right
    E.match(
      // 所有的错误都走的这里，如果想要做错误的单独分开处理 可以使用ts-adt的库
      matchError({
        AccountFrozen: e => 'account frozen',
        NotEnoughBalance: () => 'not enough banance',
      }),
      a => 'handle success ...',
    ),
  );

// 很多同步函数都会抛出异常  但是在函数式风格很难 因为不应该抛出异常

// 基础编程实现 需要手动编写try catch
const jsonParseSimple = (text: string): E.Either<Error, unknown> => {
  try {
    const result = JSON.parse(text);
    return E.right(result);
  } catch (e) {
    const error = e instanceof Error ? e : new Error(String(e));
    return E.left(error);
  }
};

//  fp-ts 提供E.tryCatch 第一个参数为需要执行的转换函数
//  第二个参数 作为错误抛出的函数
const jsonParse = (text: string): E.Either<Error, unknown> =>
  E.tryCatch(
    () => JSON.parse(text),
    // (e) => e instanceof Error ? e : new Error(String(e)) // 提供未知对象转换为错误的方法
    E.toError,
  );

// 如上我们将函数单独包裹一层 Either.tryCatchK 可以实现不需要手动包裹函数

// 获取到第一个函数参数的类型 返回Either类型
const jsonParse2 = E.tryCatchK(JSON.parse, E.toError);

// 自定义错误处理
type JsonParseError = Readonly<{
  type: 'JsonParseError';
  error: Error;
}>;
const jsonParse3 = E.tryCatchK(
  JSON.parse,
  (e): JsonParseError => ({
    type: 'JsonParseError',
    error: E.toError(e),
  }),
);

type Response = Readonly<{
  body: string;
  contentLength: number;
}>;

type JsonStringifyError = Readonly<{
  type: 'JsonStringifyError';
  error: Error;
}>;

// 取值 和转换
const createResponse = (payload: unknown): E.Either<JsonStringifyError, Response> =>
  pipe(
    payload,
    J.stringify, // Either<unknown, string>
    E.map(s => ({
      body: s,
      contentLength: s.length,
    })), // Either<unknown, Response>
    E.mapLeft(e => ({
      type: 'JsonStringifyError',
      error: E.toError(e),
    })),
  );

// E.bimap(f, g) 一个用于映射左值 另外一个用于映射右值
const createResponse2 = (payload: unknown): E.Either<JsonStringifyError, Response> =>
  pipe(
    payload,
    J.stringify, // Either<unknown, string>
    E.bimap(
      e => ({
        type: 'JsonStringifyError',
        error: E.toError(e),
      }),
      s => ({
        body: s,
        contentLength: s.length,
      }),
    ),
  );

// JSON.stringify需要每次都映射错误比较麻烦 使用函数组合的方式来重写
const jsonStrify = flow(
  J.stringify,
  E.mapLeft(
    (e): JsonStringifyError => ({
      type: 'JsonStringifyError',
      error: E.toError(e),
    }),
  ),
);

const createResponse3 = (payload: unknown): E.Either<JsonStringifyError, Response> =>
  pipe(
    payload,
    jsonStrify,
    E.map(s => ({
      body: s,
      contentLength: s.length,
    })),
  );
createResponse({ balance: 100, success: true });

// 通常我们需要执行一系列的操作  其中每个操作都可能失败
// A -> Either<E1, B> -> Either<E2, C>

type User = Readonly<{
  id: number;
  username: string;
}>;

type Base64DecodeError = Readonly<{
  type: 'Base64DecodeError';
  error: Error;
}>;

const decodeUser = (encodedUser: string) =>
  pipe(
    encodedUser,
    base64Decode, // Either<Base64DecodeError, string>
    // E.map(jsonParse3),// Either<Base64DecodeError, string> -> Either<Base64DecodeError, Either<JsonParseError, unknown>>
    // E.flatten,// 这里会自动将两个左值进行合并赋值 但是又不存在extends关系所以会报错，所以需要使用flattenW 扩展错误
    // E.flattenW,// Either<Base64DecodeError | JsonParseError, unknown>
    // 使用flatMapW替换map和flattenW
    E.flatMap(jsonParse3),
  );

const base64Decode = E.tryCatchK(
  base64.decode,
  (e): Base64DecodeError => ({
    type: 'Base64DecodeError',
    error: E.toError(e),
  }),
);

// declare const decodeUserObjectFromUnkown:(u: unknown) => E.Either<InvalidUserObject, User>
// 类似于if  else if的操作  当第一个条件分支失败的时候走第二个条件分支

class EmailValidator {
  private emailRegex: RegExp;

  constructor() {
    // 正则表达式匹配电子邮件地址
    this.emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  }

  // 测试给定的字符串是否符合电子邮件格式
  test(email: string): boolean {
    return this.emailRegex.test(email);
  }
}

class PhoneNumberValidator {
  private phoneNumberRegex: RegExp;

  constructor() {
    // 正则表达式匹配常见的电话号码格式，包括国际格式和本地格式
    this.phoneNumberRegex =
      /^(?:(?:\+|00)([1-9]\d{0,2}))?[\s-]?\(?(?:0?[1-9]\d{1,4}\)?[\s-]?)?\d{3,4}[\s-]?\d{3,4}$/;
  }

  // 测试给定的字符串是否符合电话号码格式
  test(phoneNumber: string): boolean {
    return this.phoneNumberRegex.test(phoneNumber);
  }
}

const emailRegex = new EmailValidator();
const phoneNumberRegex = new PhoneNumberValidator();

const validateEmail = flow(
  E.fromPredicate(
    (maybeEmail: string) => emailRegex.test(maybeEmail),
    (invalidEmail): MalformedEmail | NotAnEmail =>
      invalidEmail.includes('@')
        ? { type: 'MalformedEmail', error: new Error('MalformedEmail email!') }
        : { type: 'NotAnEmail', error: new Error('not an email!') },
  ),
  E.map(
    (email): Email => ({
      type: 'Email',
      value: email,
    }),
  ),
);

const valitePhoneNumber = flow(
  E.fromPredicate(
    (maybePhoneNumber: string) => phoneNumberRegex.test(maybePhoneNumber),
    (): InvalidPhoneNumber => ({
      type: 'InvalidPhoneNumber',
      error: new Error('Invalid Phone Number'),
    }),
  ),
  E.map(
    (phoneNumber): PhoneNumber => ({
      type: 'PhoneNumber',
      value: phoneNumber,
    }),
  ),
);

// E.orElse(onLeft) 只有当传入的是Left才会执行内部的函数
// E1 -> Either<E2, A>
// const validateLoginName = (loginName: string) => pipe(
//     loginName,
//     validateEmail,// E.Either<'MalformedEmail' | 'NotAnEmail', string>
//     // if Left<'NotAnEmail'> -> validatePhoneNumber
//     E.orElse((e) =>
//         e === 'NotAnEmail' ?
//             valitePhoneNumber(loginName) :
//             E.left(e)),// Either<'MalformedEmail' | 'InvalidPhoneNumber', string>
//     // 我们无法得知Right代表的值是email还是phoneNumber
// )
const validateLoginName = (loginName: string) =>
  pipe(
    loginName,
    validateEmail, // E.Either<'MalformedEmail' | 'NotAnEmail', Email>
    // if Left<'NotAnEmail'> -> validatePhoneNumber
    E.orElseW(
      (e): E.Either<InvalidPhoneNumber | MalformedEmail, PhoneNumber> =>
        e.type === 'NotAnEmail' ? valitePhoneNumber(loginName) : E.left(e),
    ), // Either<'MalformedEmail' | 'InvalidPhoneNumber', Email | PhoneNumber>
  );

// 响应结果优化

type Email = Readonly<{
  type: 'Email';
  value: string;
}>;

type PhoneNumber = Readonly<{
  type: 'PhoneNumber';
  value: string;
}>;

type MalformedEmail = Readonly<{
  type: 'MalformedEmail';
  error: Error;
}>;

type NotAnEmail = Readonly<{
  type: 'NotAnEmail';
  error: Error;
}>;

type InvalidPhoneNumber = Readonly<{
  type: 'InvalidPhoneNumber';
  error: Error;
}>;

phoneNumberRegex;

// -------------------------------------IO-----------------------------------------

// console.log
// Math.random
// 以及nodejs中的fs等

// 输出不可预测
// IO代表了一种不可变的副作用

type IO<A> = () => A;
const random: IO<number> = () => Math.random();
const now: IO<number> = () => Date.now();
const greet: IO<void> = () => console.log('hello world');

// 对稍后执行的副作用的描述  可以将副作用放到延迟执行函数中
const print =
  (s: string): IO<void> =>
  () =>
    console.log(s);

// print函数就是一个没有副作用的函数
// print_hey_there包含副作用
const print_hey_there = print('hey there');

// const main: IO<void> = pipe(
//     f1('foo'),// 不直接执行 返回的函数包含副作用  返回值类型是一个IO
//     IO.flatMap(f2),
//     IO.flatMap(f3),
//     IO.flatMap(f4)

// )

// 调用main才会调用
