const binarySearch = (array, target) => {
  let low = 0;
  let high = array.length - 1;

  while(low < high){
    let mid = Math.floor(high - low) /2
    let midValue = array[mid]

    if(midValue === target){
        return mid
    } else if(midValue < target){
        low = mid + 1
    } else {
        high = mid - 1
    }
  }
};
