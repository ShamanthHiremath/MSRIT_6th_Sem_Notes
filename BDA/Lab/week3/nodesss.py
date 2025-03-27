import socket
import threading
import json

# Bootstrap Node to manage peer connections
class NodeServer:
    def __init__(self, host='localhost', port=5001):
        self.server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        self.server.bind((host, port))
        self.server.listen()
        self.peers = []  # List to store connected peers
        print(f"Bootstrap server running on {host}:{port}")

    def handle_client(self, conn, addr):
        print(f"New connection from {addr}")
        while True:
            try:
                data = conn.recv(1024).decode()
                if not data:
                    break
                message = json.loads(data)
                if message['type'] == 'register':
                    self.peers.append((message['host'], message['port']))
                    print(f"Registered peer: {message['host']}:{message['port']}")
                    conn.send(json.dumps({'status': 'registered', 'peers': self.peers}).encode())
            except Exception as e:
                print(f"Error: {e}")
                break
        conn.close()

    def start(self):
        while True:
            conn, addr = self.server.accept()
            threading.Thread(target=self.handle_client, args=(conn, addr)).start()

if __name__ == "__main__":
    node_server = NodeServer()
    node_server.start()