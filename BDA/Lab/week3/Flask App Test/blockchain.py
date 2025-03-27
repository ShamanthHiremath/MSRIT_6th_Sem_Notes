import hashlib
import json
from time import time

class Blockchain:
    def __init__(self):
        self.chain = []
        self.transactions = []
        self.create_block(previous_hash="0", proof=100)  # Genesis block

    def create_block(self, proof, previous_hash):
        block = {
            'index': len(self.chain) + 1,
            'timestamp': time(),
            'transactions': self.transactions,
            'proof': proof,
            'previous_hash': previous_hash,
        }
        self.transactions = []
        self.chain.append(block)
        return block

    def add_transaction(self, sender, recipient, amount, data):
        self.transactions.append({
            'sender': sender,
            'recipient': recipient,
            'amount': amount,
            'data': data
        })
        return self.last_block['index'] + 1

    def hash(self, block):
        encoded_block = json.dumps(block, sort_keys=True).encode()
        return hashlib.sha256(encoded_block).hexdigest()

    def proof_of_work(self, previous_proof):
        new_proof = 1
        while not (hashlib.sha256(str(new_proof**2 - previous_proof**2).encode()).hexdigest().startswith("0000")):
            new_proof += 1
        return new_proof

    @property
    def last_block(self):
        return self.chain[-1]
