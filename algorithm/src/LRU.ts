// 使用队列
class LRUCache {
    capacity: number;
    catch: Map<number, number>;
    constructor(capacity: number) {
      this.capacity = capacity;
      this.catch = new Map();
    }
  
    get(key: number): number {
      if (this.catch.has(key)) {
        const value = this.catch.get(key);
        this.catch.delete(key);
        this.catch.set(key, value);
        return value;
      }
  
      return -1;
    }
  
    put(key: number, value: number): void {
      if (this.catch.has(key)) {
        this.catch.delete(key);
        this.catch.set(key, value);
      } else {
        if (this.catch.size >= this.capacity) {
          const oldNum = this.catch.keys().next().value;
          this.catch.delete(oldNum);
        }
        this.catch.set(key, value);
      }
    }
  }
  
  const lRUCache = new LRUCache(2);
  lRUCache.put(1, 1); // 缓存是 {1=1}
  lRUCache.put(2, 2); // 缓存是 {1=1, 2=2}
  lRUCache.get(1); // 返回 1
  lRUCache.put(3, 3); // 该操作会使得关键字 2 作废，缓存是 {1=1, 3=3}
  lRUCache.get(2); // 返回 -1 (未找到)
  lRUCache.put(4, 4); // 该操作会使得关键字 1 作废，缓存是 {4=4, 3=3}
  lRUCache.get(1); // 返回 -1 (未找到)
  lRUCache.get(3); // 返回 3
  lRUCache.get(4); // 返回 4