class TreeNode<K, V> {
    key: K;
    value: V;
    leftNode?: TreeNode<K, V> | undefined = undefined;
    rightNode?: TreeNode<K, V> | undefined = undefined;
    constructor(key: K, value: V) {
        this.key = key;
        this.value = value;
    }
}
class TreeNodeWithParent<K, V> {
    node: TreeNode<K, V>;
    parent: TreeNode<K, V>;
    constructor(node: TreeNode<K, V>, parent: TreeNode<K, V>) {
        this.node = node;
        this.parent = parent;
    }
}
export default class MyTreeMap<K, V> extends Map<K, V> {
    size = 0;
    root: TreeNode<K, V> | undefined = undefined;
    array: K[] = [];
    setTree(node: TreeNode<K, V>, size: number) {
        this.root = node;
        this.size = size;
    }

    clear() {
        this.root = undefined;
        this.size = 0;
    }

    get(key: K): V | undefined {
        const node = this.findNode(key);
        if (node !== undefined && node !== null) {
            return node.value;
        } else {
            return undefined;
        }
    }

    remove(key: K, value: V) {
        const nodeWithParent = this.findNodeWithParent(key);
        if (nodeWithParent !== null) {
            nodeWithParent.node.key < nodeWithParent.parent.key
                ? (nodeWithParent.parent.leftNode = undefined)
                : (nodeWithParent.parent.rightNode = undefined);
        }
    }

    add(key: K, value: V) {
        if (this.root === undefined) {
            this.root = new TreeNode(key, value);
            this.size++;
            return;
        }
        const exists = this.findNode(key);
        if (exists !== null) {
            exists.value = value;
        } else {
            this.addHelper(this.root, key, value);
            this.size++;
        }
    }
    addHelper(node: TreeNode<K, V>, key: K, value: V) {
        if (node.key > key) {
            if (node.leftNode === undefined) {
                node.leftNode = new TreeNode(key, value);
            } else this.addHelper(node.leftNode, key, value);
        }
        if (node.key < key) {
            if (node.rightNode === undefined) {
                node.rightNode = new TreeNode(key, value);
            } else this.addHelper(node.rightNode, key, value);
        }
    }
    has(key: K): boolean {
        return this.findNode(key) !== undefined;
    }

    makeNode(key: K, value: V) {
        return new TreeNode(key, value);
    }

    containsKey(key: K) {
        return this.findNode(key) !== null;
    }

    findNode(key: K): TreeNode<K, V> | null {
        let searchedNode = null;
        if (this.root === undefined || this.root === null) {
            throw new Error('Map has no root node.');
        }
        searchedNode = this.findKey(key, this.root);
        return searchedNode !== undefined && searchedNode !== null
            ? searchedNode.node
            : null;
    }
    findNodeWithParent(key: K): TreeNodeWithParent<K, V> | null {
        if (this.root === undefined || this.root === null) {
            throw new Error('Map has no root node.');
        }
        if (key === this.root.key) {
            throw new Error('Node has no parents');
        }
        const searchedNode = this.findKey(key, this.root);
        return searchedNode !== undefined && searchedNode !== null
            ? searchedNode
            : null;
    }
    findKey(key: K, node: TreeNode<K, V>): TreeNodeWithParent<K, V> | null {
        console.log(key);
        if (key > node.key) {
            return this.findRight(key, node);
        }
        if (node.leftNode?.key !== undefined && node.leftNode?.key !== null) {
            if (node.leftNode.key === key) {
                return new TreeNodeWithParent(node.leftNode, node);
            } else {
                return this.findKey(key, node.leftNode);
            }
        }
        return null;
    }
    findRight(key: K, node: TreeNode<K, V>): TreeNodeWithParent<K, V> | null {
        if (node.rightNode?.key !== undefined && node.rightNode?.key !== null) {
            if (node.rightNode.key === key) {
                return new TreeNodeWithParent(node.rightNode, node);
            } else {
                return this.findKey(key, node.rightNode);
            }
        }
        return null;
    }
    containsFirstValue(node: TreeNode<K, V> | undefined, value: V) {
        if (node == null) {
            return false;
        }
        if (value === node.value) {
            return true;
        }
        if (
            this.isNotUndefined(node.leftNode) &&
            this.containsFirstValue(node.leftNode, value)
        ) {
            return true;
        }
        if (
            this.isNotUndefined(node.rightNode) &&
            this.containsFirstValue(node.rightNode, value)
        ) {
            return true;
        }
        return false;
    }
    containsValue(value: V): boolean {
        return this.containsFirstValue(this.root, value);
    }
    isNotUndefined(node: TreeNode<K, V> | undefined) {
        return node !== undefined;
    }
    findNext(node: TreeNode<K, V> | undefined) {
        if (node?.leftNode !== undefined) {
            this.pushInArray(node.key);
        }
        if (node?.leftNode !== undefined) {
            this.findNext(node.leftNode);
            this.pushInArray(node.leftNode.key);
        } else return undefined;
        if (node?.rightNode !== undefined) {
            this.findNext(node.rightNode);
            this.pushInArray(node.rightNode.key);
        }
    }
    pushInArray(key: K) {
        if (!this.array.includes(key)) {
            this.array.push(key);
        }
    }
    sortedKeys(): Set<K> {
        this.findNext(this.root);
        return new Set(this.array.sort());
    }
}
