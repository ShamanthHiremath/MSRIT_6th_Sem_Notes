// Stack implementation using array
export class Stack {
    constructor() {
        this.items = [];
    }

    // Add element to top of stack
    push(element) {
        this.items.push(element);
        return this.items.length;
    }

    // Remove and return top element
    pop() {
        if (this.isEmpty()) {
            return undefined;
        }
        return this.items.pop();
    }

    // Return top element without removing
    peek() {
        if (this.isEmpty()) {
            return undefined;
        }
        return this.items[this.items.length - 1];
    }

    // Check if stack is empty
    isEmpty() {
        return this.items.length === 0;
    }

    // Return size of stack
    size() {
        return this.items.length;
    }

    // Clear all elements
    clear() {
        this.items = [];
    }

    // Display stack contents
    display() {
        console.log('Stack:', this.items);
    }
}

export default Stack;
