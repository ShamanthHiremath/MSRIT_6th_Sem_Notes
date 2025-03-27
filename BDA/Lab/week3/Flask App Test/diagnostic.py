from flask import Flask, request, jsonify
from blockchain import Blockchain
from database import users

app = Flask(__name__)
blockchain = Blockchain()

tests = []  # Store diagnostic test records

@app.route('/add_test', methods=['POST'])
def add_test():
    data = request.json
    test_record = {"diagnostic": data['diagnostic'], "patient": data['patient']}
    tests.append(test_record)

    blockchain.add_transaction(data['diagnostic'], data['patient'], 0, "Blood test result added")
    blockchain.create_block(proof=blockchain.proof_of_work(blockchain.last_block['index']), previous_hash=blockchain.hash(blockchain.last_block))
    
    return jsonify({'message': 'Blood test added, Diagnostic Center credited'}), 201

@app.route('/tests', methods=['GET'])
def get_tests():
    return jsonify({"tests": tests}), 200

if __name__ == '__main__':
    app.run(port=5003)
