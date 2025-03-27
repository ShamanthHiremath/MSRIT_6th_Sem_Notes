"""
Write a c/c++/python/java program to create chain of blocks as shown in figure using linked list. 
"""
import hashlib
import time

class Block:
    def __init__(self, index, previous_hash, transactions):
        self.index = index
        self.timestamp = time.time()
        self.previous_hash = previous_hash
        self.transactions = transactions
        self.nonce = 0
        self.hash = self.calculate_hash()

    def calculate_hash(self):
        data = f"{self.index}{self.timestamp}{self.previous_hash}{self.transactions}{self.nonce}"
        return hashlib.sha256(data.encode()).hexdigest()

    def mine_block(self, difficulty):
        while self.hash[:difficulty] != "0" * difficulty:
            self.nonce += 1
            self.hash = self.calculate_hash()

class Blockchain:
    def __init__(self, difficulty=4):
        self.chain = [self.create_genesis_block()]
        self.difficulty = difficulty

    def create_genesis_block(self):
        return Block(0, "0", "Genesis Block")

    def get_latest_block(self):
        return self.chain[-1]

    def add_block(self, transactions):
        latest_block = self.get_latest_block()
        new_block = Block(len(self.chain), latest_block.hash, transactions)
        new_block.mine_block(self.difficulty)
        self.chain.append(new_block)

    def display_chain(self):
        for block in self.chain:
            print(f"Block {block.index}:")
            print(f"  Timestamp: {block.timestamp}")
            print(f"  Previous Hash: {block.previous_hash}")
            print(f"  Hash: {block.hash}")
            print(f"  Transactions: {block.transactions}")
            print(f"  Nonce: {block.nonce}")
            print("-" * 40)

# Example Usage
blockchain = Blockchain()
blockchain.add_block("Transaction 1: Alice pays Bob 10 BTC")
blockchain.add_block("Transaction 2: Bob pays Charlie 5 BTC")
blockchain.add_block("Transaction 3: Charlie pays Dave 2 BTC")

blockchain.display_chain()