import socket
import json

def register_with_bootstrap(host='localhost', port=5000, node_host='localhost', node_port=6000):
    try:
        client = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        client.connect((host, port))
        
        # Send a properly formatted JSON message for registration
        message = json.dumps({'type': 'register', 'host': node_host, 'port': node_port})
        client.send(message.encode())
        
        response = client.recv(1024).decode()
        print("Response from server:", response)
        
        client.close()
    except Exception as e:
        print("Error:", e)

if __name__ == "__main__":
    register_with_bootstrap()
