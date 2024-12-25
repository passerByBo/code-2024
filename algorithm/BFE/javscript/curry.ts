// This is a JavaScript coding problem from BFE.dev

type Curry = (fn: (...args: any[]) => any) => (...args: any[]) => any;

const curry: Curry = (fn) => {
  // your code here
  return function curryInner(...args: unknown[]) {
    if (args.length >= fn.length) return fn(...args);
    return (...argsOther: unknown[]) => curryInner(...args, ...argsOther);
  };
};
