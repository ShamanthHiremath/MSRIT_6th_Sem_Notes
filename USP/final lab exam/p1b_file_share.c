// Write a C program to create a child process and show how parent and child processes will share the text file and justify that both parent and child share the same file offset.

// gcc -o file_share p12_file_share.c
// ./p12_file_share

// or
// gcc p12_file_share.c
// ./a.out
// .\a.exe

#include <stdio.h>    // Standard I/O functions
#include <stdlib.h>   // Exit function
#include <unistd.h>   // System calls like fork(), read(), write()
#include <fcntl.h>    // File control options
#include <sys/wait.h> // Wait function for process synchronization

int main() {
    // Open file "test.txt" with read/write permissions
    int fd = open("test.txt", O_RDWR);

    // Create a child process
    pid_t pid = fork();

    if (pid == 0) {  // Child process
        char buffer[10];

        // Read first 5 bytes from the file
        read(fd, buffer, 5);
        buffer[5] = '\0'; // Null-terminate the string
        printf("Child read: %s\n", buffer);
    } else {  // Parent process
        wait(NULL);  // Wait for child to complete its execution

        char buffer[10];

        // Read next 5 bytes from the file (after child's read)
        read(fd, buffer, 5);
        buffer[5] = '\0'; // Null-terminate the string
        printf("Parent read: %s\n", buffer);
    }

    // Close the file descriptor
    close(fd);

    return 0;
}