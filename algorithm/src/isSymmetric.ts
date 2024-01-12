class TreeNode {
    val: number;
    left: TreeNode | null
    right: TreeNode | null
    constructor(value:number) {
      this.val = value;
      this.left = null;
      this.right = null;
    }
  }
  
  const tree1 = new TreeNode(1);

  tree1.left = new TreeNode(2);
  tree1.right = new TreeNode(2);

  tree1.left.left = new TreeNode(3);
  tree1.left.right = new TreeNode(4);
  
  tree1.right.left = new TreeNode(4);
  tree1.right.right = new TreeNode(3);
  
// 分治   分  解  合
// 动态规划
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
var isSymmetric = function(root:TreeNode | null) {
    if(!root) return true
    function isMirror(t1:TreeNode | null, t2:TreeNode | null):boolean{
        // 解
        if(!t1 && !t2) return true
        if(!t1  || !t2 ) return false
        return (t1.val === t2.val) && isMirror(t1.left, t2.right) && isMirror(t1.right, t2.left)
    }
    // 分
    // 递归合
    return isMirror(root.left, root.right)
}; 

export default isSymmetric