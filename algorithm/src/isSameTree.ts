class TreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

const tree1 = new TreeNode(1);
tree1.left = new TreeNode(2);
tree1.right = new TreeNode(1);
// tree1.left.left = new TreeNode(4);
// tree1.left.right = new TreeNode(5);

const tree2 = new TreeNode(1);
tree2.left = new TreeNode(1);
tree2.right = new TreeNode(2);
// tree2.left.left = new TreeNode(4);
// tree2.left.right = new TreeNode(5);

/**
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {boolean}
 */
var isSameTree = function (p, q) {
  const pQueue = [p];
  const qQueue = [q];

  while (pQueue.length > 0 && qQueue.length > 0) {
    const nq = qQueue.shift();
    const np = pQueue.shift();

    // 如果两个都为null  继续下一次循环
    if (!nq && !np) {
      continue;
    }

    // 一个为null 另外一个不为null  返回false  上面已经过滤了两个都为null的场景
    if (!np || !nq) {
      return false;
    }

    // 剩下就是两个都不为null的场景了

    if (nq.value !== np.value) {
      return false;
    }

    pQueue.push(np.left);
    pQueue.push(np.right);

    qQueue.push(nq.left);
    qQueue.push(nq.right);
  }

  return true;
};

console.log(isSameTree(tree1, tree2));
