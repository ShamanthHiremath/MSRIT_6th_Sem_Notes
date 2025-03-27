from flask import Flask, render_template, request, jsonify, redirect, url_for
import requests

app = Flask(__name__)

# Base URLs for the microservices
AUTH_SERVICE = "http://127.0.0.1:5001"
HOSPITAL_SERVICE = "http://127.0.0.1:5002"
DIAGNOSTIC_SERVICE = "http://127.0.0.1:5003"
PHARMACY_SERVICE = "http://127.0.0.1:5004"

# ----------- FRONTEND ROUTES -----------

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        data = {
            "username": request.form['username'],
            "password": request.form['password']
        }
        response = requests.post(f"{AUTH_SERVICE}/register", json=data)
        return redirect(url_for('home')) if response.status_code == 201 else response.json()
    return render_template('register.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        data = {
            "username": request.form['username'],
            "password": request.form['password']
        }
        response = requests.post(f"{AUTH_SERVICE}/login", json=data)
        return redirect(url_for('dashboard')) if response.status_code == 200 else response.json()
    return render_template('login.html')

@app.route('/dashboard')
def dashboard():
    return render_template('dashboard.html')

# ----------- API GATEWAY FOR BACKEND SERVICES -----------
@app.route('/add_patient', methods=['POST'])
def add_patient():
    try:
        patient_name = request.form.get('patient')  # Get form data
        if not patient_name:
            return jsonify({"error": "Patient name is required"}), 400

        data = {"doctor": "doctor1", "patient": patient_name}
        response = requests.post(f"{HOSPITAL_SERVICE}/add_patient", json=data)

        # ✅ Fix: Explicitly parse JSON before checking response
        response_json = response.json()  # Convert to JSON
        print("📌 Response from hospital service:", response_json)  # Debugging

        # if response.status_code == 200 and "message" in response_json:
        if response.status_code in [200, 201]:  # Accept both 200 and 201
            print("✅ Patient added successfully:", response_json)
            return redirect(url_for('dashboard'))
            # return redirect(url_for('dashboard'))  # Redirect to dashboard
        
        # ❌ If status is NOT 200, log as an actual error
        print("❌ Failed to add patient:", response_json)
        return jsonify({"error": "Failed to add patient"}), 500

    except Exception as e:
        print("🚨 Exception in add_patient:", str(e))  # Debugging
        return jsonify({"error": "Internal server error"}), 500
    
@app.route('/add_prescription', methods=['POST'])
def add_prescription():
    try:
        data = {
            "doctor": "doctor1",
            "patient": request.form['patient'],
            "prescription": request.form['prescription']
        }
        response = requests.post(f"{HOSPITAL_SERVICE}/add_prescription", json=data)
        response_json = response.json()

        if response.status_code == 201:
            return redirect(url_for('dashboard'))

        return jsonify({"error": "Failed to add prescription"}), 500

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/add_test', methods=['POST'])
def add_test():
    try:
        data = {"diagnostic": "lab1", "patient": request.form['patient']}
        response = requests.post(f"{DIAGNOSTIC_SERVICE}/add_test", json=data)
        response_json = response.json()

        if response.status_code == 201:
            return redirect(url_for('dashboard'))

        return jsonify({"error": "Failed to add test record"}), 500

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/buy_medicine', methods=['POST'])
def buy_medicine():
    try:
        data = {"pharmacy": "pharma1", "patient": request.form['patient']}
        response = requests.post(f"{PHARMACY_SERVICE}/buy_medicine", json=data)
        response_json = response.json()

        if response.status_code == 201:
            return redirect(url_for('dashboard'))

        return jsonify({"error": "Failed to buy medicine"}), 500

    except Exception as e:
        return jsonify({"error": str(e)}), 500

# ----------- VIEW RECORDS -----------

@app.route('/patients', methods=['GET'])
def view_patients():
    response = requests.get(f"{HOSPITAL_SERVICE}/patients")
    return jsonify(response.json()) if response.status_code == 200 else jsonify({"error": "Failed to fetch patients"}), 500

@app.route('/tests', methods=['GET'])
def view_tests():
    response = requests.get(f"{DIAGNOSTIC_SERVICE}/tests")
    return jsonify(response.json()) if response.status_code == 200 else jsonify({"error": "Failed to fetch tests"}), 500

@app.route('/medicines', methods=['GET'])
def view_medicines():
    response = requests.get(f"{PHARMACY_SERVICE}/medicines")
    return jsonify(response.json()) if response.status_code == 200 else jsonify({"error": "Failed to fetch medicines"}), 500



@app.route('/prescriptions', methods=['GET'])
def view_prescriptions():
    response = requests.get(f"{HOSPITAL_SERVICE}/prescriptions")
    return jsonify(response.json()) if response.status_code == 200 else jsonify({"error": "Failed to fetch prescriptions"}), 500


if __name__ == '__main__':
    app.run(port=5000, debug=True)
