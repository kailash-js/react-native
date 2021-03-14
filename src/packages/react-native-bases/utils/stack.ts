class Stack<T> {
  count: number;
  items: T[];

  constructor() {
    this.items = [];
    this.count = 0;
  }

  getLength(): number {
    return this.count;
  }

  push(item: T) {
    this.items.push(item);
    this.count = this.count + 1;
  }

  pop(): T | undefined {
    if (this.count > 0) {
      this.count = this.count - 1;
    }
    return this.items.pop();
  }

  peek(): T {
    return this.items.slice(-1)[0];
  }

  nearLast(): T {
    if (this.items.length > 1) {
      return this.items[this.items.length - 2];
    } else {
      return this.peek();
    }
  }
}

export {Stack};
