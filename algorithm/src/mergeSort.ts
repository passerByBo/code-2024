function mergeSort(arr:number[]):number[]{
    if(arr.length <= 1){
        return arr
    }

    const middle = Math.floor(arr.length / 2)
    const leftHalf = arr.slice(0, middle)
    const rightHalf = arr.slice(middle)


    // 递归继续拆分
    const leftSorted = mergeSort(leftHalf)
    const rightSorted = mergeSort(rightHalf)


    // 合并已排序的数组
    return merge(leftSorted,rightSorted)
}


function merge(left:number[], right:number[]){
    let result = []
    let leftIndex = 0;
    let rightIndex = 0;

    while(leftIndex < left.length && rightIndex < right.length){
        if(left[leftIndex] < right[rightIndex]){
            result.push(left[leftIndex])
            leftIndex++
        } else {
            result.push(right[rightIndex])
            rightIndex++
        }

    }

    
    if(leftIndex ===  left.length){
        result = result.concat(right.slice(rightIndex))
    }

    if(rightIndex === right.length){
        result = result.concat(left.slice(leftIndex))
    }

    return result

}

// 示例
var unsortedArray = [38, 27, 43, 3, 9, 82, 10];
var sortedArray = mergeSort(unsortedArray);
console.log("排序后的数组:", sortedArray);

export {mergeSort}