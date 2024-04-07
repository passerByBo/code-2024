const preorderTraversal = (root) => {
  const result = [];
  if (!root) return;
  const stack = [root];
  while (stack.length) {
    const node = stack.pop();
    result.push(node.val);
    node.right && stack.push(node.right);
    node.left && stack.push(node.left);
  }

  return result;
};

const inorderTraversal = (root) => {
  const result = [];
  if (!root) return;
  const stack = [];
  let current = root;
  while (current || stack.length) {
    while (current) {
      stack.push(current);
      current = current.left;
    }

    const node = stack.pop();
    result.push(node.val);
    current = node.right;
  }

  return result;
};

const postorderTraversal = (root) => {
  const result = [];
  if (!root) return;
  const stack = [root];
  while (stack.length) {
    const node = stack.pop();
    result.unshift(node.val);
    node.left && stack.push(node.left);
    node.right && stack.push(node.right);
  }

  return result;
};

class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

// 构造树
const root = new TreeNode(1);
root.left = new TreeNode(2);
root.right = new TreeNode(3);
root.left.left = new TreeNode(4);
root.left.right = new TreeNode(5);

console.log("前序遍历:", preorderTraversal(root)); // Output: [1, 2, 4, 5, 3]
console.log("中序遍历:", inorderTraversal(root)); // Output: [4, 2, 5, 1, 3]
console.log("后序遍历:", postorderTraversal(root)); // Output: [4, 5, 2, 3, 1]
