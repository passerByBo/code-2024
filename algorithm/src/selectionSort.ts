const selectionSort = (arr:number[]) => {
  const length = arr.length;

  for (let i = 0; i < length; i++) {
    let minIndex = i;
    for(let j = i + 1; j< length;j++){
        if(arr[j] < arr[minIndex]){
            minIndex = j
        }
    }

    if(minIndex !== i){
        [arr[minIndex], arr[i]] = [arr[i], arr[minIndex]]
    }
  }

  return arr
};

// 示例
var unsortedArray = [64, 25, 12, 22, 11];
var sortedArray = selectionSort(unsortedArray);
console.log("排序后的数组:", sortedArray);
