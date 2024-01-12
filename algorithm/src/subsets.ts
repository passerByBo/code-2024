/**
 * @param {number[]} nums
 * @return {number[][]}
 */
// 使用递归实现   回溯
// var subsets = function (nums) {
//   const res = [];

//   function dfs(current, index) {
//     res.push(current);
//     for (let i = index; i < nums.length; i++) {
//       dfs([...current, nums[i]], ++i);
//     }
//   }

//   dfs([], 0);

//   return res;
// };

var subsets = function (nums) {
  const ans = [];
  const n = nums.length;

  for (let mask = 0; mask < (1 << n); ++mask) {
    const t = [];
    console.log(mask);
    console.log("---");

    for (let i = 0; i < n; ++i) {
      console.log("结果", mask, 1 << i, mask & (1 << i));
      if(mask & (1 << i)){
        t.push(nums[i])
      }
      console.log(t)
    }

    ans.push(t)
  }

  return ans
};

subsets([1, 2, 3]);

// 左移操作 x << y = x * 2^y
// 3 << 2   = 3 * 2 ^ 2 = 12
// 5 << 1 = 5 * 2 ^ 1 = 10
// 子集的个数的2^n 个
