from flask import Flask, request, jsonify
from blockchain import Blockchain
from database import users

app = Flask(__name__)
blockchain = Blockchain()


medicines = []  # Store purchased medicines

@app.route('/buy_medicine', methods=['POST'])
def buy_medicine():
    data = request.json
    medicine_record = {"pharmacy": data['pharmacy'], "patient": data['patient']}
    medicines.append(medicine_record)

    blockchain.add_transaction(data['pharmacy'], data['patient'], 0, "Medicine purchased")
    blockchain.create_block(proof=blockchain.proof_of_work(blockchain.last_block['index']), previous_hash=blockchain.hash(blockchain.last_block))

    return jsonify({'message': 'Medicine purchased, Doctor credited'}), 201

@app.route('/medicines', methods=['GET'])
def get_medicines():
    return jsonify({"medicines": medicines}), 200

if __name__ == '__main__':
    app.run(port=5004)
