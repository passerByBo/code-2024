import MinHeap from "./minHeap";

var topKFrequent = function (nums, k) {
    const freMap = new Map()
    for (const num of nums) {
        freMap;.set(num, (freMap.get(num) ||0) + 1)
    }
    
    const heap = new MinHeap()
    freMap.forEach((freq, num) => {
        heap.add({ num, freq })
        if (heap.size() > k) { 
            heap.removeMin()
        }
    })
    
    const result = []
    while (!heap.isEmpty()) {
        const { num } = heap.pop()
        result.unshift(num)
    }
    
    return result
};
