import hashlib
import time
from datetime import datetime

class Block:
    def __init__(self, index, previous_hash, timestamp, data, hash):
        self.index = index
        self.previous_hash = previous_hash
        self.timestamp = timestamp
        self.data = data
        self.hash = hash

    def __repr__(self):
        return f"Block(Index: {self.index}, Data: {self.data}, Hash: {self.hash}, Prev Hash: {self.previous_hash})"


class Blockchain:
    def __init__(self):
        self.chain = []
        self.create_genesis_block()

    def create_genesis_block(self):
        genesis_block = Block(0, "0", datetime.now().strftime("%Y-%m-%d %H:%M:%S"), "Genesis Block", self.calculate_hash(0, "0", "Genesis Block"))
        self.chain.append(genesis_block)

    def add_block(self, data):
        last_block = self.chain[-1]
        new_index = last_block.index + 1
        timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        new_hash = self.calculate_hash(new_index, last_block.hash, data)
        new_block = Block(new_index, last_block.hash, timestamp, data, new_hash)
        self.chain.append(new_block)

    def calculate_hash(self, index, previous_hash, data):
        block_string = f"{index}{previous_hash}{data}{time.time()}"
        return hashlib.sha256(block_string.encode('utf-8')).hexdigest()

    def validate_chain(self):
        for i in range(1, len(self.chain)):
            current_block = self.chain[i]
            previous_block = self.chain[i - 1]

            # Debugging: print the current and previous block hashes
            print(f"Checking block {current_block.index} against previous block {previous_block.index}")
            print(f"Current Hash: {current_block.hash}")
            print(f"Expected Hash: {self.calculate_hash(current_block.index, previous_block.hash, current_block.data)}")

            if current_block.hash != self.calculate_hash(current_block.index, previous_block.hash, current_block.data):
                print(f"Invalid block at index {current_block.index}")
                return False

            if current_block.previous_hash != previous_block.hash:
                print(f"Invalid previous hash at index {current_block.index}")
                return False

        print("Blockchain is valid.")
        return True


    def get_latest_block(self):
        return self.chain[-1]
