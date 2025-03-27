import socket
import threading

nodes = set()

def start_node(host='127.0.0.1', port=5000):
    server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    server.bind((host, port))
    server.listen()

    while True:
        client, address = server.accept()
        nodes.add(address)
        print(f"New node connected: {address}")

if __name__ == "__main__":
    threading.Thread(target=start_node).start()
