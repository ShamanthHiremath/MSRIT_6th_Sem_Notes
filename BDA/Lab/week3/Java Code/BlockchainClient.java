import java.io.*;
import java.net.*;

public class BlockchainClient {
    private static final String SERVER_IP = "localhost"; 
    private static final int PORT = 12345; 

    public static void main(String[] args) {
        try {
            Socket socket = new Socket(SERVER_IP, PORT);
            BufferedReader in = new BufferedReader(new InputStreamReader(socket.getInputStream()));
            PrintWriter out = new PrintWriter(socket.getOutputStream(), true);
            BufferedReader userInput = new BufferedReader(new InputStreamReader(System.in));

            String serverResponse;
            while ((serverResponse = in.readLine()) != null) {
                System.out.println(serverResponse);
                if (serverResponse.contains("Enter username:") || serverResponse.contains("Enter password:")
                        || serverResponse.contains("Enter the number of bitcoins to buy (or 'exit' to quit):")) {
                    String userInputStr = userInput.readLine();
                    out.println(userInputStr);
                    if (userInputStr.equalsIgnoreCase("exit")) {
                        break;
                    }
                }
            }

            socket.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}