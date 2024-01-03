/**
 * Definition for singly-linked list.
 * class ListNode {
 *     val: number
 *     next: ListNode | null
 *     constructor(val?: number, next?: ListNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.next = (next===undefined ? null : next)
 *     }
 * }
 */

import ListNode from './ListNode'
import MinHeap from './minHeap';
// 示例使用
const list1 = new ListNode(1, new ListNode(4, new ListNode(5)));
const list2 = new ListNode(1, new ListNode(3, new ListNode(4)));
const list3 = new ListNode(2, new ListNode(6));
function mergeKLists(lists: Array<ListNode | null>): ListNode | null {
    const minHeap =  new MinHeap()
    lists.forEach(list => {
        if(list){
            minHeap.push(list)
        }
    })

    const dummy = new ListNode(-1)
    let current = dummy

    while(minHeap.size() > 0){
        const smallest = minHeap.pop();
        current.next = smallest
        current = current.next as ListNode;
        if (smallest && smallest.next) {
            minHeap.push(smallest.next);
          }
    }
    return dummy.next

}

mergeKLists([list1,list2,list3])
