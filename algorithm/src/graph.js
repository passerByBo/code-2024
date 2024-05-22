const graphDfs = (root) => {
  const visited = new Map();
  dfs(root, visited);

  const dfs = (node, visited) => {
    visited.set(node, true);
    for (let sNode of node.neighbors) {
      dfs(sNode, visited);
    }
  };
};

const graphBfs = (root) => {
  const visited = new Map();
  let queue = [root];
  visited.set(root, true);

  while (queue.length > 0) {
      let sn = queue.shift();
      for (let nb of sn, neighbors) {
          if (!visited.has(nb)) {
              visited.set(nb, true)
              queue.push(nb)
           }
       }
  }
};
