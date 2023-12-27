/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
function findKthLargest(nums: number[], k: number): number {
    const minHeap = new MinHeap()
    for(let i = 0;i<nums.length;i++){
        if(minHeap.heap.length < k){
            // 如果堆的大小小于K，则直接插入元素
            minHeap.insert(nums[i])
    }
};

export default findKthLargest