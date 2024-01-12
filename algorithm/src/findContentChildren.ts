/**
 * @param {number[]} g
 * @param {number[]} s
 * @return {number}
 */
// 贪心算法
// 每一步选择都选择当前状态下的最优
// 局部最优解 -> 全局最优解

//不拆包的情况
//
var findContentChildren = function (g, s) {
  // 先排序
  g.sort((a, b) => a - b);
  s.sort((a, b) => a - b);

  let child = 0, cookie = 0;

  while(child < g.length && cookie < s.length){
    if(g[child] <= s[cookie]){
        child++
    }

    cookie++
  }

  return child
};

console.log(findContentChildren([1,2,2,3],[1,2,3,4]))

// g = [1,2,2,3]
// s = [1,2,3]