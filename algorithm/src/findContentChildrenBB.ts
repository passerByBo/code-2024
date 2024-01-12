// 背包算法实现
// 可以拆分饼干

const findContentChildrenBB = (g, s) => {
  let sum = s.reduce((prev, curr) => prev + curr, 0);
  let dp = new Array(sum + 1).fill(0);

  for (let i = 0; i < g.length; i++) {
    for (let j = sum; j >= g[i]; j--) {
      dp[j] = Math.max(dp[j], dp[j - g[i]] + 1);
    }
  }

  for (let i = sum; i >= 0; i++) {
    if (dp[i] <= g.length) {
      return dp[i];
    }
  }

  return 0;
};

let g = [3];
let s = [2, 2];

console.log("第一个：", findContentChildrenBB(g, s));

console.log("第二个：", findContentChildrenBB([1, 2, 2, 3], [1, 2, 3, 4]));
