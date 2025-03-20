from flask import Flask, request, jsonify
# from blockchain import Blockchain

from blocks import Blockchain
from mult import *
from client import  *

app = Flask(__name__)
blockchain = Blockchain()

@app.route('/add_block', methods=['POST'])
def add_block():
    data = request.json.get('data')
    if not data:
        return jsonify({"message": "No data provided for the block"}), 400
    
    blockchain.add_block(data)
    return jsonify({"message": "Block added successfully", "blockchain": [block.__dict__ for block in blockchain.chain]}), 201

@app.route('/get_chain', methods=['GET'])
def get_chain():
    return jsonify([block.__dict__ for block in blockchain.chain]), 200

@app.route('/validate_chain', methods=['GET'])
def validate_chain():
    valid = blockchain.validate_chain()
    if valid:
        return jsonify({"message": "Blockchain is valid."}), 200
    else:
        return jsonify({"message": "Blockchain is invalid."}), 400

if __name__ == '__main__':
    app.run(debug=True, port=5001)
