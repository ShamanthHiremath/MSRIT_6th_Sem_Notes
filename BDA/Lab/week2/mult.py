import requests
from blocks import Blockchain
from server import *  # Make sure server.py is properly importing blockchain

class BlockchainServer:
    def __init__(self, port):
        self.blockchain = Blockchain()
        self.port = port
        self.peers = ['http://localhost:5000']  # Add peer server URLs here

    def sync_with_peers(self):
        for peer in self.peers:
            try:
                response = requests.get(f'{peer}/get_chain')
                if response.status_code == 200:
                    peer_chain = response.json()
                    if len(peer_chain) > len(self.blockchain.chain):
                        print(f"Syncing with peer at {peer}")
                        self.blockchain.chain = [Block(**block) for block in peer_chain]
            except requests.exceptions.RequestException:
                print(f"Failed to connect to peer: {peer}")

    def add_block_to_server(self, data):
        response = requests.post(f'http://localhost:{self.port}/add_block', json={'data': data})
        if response.status_code == 201:
            print(f"Block added: {response.json()}")
        else:
            print(f"Failed to add block: {response.json()}")
        self.sync_with_peers()

    def validate_transaction(self, transaction_data):
        if 'sender' not in transaction_data or 'receiver' not in transaction_data or 'amount' not in transaction_data:
            return False
        if transaction_data['amount'] <= 0:
            return False
        return True
