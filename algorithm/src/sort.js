const bubbleSort = (arr) => {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i; j++) {
      if (arr[j] > arr[j + 1]) {
        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }

  return arr;
};

const selectionSort = (arr) => {
  for (let i = 0; i < arr.length; i++) {
    let minIndex = i;
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }
    if (minIndex !== i) {
      let temp = arr[minIndex];
      arr[minIndex] = arr[i];
      arr[i] = temp;
    }
  }

  return arr;
};

const insertionSort = (arr) => {
  for (let i = 1; i < arr.length; i++) {
    let curr = arr[i];
    let j = i - 1;
    while (j >= 0 && arr[j] > curr) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = curr;
  }
  return arr;
};

const mergeSort = (arr) => {
  if (arr.length < 2) return arr;
  const middle = Math.floor(arr.length);
  const left = arr.slice(0, middle);
  const right = arr.slice(middle);

  return merge(mergeSort(left), mergeSort(right));
};

const merge = (arr1, arr2) => {
  let res = [];
  let a1 = 0;
  let a2 = 0;

  while (a1 < arr1.length && a2 < arr2.length) {
    if (arr1[a1] < arr2[a2]) {
      res.push(arr1[a1]);
      a1++;
    } else {
      res.push(arr2[a2]);
      a2++;
    }
  }

  if (a1 < a1.length) {
    res.concat(arr1.splice(a1));
  }

  if (a2 < a2.length) {
    res.concat(arr2.splice(a2));
  }

  return res;
};

const quickSort = (arr) => {
  if (arr.length < 2) return arr;

  let left = [];
  let right = [];
  const equil = [];
  let pivot = arr[Math.floor(arr.length / 2)];

  for (let a of arr) {
    if (a < pivot) {
      left.push(a);
    } else if (a > pivot) {
      right.push(a);
    } else {
      equil.push(a);
    }
  }

  return [...quickSort(left), ...equil, ...quickSort(right)];
};

const searchIndex = (arr, n) => {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === n) {
      return index;
      break;
    }
  }

  return -1;
};

const binarySearch = (arr, target) => {
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    let middle = Math.floor((left + right) / 2);
    let middleVal = arr[middle];
    if (target > middleVal) {
      left = middle + 1;
      continue;
    } else if (target < middleVal) {
      right = middle - 1;
      continue;
    } else {
      return middle;
    }
  }

  return -1;
};
