import requests

SERVER_URL = 'http://localhost:5000'  # Point to the correct server URL

def add_block_to_server(data):
    response = requests.post(f'{SERVER_URL}/add_block', json={'data': data})
    if response.status_code == 201:
        print(f"Block added: {response.json()}")
    else:
        print(f"Failed to add block: {response.json()}")

def view_blockchain():
    response = requests.get(f'{SERVER_URL}/get_chain')
    if response.status_code == 200:
        print(f"Blockchain: {response.json()}")
    else:
        print(f"Failed to fetch blockchain: {response.json()}")

def validate_chain():
    response = requests.get(f'{SERVER_URL}/validate_chain')
    print(response.json())

if __name__ == '__main__':
    while True:
        print("1. Add Block")
        print("2. View Blockchain")
        print("3. Validate Blockchain")
        print("4. Exit")
        choice = input("Enter choice: ")
        if choice == '1':
            data = input("Enter data for the new block: ")
            add_block_to_server(data)
        elif choice == '2':
            view_blockchain()
        elif choice == '3':
            validate_chain()
        elif choice == '4':
            break
        else:
            print("Invalid choice")
