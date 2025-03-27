import java.io.*;
import java.net.*;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.*;

public class BlockchainServer {
    private static final int PORT = 12345;
    private static final double BITCOIN_RATE = 5500000; // 55 lakhs

    private static class Block {
        private int index;
        private String timestamp;
        private String previousHash;
        private String data;
        private String hash;

        public Block(int index, String timestamp, String previousHash, String data, String hash) {
            this.index = index;
            this.timestamp = timestamp;
            this.previousHash = previousHash;
            this.data = data;
            this.hash = hash;
        }

        // Getters and setters
    }

    private static List<Block> blockchain = new ArrayList<>();
    private static Object blockchainLock = new Object();

    private static Map<String, String> credentials = new HashMap<>(); // Map to store username and password
    private static Map<String, Double> balances = new HashMap<>(); // Map to store balances
    private static Map<String, Integer> bitcoinsOwned = new HashMap<>(); // Map to store number of bitcoins owned

    static {
        // Initialize some example credentials, balances, and bitcoinsOwned
        credentials.put("user1", "password1");
        credentials.put("user2", "password2");

        balances.put("user1", 10000000.0);
        balances.put("user2", 20000000.0);

        bitcoinsOwned.put("user1", 0);
        bitcoinsOwned.put("user2", 0);
    }

    private static class ClientHandler extends Thread {
        private Socket clientSocket;
        private BufferedReader in;
        private PrintWriter out;
        private String username;
        private String password;
        private double accountBalance;
        private int numberOfBitcoins;

        public ClientHandler(Socket socket) {
            this.clientSocket = socket;
        }

        @Override
        public void run() {
            try {
                in = new BufferedReader(new InputStreamReader(clientSocket.getInputStream()));
                out = new PrintWriter(clientSocket.getOutputStream(), true);

                // Read username and password
                out.println("Enter username:");
                username = in.readLine();
                out.println("Enter password:");
                password = in.readLine();

                // Perform authentication
                if (authenticate(username, password)) {
                    out.println("Authentication successful.");
                    handleTransaction();
                } else {
                    out.println("Error: Authentication failed. Closing connection.");
                    clientSocket.close();
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        }

        private boolean authenticate(String username, String password) {
            // Check if username and password match in the credentials map
            return credentials.containsKey(username) && credentials.get(username).equals(password);
        }

        private void handleTransaction() throws IOException {
            accountBalance = balances.get(username);
            while (true) {
                out.println("Bitcoin rate: " + BITCOIN_RATE);
                out.println("Your balance: " + accountBalance);
                out.println("Enter the number of bitcoins to buy (or 'exit' to quit):");

                String input = in.readLine();
                if (input.equalsIgnoreCase("exit")) {
                    break;
                }

                try {
                    int bitcoinsToBuy = Integer.parseInt(input);
                    double amountToDeduct = bitcoinsToBuy * BITCOIN_RATE;
                    if (accountBalance >= amountToDeduct) {
                        accountBalance -= amountToDeduct;
                        numberOfBitcoins += bitcoinsToBuy;

                        // Update balances and bitcoinsOwned
                        balances.put(username, accountBalance);
                        bitcoinsOwned.put(username, numberOfBitcoins);

                        // Create a new block for this transaction
                        String currentTimestamp = new Date().toString();
                        String previousHash = blockchain.isEmpty() ? "0" : blockchain.get(blockchain.size() - 1).hash;
                        String data = "Transaction: User: " + username + ", Number of Bitcoins: " + bitcoinsToBuy;
                        String currentHash = computeHash(currentTimestamp, previousHash, data);

                        Block block = new Block(blockchain.size() + 1, currentTimestamp, previousHash, data, currentHash);
                        synchronized (blockchainLock) {
                            blockchain.add(block);
                        }

                        out.println("Transaction successful. You now own " + numberOfBitcoins + " bitcoins.");
                        out.println("Current hash: " + currentHash);

                        displayBlockchain();
                    } else {
                        out.println("Error: Insufficient balance.");
                    }
                } catch (NumberFormatException e) {
                    out.println("Error: Invalid input.");
                }
            }
            clientSocket.close();
        }

        private void displayBlockchain() {
            synchronized (blockchainLock) {
                for (Block block : blockchain) {
                    System.out.println("Block Index: " + block.index);
                    System.out.println("Timestamp: " + block.timestamp);
                    System.out.println("Previous Hash: " + block.previousHash);
                    System.out.println("Data: " + block.data);
                    System.out.println("Hash: " + block.hash);
                    System.out.println();
                }
            }
        }

        private String computeHash(String timestamp, String previousHash, String data) {
            String dataToHash = timestamp + previousHash + data;
            try {
                MessageDigest digest = MessageDigest.getInstance("SHA-256");
                byte[] hashBytes = digest.digest(dataToHash.getBytes());
                StringBuilder hexString = new StringBuilder();
                for (byte b : hashBytes) {
                    String hex = Integer.toHexString(0xff & b);
                    if (hex.length() == 1) {
                        hexString.append('0');
                    }
                    hexString.append(hex);
                }
                return hexString.toString();
            } catch (NoSuchAlgorithmException e) {
                e.printStackTrace();
                return null;
            }
        }
    }

    public static void main(String[] args) {
        try {
            ServerSocket serverSocket = new ServerSocket(PORT);
            System.out.println("Server started. Waiting for clients...");

            while (true) {
                Socket clientSocket = serverSocket.accept();
                System.out.println("Client connected: " + clientSocket.getInetAddress().getHostAddress());
                ClientHandler clientHandler = new ClientHandler(clientSocket);
                clientHandler.start();
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}