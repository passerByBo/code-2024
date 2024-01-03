/**
 * 最小堆
 *
 */
import ListNode from "./ListNode";

class MinHeap<T extends ListNode> {
  heap: T[];
  constructor() {
    this.heap = [];
  }

  push(node: T) {
    this.heap.push(node);
    this.heapifyUp(this.heap.length - 1);
  }

  pop() {
    if (this.size() === 0) {
      return null;
    }
    const minValue = this.heap[0];
    const lastValue = this.heap.pop();

    if (this.size() > 0) {
      lastValue && (this.heap[0] = lastValue);
      this.heapifyDown(0);
    }
    return minValue;
  }

  size() {
    return this.heap.length;
  }

  heapifyUp(index: number) {
    while (index > 0) {
      // 使用数据描述二叉树 
      const parentIndex = Math.floor((index - 1) / 2);
      if (this.heap[parentIndex] > this.heap[index]) {
        [this.heap[parentIndex], this.heap[index]] = [
          this.heap[index],
          this.heap[parentIndex],
        ];
        index = parentIndex;
      } else {
        break;
      }
    }
  }

  heapifyDown(index: number) {
    while (true) {
      const leftChildIndex = 2 * index + 1;
      const rightChildIndex = 2 * index + 2
      let smallestIndex = index

      if(leftChildIndex < this.size() && this.heap[leftChildIndex].val < this.heap[smallestIndex].val){
        smallestIndex = leftChildIndex;
      }
      if (rightChildIndex < this.size() && this.heap[rightChildIndex].val < this.heap[smallestIndex].val) {
        smallestIndex = rightChildIndex;
      }

      if(index !== smallestIndex){
        [this.heap[index], this.heap[smallestIndex]] = [this.heap[smallestIndex], this.heap[index]];
        index = smallestIndex;
      } else {
        break
      }
    }
  }
}


export default MinHeap

type MinMap = {}
