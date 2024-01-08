const sequentialSearch = (arr:number[], s:number) => {
    for(let i = 0; i< arr.length;i++){
        if(arr[i] === s){
            return i       
         }
    }
    return -1
}