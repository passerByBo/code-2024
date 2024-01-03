const bubbleSort = (arr) => {

    const n = arr.length
    for(let i = 0; i< n - 1; i++){
        for(let j = 0; j< n - i - 1;j++){
            if(arr[j] < arr[j+1]){
                // 交换相邻元素
                [arr[j], arr[j+1]] = [arr[j+ 1], arr[j]]
            }
        }
    }

    return arr
}

bubbleSort([5, 3, 8, 4, 6])