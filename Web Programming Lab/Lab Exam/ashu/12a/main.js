import Stack from './stack.js';
import Queue from './queue.js';

// Test Stack
console.log('=== STACK OPERATIONS ===');
const stack = new Stack();

console.log('Is empty:', stack.isEmpty()); // true
console.log('Push 10:', stack.push(10));   // 1
console.log('Push 20:', stack.push(20));   // 2
console.log('Push 30:', stack.push(30));   // 3
stack.display();                           // Stack: [10, 20, 30]
console.log('Size:', stack.size());        // 3
console.log('Peek:', stack.peek());        // 30
console.log('Pop:', stack.pop());          // 30
console.log('Peek:', stack.peek());        // 20
stack.display();                           // Stack: [10, 20]
stack.clear();
console.log('Is empty after clear:', stack.isEmpty()); // true

console.log('\n=== QUEUE OPERATIONS ===');
const queue = new Queue();

console.log('Is empty:', queue.isEmpty()); // true
console.log('Enqueue A:', queue.enqueue('A')); // 1
console.log('Enqueue B:', queue.enqueue('B')); // 2
console.log('Enqueue C:', queue.enqueue('C')); // 3
queue.display();                           // Queue: ['A', 'B', 'C']
console.log('Size:', queue.size());        // 3
console.log('Front:', queue.front());      // A
console.log('Dequeue:', queue.dequeue());  // A
console.log('Front:', queue.front());      // B
queue.display();                           // Queue: ['B', 'C']
queue.clear();
console.log('Is empty after clear:', queue.isEmpty()); // true
