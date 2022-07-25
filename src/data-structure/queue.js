export class Queue {

    constructor(size) {
        this.size = size;
        this.length = 0;
        this.head = null;
        this.tail = null;
    }

    isEmpty() {
        return this.length === 0;
    }

    isFull() {
        return this.length === this.size;
    }

    enqueue(item) {
        const newItem = {
            val: item,
            prev: null
        };

        if (this.isEmpty()) {
            this.head = newItem;
            this.tail = newItem;
            this.length++;
        } else if (!this.isFull()) {
            this.tail.prev = newItem;
            this.tail = this.tail.prev;
            this.length++;
        }
    }

    dequeue() {
        if(this.isEmpty())
            return null;

        const result = this.head.val;
        this.length--;

        if(this.isEmpty()) {
            this.head = null;
            this.tail = null;
        } else {
            this.head = this.head.prev;
        }

        return result;
    }

    peek() {
        if(this.isEmpty())
            return null;

        return this.head.val;
    }

    print() {
        if(this.isEmpty())
            return console.log('-');
        
        let current = this.head;
        let result = '';

        while(current) {
            result = result.concat(`${current.val}, `);
            current = current.prev;
        }
    }
}