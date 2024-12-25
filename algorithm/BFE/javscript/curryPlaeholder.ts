// This is a JavaScript coding problem from BFE.dev

interface Curry {
  (fn: (...args: any[]) => any): (...args: any[]) => any;
  placeholder: Symbol;
}

const curry: Curry = (fn) => {
  // your code here
  // return function curryInner(...args: unknown[]){
  //   const complate = args.length >=fn.length &&  !args.includes(curry.placeholder);
  //   if(complate) return fn(...args);
  //   return (...argsOther: unknown[]) => {
  //     const newArgs = args.map((arg) => arg === curry.placeholder && argsOther.length ? argsOther.shift() : arg)
  //     return curryInner(...newArgs, argsOther)
  //   }
  // }
  // return function curryInner(...args: unknown[]){
  //   const complate = args.length >= fn.length && !args.includes(curry.placeholder);
  //   if(complate) return fn(...args);
  //   const filterPlaceHolder = (item: unknown) => item !== curry.placeholder;
  //   return (...argsOther: unknown[]) => curryInner(...args.filter(filterPlaceHolder), ...argsOther.filter(filterPlaceHolder))
  // }
};

curry.placeholder = Symbol();

//   return function curried(...args) {
//     const complete =
//       args.length >= func.length &&
//       !args.slice(0, func.length).includes(curry.placeholder);
//     if (complete) return func.apply(this, args);
//     return function (...newArgs) {
//       // replace placeholders in args with values from newArgs
//       const res = args.map((arg) =>
//         arg === curry.placeholder && newArgs.length ? newArgs.shift() : arg
//       );
//       return curried(...res, ...newArgs);
//     };
//   };
