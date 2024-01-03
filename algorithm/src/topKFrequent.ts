/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
// var topKFrequent = function (nums: number[], k: number): number[] {};

// 归并排序O(n log n)
const mergeSort = (arr: number[]): number[] => {
  if (arr.length <= 1) return arr;

  const middle = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, middle));
  const right = mergeSort(arr.slice(middle));

  return merge(mergeSort(left), mergeSort(right));
};

const merge = (left: number[], right: number[]): number[] => {
  let result = [];
  let leftIndex = 0;
  let rightIndex = 0;

  while (leftIndex < left.length && rightIndex < right.length) {
    if (left[leftIndex] < right[rightIndex]) {
      result.push(left[leftIndex]);
      leftIndex++;
    } else {
      result.push(right[rightIndex]);
      rightIndex++;
    }
  }
  return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
};


mergeSort([1,1,1,2,2,3])
