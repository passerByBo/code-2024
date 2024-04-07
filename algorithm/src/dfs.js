const dfs = (root) => {
  const stack = [root];
  const result = [];
  while (stack.length) {
    const node = stack.pop();
    result.push(node.val);
    node.right && stack.push(node.right);
    node.left && stack.push(node.left);
  }

  return result;
};

const bfs = (root) => {
  const queue = [];
  const result = [];
  while (queue.length) {
    const node = queue.pop();
    result.push(node.val);
    node.left && queue.unshift(node.left);
    node.right && queue.unshift(node.right);
  }
  return result;
};
