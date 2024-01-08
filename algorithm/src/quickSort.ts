function quickSort(arr) {
  if (arr.length <= 1) {
    return arr;
  }

  // 选择基准元素
  const povitIndex = Math.floor(arr.length / 2);
  const povit = arr.splice(povitIndex, 1)[0];
  const left = [];
  const right = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] < povit) {
        left.push(arr[i])
    } else {
        right.push(arr[i])
    }
  }

  return quickSort(left).concat([povit], quickSort(right))
}

// 示例
const unsortedArray = [64, 34, 25, 12, 22, 11, 90];
const sortedArr = quickSort(unsortedArray);
console.log("排序后的数组:", sortedArr);

export {};
