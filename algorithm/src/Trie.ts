class Trie {
    static aChartCode = 'a'.charCodeAt(0);
    children: Trie[];
    isEnd: boolean;

    constructor() {
        this.children = new Array(26);
        this.isEnd = false;
    }

    insert(this: Trie, word: string): void {
        let node = this;
        for (let i = 0; i < word.length; i++) {
            const idx = word.charCodeAt(i) - Trie.aChartCode;
            if (node.children[idx] === undefined) {
                node.children[idx] = new Trie();
            }

            node = node.children[idx];
        }
        // 循环完成最后一个node打上结束标识
        node.isEnd = true;
    }

    // 找全部

    find(root: Trie, word: string): boolean {
        let node: Trie = root
        for (let i = 0; i < word.length; i++) {
            if (node.isEnd) {
                if (this.find(node, word.substring(i))) {
                    return false
                }
            }

            const idx = word.charCodeAt(i) - Trie.aChartCode
            if (node.children[idx] === undefined) return false

            node = node.children[idx]
        }

        return node.isEnd
    }

    // 找最小的开头的

    findSp(root: Trie, word: string): string {
        let node = root;
        for (let i = 0; i < word.length; i++) {
            // 已经找到
            if (node.isEnd) {
                return word.substring(0, i);
            }
            const idx = word.charCodeAt(i) - Trie.aChartCode;
            // 不一致
            if (node.children[idx] === undefined) {
                break
            }
            // 继续匹配下一个
            node = node.children[idx]
        }

        return word
    }
}

function replaceWords(dictionary: string[], sentence: string): string {
    const root = new Trie()
    for (let word of dictionary) {
        root.insert(word)
    }

    let res = sentence.split(' ').map(word => root.findSp(root, word))

    return res.join(' ')
}; 

export {}