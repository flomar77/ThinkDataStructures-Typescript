interface IStack<T> {
  push(item: T): void;
  pop(): T | undefined;
  peek(): T | undefined;
  size(): number;
}

export default class Stack<T> implements IStack<T> {
  private storage: T[] = [];

  push(item: T): void {
    const current = this.storage;
    current[0] = item;
    this.storage.forEach((v: T, index: number) => {
      current[index + 1] = v;
    });
    this.storage = current;
  }

  pop(): T | undefined {
    const last = this.storage[this.storage.length - 1];
    return this.storage.pop();
  }

  peek(): T | undefined {
    return this.storage[this.storage.length - 1];
  }

  size(): number {
    return this.storage.length;
  }

  includes(value: T): boolean {
    return this.storage.filter((v) => v === value).length > 0;
  }
}
