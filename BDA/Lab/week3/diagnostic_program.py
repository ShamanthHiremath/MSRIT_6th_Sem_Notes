from blockchain_module import Blockchain, authenticate_user

blockchain = Blockchain()
diagnostic_wallet = 0  # Diagnostic center's e-cash balance

def diagnostic_menu():
    global diagnostic_wallet
    print("\nDiagnostic Center Menu:")
    print("1. View Patients for Blood Tests")
    print("2. Confirm Blood Test")
    print("3. Check Wallet Balance")
    option = input("Choose an option: ")

    if option == '1':
        print("Patients Suggested for Blood Tests:")
        blockchain = Blockchain()
        for block in blockchain.chain:
            if isinstance(block['data'], dict) and block['data'].get('action') == "suggest_blood_test":
                print(f"- Patient ID: {block['data']['patient_id']}")
    elif option == '2':
        blockchain = Blockchain()
        patient_id = input("Enter Patient ID: ")
        blockchain.create_block(data={"action": "blood_test_completed", "patient_id": patient_id, "rewarded": False}, previous_hash=blockchain.chain[-1]['hash'])
        diagnostic_wallet += 10  # Reward the diagnostic center
        print("Blood test confirmed. Doctor incentivized.")
    elif option == '3':
        print(f"Your Wallet Balance: {diagnostic_wallet} e-cash")
    else:
        print("Invalid option.")

if __name__ == "__main__":
    username = input("Enter username: ")
    password = input("Enter password: ")

    if authenticate_user(username, password):
        while True:
            diagnostic_menu()
    else:
        print("Authentication failed!")
