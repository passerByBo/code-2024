function findBalancePoint(nums){
    const totalSum = nums.reduce((sum, n) => sum+n, 0)
    let leftSum = 0;

    for(let i = 0; i< nums.length;i++){
        const rightSum = totalSum-leftSum - nums[i]
        if(leftSum === rightSum){
            return i
        }

        leftSum+=nums[i]
    }

    if(leftSum === totalSum) return -1
}

console.log(findBalancePoint([1,7,3,6,2,9]))
console.log(findBalancePoint([1,2,3,6,2,9]))