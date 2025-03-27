from flask import Flask, request, jsonify
from database import users

app = Flask(__name__)

@app.route('/register', methods=['POST'])
def register():
    data = request.json
    if data['username'] in users:
        return jsonify({'message': 'User already exists'}), 400
    users[data['username']] = {'password': data['password'], 'balance': 0}
    return jsonify({'message': 'User registered successfully'}), 201

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    user = users.get(data['username'])
    if user and user['password'] == data['password']:
        return jsonify({'message': 'Login successful'}), 200
    return jsonify({'message': 'Invalid credentials'}), 401

if __name__ == '__main__':
    app.run(port=5001)
