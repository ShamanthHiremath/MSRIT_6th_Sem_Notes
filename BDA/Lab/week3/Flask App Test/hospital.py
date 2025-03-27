from flask import Flask, request, jsonify
from blockchain import Blockchain
from database import users

app = Flask(__name__)
blockchain = Blockchain()


patients = []  # Store patient records
prescriptions = []  # Store prescriptions

@app.route('/add_patient', methods=['POST'])
def add_patient():
    data = request.json
    patient_record = {"doctor": data['doctor'], "patient": data['patient']}
    patients.append(patient_record)

    blockchain.add_transaction(data['doctor'], data['patient'], 0, "New patient registered")
    blockchain.create_block(proof=blockchain.proof_of_work(blockchain.last_block['index']), previous_hash=blockchain.hash(blockchain.last_block))

    return jsonify({'message': 'Patient record added'}), 201

@app.route('/patients', methods=['GET'])
def get_patients():
    return jsonify({"patients": patients}), 200

@app.route('/add_prescription', methods=['POST'])
def add_prescription():
    data = request.json
    prescription_record = {"doctor": data['doctor'], "patient": data['patient'], "details": data.get("details", "No details")}
    prescriptions.append(prescription_record)

    blockchain.add_transaction(data['doctor'], data['patient'], 0, "Prescription added")
    blockchain.create_block(proof=blockchain.proof_of_work(blockchain.last_block['index']), previous_hash=blockchain.hash(blockchain.last_block))
    
    return jsonify({'message': 'Prescription added, Doctor credited'}), 201

@app.route('/prescriptions', methods=['GET'])
def get_prescriptions():
    return jsonify({"prescriptions": prescriptions}), 200

if __name__ == '__main__':
    app.run(port=5002)
