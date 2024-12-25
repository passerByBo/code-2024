// This is a JavaScript coding problem from BFE.dev

type Flat = (arr: Array<any>, depth?: number) => Array<any>;

const flat: Flat = function (arr, depth = 1) {
  console.log(depth);
  return depth
    ? arr.reduce((acc, curr) => {
        return [
          ...acc,
          ...(Array.isArray(curr) ? flat(curr, depth - 1) : [curr]),
        ];
      }, [])
    : arr;
};

flat(
  [1, 2, "empty", "empty", undefined, [3, 4, [5, 6, [7, 8, [9, 10]]]]],
  Infinity
);
