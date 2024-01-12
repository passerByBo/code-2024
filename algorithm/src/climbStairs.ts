// 分治大问题转换为小问题
// 动态规划 大问题拆解为小问题处理  在处理子问题上有大的区别
// 动态规划  记录子问题的结果  避免重复执行某些操作

// 爬楼梯经典问题
// 动态规划的思想就是大问题拆分为小问题 解决小问题  并将其解的结果存储  以避免重复计算

// 常见高频考题：背包问题，最长公共子序列，最短路径
/**
 * @param {number} n
 * @return {number}
 */
// 方法1 用数组存储每一步的数量
// var climbStairs = function (n) {
//   if (n <= 2) {
//     return n;
//   }

//   // 创建数组用于存储每一步的不同方式数量
//   const dp = new Array(n + 1);
//   // 初始化数组的值
//   dp[1] = 1;
//   dp[2] = 2;

//   for (let i = 3; i <= n; i++) {
//     dp[i] = dp[i - 1] + dp[i - 2];
//   }

//   return dp[n]
// };

var climbStairs = function (n) {
  if (n <= 2) {
    return n;
  }

  let prev1 = 1;
  let prev2 = 2;
  for (let i = 3; i <= n; i++) {
    [prev1, prev2] = [prev2, prev1 + prev2];
  }

  return prev2;
};
