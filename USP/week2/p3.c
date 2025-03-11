#include <stdio.h>

int main() {
    char buffer[100]; // Define a buffer to store the input

    printf("Enter some text: ");

    // Read a line of text from standard input
    fgets(buffer, sizeof(buffer), stdin);

    // Display the text entered by the user
    printf("You entered: %s", buffer);

    return 0;
}

// ./a.out 
// Enter some text: sblkjabsjadbs
// You entered: sblkjabsjadbs
