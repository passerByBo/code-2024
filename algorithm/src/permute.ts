/**
 * @param {number[]} nums
 * @return {number[][]}
 */
// 回溯的方式解决
// 主要解决 组合 排列  子集
// 大量的候选解中找到合适的
var permute = function(nums) {
  const res = []
  
  const backtrack = (path) => {
    // 数量达到初始数组的长度
    if(path.length === nums.length){
        res.push(path)
        // 退出函数调用栈
        return
    }

    nums.forEach(n => {
        // 如果在子数组中已经存在该数据退出
        if(path.includes(n)) return
        // 如果子数组中不存在 压入循环中的调函调用栈
        backtrack(path.concat(n))
    })
  }

  backtrack([])

  return res
};


console.log(permute([1,2,3]))
