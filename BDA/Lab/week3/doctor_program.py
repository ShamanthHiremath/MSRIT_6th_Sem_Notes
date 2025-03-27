from blockchain_module import Blockchain, authenticate_user

blockchain = Blockchain()
doctor_wallet = 0  # Doctor's e-cash balance

def doctor_menu():
    global doctor_wallet
    print("\nDoctor Menu:")
    print("1. Suggest Blood Test")
    print("2. Write Prescription")
    print("3. Check Wallet Balance")
    option = input("Choose an option: ")

    if option == '1':
        patient_id = input("Enter Patient ID: ")
        blockchain.create_block(data={"action": "suggest_blood_test", "patient_id": patient_id}, previous_hash=blockchain.chain[-1]['hash'])
        print("Blood test suggested. Diagnostic Center notified.")
    elif option == '2':
        patient_id = input("Enter Patient ID: ")
        prescription = input("Enter Prescription: ")
        blockchain.create_block(data={"action": "write_prescription", "patient_id": patient_id, "prescription": prescription}, previous_hash=blockchain.chain[-1]['hash'])
        print("Prescription added to blockchain.")
    elif option == '3':
        print(f"Your Wallet Balance: {doctor_wallet} e-cash")
    else:
        print("Invalid option.")

def update_wallet():
    global doctor_wallet
    for block in blockchain.chain:
        if isinstance(block['data'], dict):  # Ensure 'data' is a dictionary
            if block['data'].get('action') == "blood_test_completed" and block['data'].get('rewarded') is False:
                doctor_wallet += 10
                block['data']['rewarded'] = True  # Mark reward as distributed
    blockchain.save_to_file()

if __name__ == "__main__":
    username = input("Enter username: ")
    password = input("Enter password: ")

    if authenticate_user(username, password):
        while True:
            update_wallet()  # Refresh wallet balance
            doctor_menu()
    else:
        print("Authentication failed!")
