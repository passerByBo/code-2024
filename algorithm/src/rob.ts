/**
 * @param {number[]} nums
 * @return {number}
 */

// 状态转移方程 dp[i] = Math.max(dp[i-2]+ num[i], dp[i - 1])
// var rob = function(nums) {

//     if(nums.length === 0) return 0
//     if(nums.length === 1) return nums[0]
//     const length = nums.length;
//     const dp = new Array(length)

//     dp[0] = nums[0]
//     dp[1] = Math.max(nums[1], dp[0])

//     for(let i = 2;i<length;i++){
//         dp[i] = Math.max(dp[i - 2]+ nums[i], dp[i - 1])
//     }

//     return dp[length - 1]
// };

// [1,2,3,1]

var rob = function(nums) {
    if(nums.length === 0) return 0
    let prev1 = 0, prev2 = 0;
   
    for(let num of nums){
        [prev1, prev2] = [Math.max(prev2 + num, prev1), prev1]
    }

    return prev1
}