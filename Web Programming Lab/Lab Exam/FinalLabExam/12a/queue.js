// Queue implementation using array
export class Queue {
    constructor() {
        this.items = [];
    }

    // Add element to rear of queue
    enqueue(element) {
        this.items.push(element);
        return this.items.length;
    }

    // Remove and return front element
    dequeue() {
        if (this.isEmpty()) {
            return undefined;
        }
        return this.items.shift();
    }

    // Return front element without removing
    front() {
        if (this.isEmpty()) {
            return undefined;
        }
        return this.items[0];
    }

    // Check if queue is empty
    isEmpty() {
        return this.items.length === 0;
    }

    // Return size of queue
    size() {
        return this.items.length;
    }

    // Clear all elements
    clear() {
        this.items = [];
    }

    // Display queue contents
    display() {
        console.log('Queue:', this.items);
    }
}

export default Queue;
