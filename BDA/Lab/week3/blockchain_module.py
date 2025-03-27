import hashlib
import json
import os

class Blockchain:
    def __init__(self):
        self.chain = self.load_from_file()

    def create_block(self, data, previous_hash):
        block = {
            'index': len(self.chain) + 1,
            'data': data,
            'previous_hash': previous_hash,
            'hash': self.hash_block(data, previous_hash)
        }
        self.chain.append(block)
        self.save_to_file()
        return block

    def hash_block(self, data, previous_hash):
        content = str(data) + str(previous_hash)
        return hashlib.sha256(content.encode()).hexdigest()

    def save_to_file(self, filename="blockchain.json"):
        with open(filename, "w") as file:
            json.dump(self.chain, file, indent=4)

    def load_from_file(self, filename="blockchain.json"):
        if os.path.exists(filename):
            try:
                with open(filename, "r") as file:
                    return json.load(file)  # Load and return the saved chain
            except Exception as e:
                print(f"Error loading blockchain from file: {e}")
                return []  # Return an empty chain if there's an error
        else:
            # If file does not exist, initialize with the genesis block
            genesis_block = {
                'index': 1,
                'data': "Genesis Block",
                'previous_hash': '0',
                'hash': hashlib.sha256("Genesis Block0".encode()).hexdigest()
            }
            return [genesis_block]

# Authentication system
users = {"admin": "admin123"}  # Shared credentials for all programs

def authenticate_user(username, password):
    return username in users and users[username] == password
