// pf+ts not fp-ts

import { magma } from 'fp-ts';
import { HKT, Kind, Kind2, URIS, URIS2 } from 'fp-ts/HKT';
import { Semigroup } from 'fp-ts/lib/Ordering';
import { MagmaSub } from 'fp-ts/lib/number';

// --------------------------------- Maybe-----------------------------
// null的处理
type OptionB<A> = A | null;

type MabyInteger = Option<number>;

// Maybe
type Option<A> = Some<A> | None;

// Just
// type Some<A> = {
//     value: A
// }
// const none = Symbol('None')
// Nothing
// type None = typeof none

// 或者设置另外一种实现 { tag: 'None' } { tag: 'Some', value: ''}

interface Some<A> {
  _tag: 'Some';
  value: A;
}

interface None {
  _tag: 'None';
}

const some = <A>(x: A): Option<A> => ({ _tag: 'Some', value: x });
const none: Option<never> = { _tag: 'None' };

const isNone = <A>(x: Option<A>): x is None => x._tag === 'None';

type DivideTwo2 = (x: number) => Option<number>;
const divideTwo2 = x => (x === 0 ? none : some(2 / x));

const compose2 = compose((x: Option<number>) => increment(x), divideTwo2);

// ----------------------------------------Either--------------------------------
// 异常的处理

type Either<E, A> = Left<E> | Right<A>;

interface Left<E> {
  _tag: 'Left';
  readonly left: E;
}

interface Right<A> {
  _tag: 'Right';
  readonly right: A;
}

const left = <E, A = never>(e: E): Either<E, A> => ({
  _tag: 'Left',
  left: e,
});

const right = <A, E = never>(a: A): Either<E, A> => ({
  _tag: 'Right',
  right: a,
});

const isLeft = <E, A>(x: Either<E, A>): x is Left<E> => x._tag === 'Left';

// -------------------------------------linked List-----------------------------------
// 循环处理
// 递归
// 增加新的数据结构  链表

interface Nil {
  readonly _tag: 'Nil';
}

interface Cons<A> {
  readonly _tag: 'Cons';
  readonly head: A;
  readonly tail: List<A>;
}

type List<A> = Nil | Cons<A>;

const nil: List<never> = { _tag: 'Nil' };

const cons = <A>(head: A, tail: List<A>): List<A> => ({
  _tag: 'Cons',
  head,
  tail,
});

const isNil = <A>(xs: List<A>): xs is Nil => xs._tag === 'Nil';

const l = cons(1, cons(2, cons(3, nil)));

type ShowList = <A>(xs: List<A>) => string;
const showList: ShowList = xs =>
  isNil(xs) ? '' : `${xs.head}` + (isNil(xs.tail) ? '' : `, ${showList(xs.tail)}`);

// 组合类型 或者是符合类型ADT
// Algebraic Data Type

// 代数效应
// 代数数据类型

// 组合数据类型的数学概念  两种基本操作组成  product乘法和Sum加法
// 乘法对应的是元祖和多个属性组合成对象
// 加法通常表达为联合类型和枚举

// 如下从Option Either List中取值 并且  将特殊类型根据转换函数生成对应的值

// Option
type MatchOption = <A, B>(onNone: () => B, onSome: (a: A) => B) => (x: Option<A>) => B;
const matchOption: MatchOption = (onNone, onSome) => x => (isNone(x) ? onNone() : onSome(x.value));

type MatchWOption = <A, B, C>(onNone: () => B, onSome: (a: A) => C) => (x: Option<A>) => B | C;

const matchWOption: MatchWOption = (onNone, onSome) => x =>
  isNone(x) ? onNone() : onSome(x.value);

const maybeNum: Option<number> = some(15);

const result = matchWOption(
  () => -2,
  (a: number) => `num is ${a}`,
)(maybeNum);

// Either

type MatchEither = <E, A, B>(onLeft: (e: E) => B, onRight: (a: A) => B) => (x: Either<E, A>) => B;
const matchEither: MatchEither = (onLeft, onRight) => x =>
  isLeft(x) ? onLeft(x.left) : onRight(x.right);

const errorOrNum: Either<string, number> = right(1);
const errorOrNum2: Either<string, number> = left('bad input');

const resultEither = matchEither(
  (e: string) => `Error happend: ${e}`,
  (a: number) => `num is ${a}`,
)(errorOrNum);
const result2 = matchEither(
  (e: string) => `Error happend: ${e}`,
  (a: number) => `num is ${a}`,
)(errorOrNum2);

// List
type MatchList = <A, B>(
  onNil: () => B,
  onCons: (head: A, tail: List<A>) => B,
) => (xs: List<A>) => B;

const matchList: MatchList = (onNil, onCons) => xs =>
  isNil(xs) ? onNil() : onCons(xs.head, xs.tail);

const myList: List<number> = cons(1, cons(2, cons(3, nil)));

const resultList = matchList(
  () => `list is empty`,
  (head, tail) => `head is ${head}`,
)(myList);

// ta-paltten 库的支持  可以不用自己写如此多的match

// -------------------------------categroy-------------------------------------
// 范畴论
// 对象和变形关系
// 数据和数据之间的转换

// 1、composition definition 组合定义 数据关联变形转换
// 2、composition Associativity  关联性  结合性  和顺序无关性
// 3、composition Identity     唯一性 自身的变形关系为id

// definition
// a -> b -> c 变形关系是f g
// a -> c  变形关系是k

// Associativity 顺序无关的结合律 从基础的定义 推断出所有子类型的关系
// a->b->c-d   a->d     h.(g . f)  (h.g).f
// 组件小的变形关系

// identity
// id1  f  id2
// f.id1 = f
// id2.f=f

// 定义关系
// x -> xy -> xyz  -> wxyz
// x -> wxyz
// 组合推断结合 都满足条件
// x -> xyz
// xy -> wxyz
// 每个对象都有一个恒等的箭头就是id 自身的变形关系

// https://www.youtube.com/playlist?list=PLbgaMIhjbmEnaH_LTkxLI7FMa2HsnawM_

// ----------------------------------- Magma semigroup monoid ---------------------------------------------

// Magma
// Set<M>  二元计算函数从该集合中接收两个值并将其映射到该集合中的另一个值

// interface Magma<M> {
//     concat: (x: M, y: M) => M
// }

// (3+4)+5 = 3 + (4 + 5) 判断是否具有结合性来判断是否为Magma

// 结合顺序无关，可以随时去掉分组的括号

// Semigroup
// interface Semigrroup<S> extends Magma<S> {

// }

// 结合不直接关联的运算
// 1 + 4 + 5 + -2 + 7 + -3
// (1 + 4) + 5 + (-2 + 7) + -3
// 继续结合下去

// 也可以递归 1+()

// Monoid
// interface Monid<M> extends Semigrroup<M> {
//     empty: M
// }

// 如上三种结构提供了组合值的新方式
type AddAll = (xs: List<number>) => number;

// const addAll: AddAll = (xs) =>
//     match(
//         () => 0,
//         (head: number, tail: List<number>) => head + addAll(tail)
//     )(xs)
// 删除左右的xs
// const addAll: AddAll = match(
//     () => 0,
//     (head: number, tail: List<number>) => head + addAll(tail)
// )

// add multiply append 定义三种函数 进行  加  乘  累加操作
// magma可以对函数进行抽象  抽象差异
// 大多数实际操作中concat是关联的，这就是半群（semigroup）结构

interface Magma<A> {
  concat: (x: A, y: A) => A;
}

interface Semigroup<A> extends Magma<A> {}

const addSemigroup: Semigroup<number> = {
  concat: (x, y) => x + y,
};
const multiplySemigroup: Semigroup<number> = {
  concat: (x, y) => x * y,
};
const appendSemigroup: Semigroup<string> = {
  concat: (x, y) => x.concat(y),
};

const concatAll =
  <A>(s: Semigroup<A>) =>
  (startWidth: A) =>
  (xs: List<A>): A =>
    match(
      () => startWidth,
      (head: A, tail: List<A>) => s.concat(head, concatAll(s)(startWidth)(tail)),
    )(xs);

concatAll(addSemigroup)(0)(cons(2, cons(3, cons(4, nil))));
concatAll(multiplySemigroup)(1)(cons(2, cons(3, cons(4, nil))));
concatAll(appendSemigroup)('')(cons('hello', cons('', cons('world', nil))));

// 有一个相同的起点和相同的中性值来组合我们的类型 monoid
interface Monoid<A> extends Semigroup<A> {
  empty: A; // 中性值
}

const addMonoid: Monoid<number> = { ...addSemigroup, empty: 0 };
const multiplyMonoid: Monoid<number> = { ...multiplySemigroup, empty: 1 };
const appendMonoid: Monoid<string> = { ...appendSemigroup, empty: '' };

const concatAll2 =
  <A>(m: Monoid<A>) =>
  (xs: List<A>): A =>
    matchList(
      () => m.empty,
      (head: A, tail: List<A>) => m.concat(head, concatAll2(m)(tail)),
    )(xs);

// ----------------------------------------Group-------------------------------------
// 群结构
// Magma A * A -> A 描述两个值变换成集合内的另外一个值
// Semigroup a * (b * c) = (a * b) * c  顺序无关结合率
// Monid a * I = I * a = a 在集合中具有恒等值
// Group a * a' = I a' * a = I 集合的逆

// interface Group<A> {
//     concat: (x: A, y: A) => A,// 封闭的二元运算
//     empty: A,// 空的标示值
//     inverse: (a: A) => A// 逆运算的方法
// }

//逆操作就是concat后  调用逆操作可能会回到到原来的自己
interface Group<A> extends Monoid<A> {
  inverse: (a: A) => A;
}

const addGroup: Group<number> = {
  concat: (x, y) => x + y,
  empty: 0,
  inverse: x => -x,
};

// 逆操作是正向操作的反操作
const walleBalance = addGroup.concat(
  addGroup.empty,
  addGroup.concat(80, addGroup.concat(20, addGroup.inverse(10))),
);

// 凯撒密码

type Encrypt = (plainText: string, key: number) => string;
type Decrypt = (cipherText: string, key: number) => string;

const alphabets = 'abcdefghijklmnopqrstuvwxyz';

const caeserGroup: Group<number> = {
  // 移动两次位置  2 + 3 = 5
  concat: (x, y) => (x + y) % alphabets.length,
  empty: 0,
  inverse: a => (alphabets.length - a) % alphabets.length,
};

const encrypt: Encrypt = (plainText, key) =>
  plainText
    .toLowerCase()
    .split('')
    .map(c => {
      const index = alphabets.indexOf(c);
      if (index === -1) return c;

      const newIndex = caeserGroup.concat(index, key);
      return alphabets[newIndex];
    })
    .join('');

const decrypt: Decrypt = (cipherText, key) => encrypt(cipherText, caeserGroup.inverse(key));

// ---------------------------------Functor------------------------------------
// 函子
// 根据特性定义类别
// 两个类别之间的映射称为函子 F

// type map_option = <A, B>(f: A=>B) => Option<A> => Option<B>
// type map_list = <A, B>(f: A=> B) => List<A> => List<B>
// type map_either = <A, B, T>(f: A=> B) => Either<T, A> => Either<T, B>

// 对如上的map进行抽象
// interface Functor<F> {
//     map: <A,B,...>(F: A=>B) => F<...,A> => F<...Semigroup, B>
// }

const strLength = (x: string) => x.length;
const increment = (x: number) => x + 1;

// 数据存储到option中
type OptionStrLength = (Fx: Option<string>) => Option<number>;
const strLength1: OptionStrLength = matchOption(
  () => none,
  value => some(strLength(value)),
);

type OptionIncrement = (Fx: Option<number>) => Option<number>;
const increment1: OptionIncrement = matchOption(
  () => none,
  value => some(increment(value)),
);

// map Option
// 提取公共的映射关系
type MapOption = <A, B>(f: (x: A) => B) => (Fx: Option<A>) => Option<B>;

const map_option: MapOption = f =>
  matchOption(
    () => none,
    value => some(f(value)),
  );

const strLength2 = map_option(strLength);
const increment2 = map_option(increment);

const incrementLength = compose(increment, strLength);

const function1 = compose(map_option(increment), map_option(strLength));
const function2 = map_option(incrementLength);

// list functor map
const list1: List<string> = cons('a', cons('bb', cons('ccc', nil)));

type MapList = <A, B>(f: (x: A) => B) => (Fx: List<A>) => List<B>;

const map_list: MapList = f =>
  matchList(
    () => nil,
    (head, tail) => cons(f(head), map_list(f)(tail)),
  );

const strLength3 = map_list(strLength);
strLength3(list1);

// Either functor map
type MapEither = <A, B, E>(f: (x: A) => B) => (Fx: Either<E, A>) => Either<E, B>;
const map_either: MapEither = f =>
  matchEither(
    e => left(e),
    value => right(f(value)),
  );

const increment4 = map_either(increment);
const strLength4 = map_either(strLength);

// 如上参数类型都比较类似 是否可以定义一个通用的map方法
// Option<A>
// List<A>
// Eigther<E, A>

// ------------------------------------Higher Order Function-------------------------------------------
// 函数作为参数或者返回值
// lambda简化
// 要处理的数据放到最后 抽取公共谓词函数 增加复用性
type Filter = <A>(f: (a: A) => boolean) => (as: A[]) => A[];

// ------------------类型的更高级抽象----------------------
// value universe 12 'hello' true
// type universe Integer  string  Integer=>Boolean Option<Boolean>
// kind Universe  Option    boolean->Option<boolean> Type->Type  Either:Type->Type->Type

// 对类型进行抽象
// Array<Integer>
// Array<Boolean>
// Array<String>
// 抽象为 Array<A> 使用泛型进行类型的抽象

// Array<Integer>
// List<Integer>
// Option<Integer>
// 抽象为F<Integer>  泛型类构造函数

// 这就是Higher Kinded Type
// 优先级从右到左

// type map_option = <A, B>(f: A=>B) => Option<A> => Option<B>
// type map_list = <A, B>(f: A=> B) => List<A> => List<B>
// type map_either = <A, B, T>(f: A=> B) => Either<T, A> => Either<T, B>

// 抽象为Functor<F> F为高阶类型变量

// Functor < F > {
//     map: <A, B>(f: A=>B) => F<A> => F<B>
// }

// -----------------------------TypeClass---------------------------------
// 函数式编程中强大的工具称为类型类

// Morphism 态射

// 在类的级别实现多态性
// polymorphism
// Poly which means many or multiply  多个
// Morphism which means form or shape  形状

// 参数多态性
function toString<A>(a: A) {
  return a + '';
}
// Ad-hoc polymorphism 临时多态性

interface Show<A> {
  toString: (a: A) => string;
}

// 定义的接口要想使用他 就需要实现对应的版本
const numShow: Show<number> = { toString: a => a.toString() };
const strShow: Show<string> = { toString: a => a };
const boolShow: Show<boolean> = { toString: a => (a ? 'Yes' : 'No') };

// 临时多态性中，需要为每一种支持的类型指定不同的实现
// 参数多态性中  由于实现是固定的 可以把它当做参数传递给函数并从函数返回

// 想要获得更高级别的抽象 不能从type层面思考 需要从kind层面思考

// show ----toString---> string
// Type Class 根据类型表现出的行为对类型进行分组和分类

// interface 侧重于对象  type侧重于类型别名

// typeclass Functor < F > {
//     map: (f: A=>B) => F<A> => F<B>
// }

// interface Functor<F> {
//     map: <A, B>(f: (a: A) => B) => (fa: F<A>) => F<B>
// }
// 无法将类型构造函数作为类型参数传递
// const OptionFunctor: Functor<Option> = {}

// Effect-ts 对更高级抽象实现更好
// 但是对于学习者来说 fp-ts 中的HKT接口就够用了  higher-kinded

// interface FunctorHKT<F> {
//     map: <A, B>(f: (a: A) => B) => (fa: HKT<F, A>) => HKT<F, A>
// }

// 不过还需要书写更多的模板代码 为每个Functor实例定义单独的接口

// interface Functor1<F> {
//     map: <A, B>(f: (a: A) => B) => (fa: Kind1<F, A>) => Kind1<F, B>
// }
// const OptionFunctor: Functor1<'Option'> = {}
// interface Functor2<F> {
//     map: <E, A, B>(f: (a: A) => B) => (fa: Kind2<F, E, A>) => Kind2<F, E, B>
// }
// const OptionFunctor2: Functor2<'Either'> = {}

// 提供的类型增强实现方式
declare module 'fp-ts/HKT' {
  // 将我们需要添加自动的path 合并到URItoKind和URItoKind2 动态添加
  interface URItoKind<A> {
    List: List<A>;
    OptionM: Option<A>;
  }

  interface URItoKind2<E, A> {
    EitherM: Either<E, A>;
  }
}

interface Functor<F> {
  URI: F;
  map: <A, B>(f: (x: A) => B) => (fa: HKT<F, A>) => HKT<F, B>;
}

interface Functor1<F extends URIS> {
  URI: F;
  map: <A, B>(f: (a: A) => B) => (fa: Kind<F, A>) => Kind<F, B>;
}

interface Functor2<F extends URIS2> {
  URI: F;
  map: <E, A, B>(f: (a: A) => B) => (fa: Kind2<F, E, A>) => Kind2<F, E, B>;
}

const optionFunctor: Functor1<'OptionM'> = {
  URI: 'OptionM',
  map: f =>
    matchOption(
      () => none,
      a => some(f(a)),
    ),
};

const ListFunctor: Functor1<'List'> = {
  URI: 'List',
  map: f =>
    matchList(
      () => nil,
      (head, tail) => cons(f(head), ListFunctor.map(f)(tail)),
    ),
};

const eitherFunctor: Functor2<'EitherM'> = {
  URI: 'EitherM',
  map: f =>
    matchEither(
      e => left(e),
      a => right(f(a)),
    ),
};

function lift<F extends URIS2>(
  F: Functor2<F>,
): <E, A, B>(f: (x: A) => B) => (fa: Kind2<F, E, A>) => Kind2<F, E, B>;
function lift<F extends URIS>(
  F: Functor1<F>,
): <A, B>(f: (x: A) => B) => (fa: Kind<F, A>) => Kind<F, B>;
function lift<F>(F: Functor<F>): <A, B>(f: (x: A) => B) => (fa: HKT<F, A>) => HKT<F, B>;
function lift<F>(F: Functor<F>): <A, B>(f: (x: A) => B) => (fa: HKT<F, A>) => HKT<F, B> {
  return f => fa => F.map(f)(fa);
}

const liftIncrement = lift(optionFunctor)(increment);
const liftIncrement2 = lift(eitherFunctor)(increment);
const liftIncrement3 = lift(ListFunctor)(increment);
