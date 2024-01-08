function insertionSort(arr:number[]) {
  let len = arr.length;

  for (let i = 1; i < len; i++) {
    const currentElement = arr[i];

    let j = i - 1;
    while (i >= 0 && arr[j] > currentElement) {
        arr[j + 1] = arr[j]
        j--
    }

    // 找到最终的位置
    arr[j+ 1] = currentElement
  }

  return arr
}

console.log(insertionSort([12, 11, 13, 5, 6]));
// [12, 11, 13, 5, 6]  i = 1
// [11, 12, 13, 5, 6]  i = 2
// [5, 11, 12, 13, 6]  i = 3
// [5, 6, 11, 12, 13]  i = 4
export default insertionSort;
