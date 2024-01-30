/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */

function TreeNode(val, left, right) {
    this.val = (val === undefined ? 0 : val)
    this.left = (left === undefined ? null : left)
    this.right = (right === undefined ? null : right)
}
const root = new TreeNode(1);
root.left = new TreeNode(3);
root.right = new TreeNode(2);

root.left.left = new TreeNode(5);
root.right.right = new TreeNode(9);

root.left.left.left = new TreeNode(6);
root.right.right.left = new TreeNode(7);
/**
 * @param {TreeNode} root
 * @return {number}
 */
// var widthOfBinaryTree = function (root) {
//     if (!root) return 1
//     if (!root.left && !root.right) return 1
//     const queue = [root.left || null, root.right || null]
//     let maxWidth = queue.length
//     let index = maxWidth

//     while (queue.length) {
//         index--
//         const curr = queue.pop()
//         if (curr) {
//             const { left, right } = curr
//             if (left && right) {
//                 queue.unshift(left, right)
//             }

//             if(!left && right){
//                 if(right.left || right.right) queue.unshift(1, right)
                
//             }

//             if(!right && left){
//                 if(left.left || left.right) queue.unshift(left, 1) 
//             }

//             queue.unshift(null, null)
//         }

//         if (index === 0) {
//             index = queue.length
//             maxWidth = Math.max(maxWidth, queue.length)
//         }

//     }

//     return maxWidth
// };

// class Solution:
//     def widthOfBinaryTree(self, root: Optional[TreeNode]) -> int:
//         res = 1
//         arr = [[root, 1]]
//         while arr:
//             tmp = []
//             for node, index in arr:
//                 if node.left:
//                     tmp.append([node.left, index * 2])
//                 if node.right:
//                     tmp.append([node.right, index * 2 + 1])
//             res = max(res, arr[-1][1] - arr[0][1] + 1)
//             arr = tmp
//         return res

/**
 * 计算二叉树的宽度
 * @param {TreeNode} root - 二叉树的根节点
 * @return {number} - 二叉树的宽度
 */
var widthOfBinaryTree = function(root) {
    if (!root) {
        return 0;
    }

    let maxWidth = 0;
    const queue = [{ node: root, position: 0 }];

    while (queue.length > 0) {
        const levelSize = queue.length;
        let leftmostPosition = queue[0].position;

        for (let i = 0; i < levelSize; i++) {
            const { node, position } = queue.shift();

            if (node.left) {
                queue.push({ node: node.left, position: 2 * position });
            }

            if (node.right) {
                queue.push({ node: node.right, position: 2 * position + 1 });
            }

            // 计算每一层的宽度
            maxWidth = Math.max(maxWidth, position - leftmostPosition + 1);
        }
    }

    return maxWidth;
};

var widthOfBinaryTree = function (root) {

}


export { }