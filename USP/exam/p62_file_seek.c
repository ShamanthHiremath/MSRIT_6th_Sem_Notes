// Write a C program
// i. To read the first 20 characters from a file
// ii. seek to 10th byte from the beginning and display 20 characters from there
// iii. seek 10 bytes ahead from the current file offset and display 20 characters
// iv. Display the file size


// gcc -o file_seek file_seek.c
// file_seek.c

#include <stdio.h>    // Standard I/O functions
#include <unistd.h>   // System calls like read(), write(), lseek()
#include <fcntl.h>    // File control options
#include <sys/types.h>// Data types like mode_t

int main() {
    int file = 0, n; // File descriptor and size variable
    char buffer[25]; // Buffer to store read characters
    
    // Open "test.txt" in read-only mode
    file = open("test.txt", O_RDONLY);

    // (i) Read the first 20 characters from the file
    read(file, buffer, 20);
    write(STDOUT_FILENO, buffer, 20); // Output the read characters
    printf("\n");

    // (ii) Seek to the 10th byte from the beginning and read 20 characters
    lseek(file, 10, SEEK_SET);
    read(file, buffer, 20);
    write(STDOUT_FILENO, buffer, 20);
    printf("\n");

    // (iii) Seek 10 bytes ahead from the current file offset and read 20 characters
    lseek(file, 10, SEEK_CUR);
    read(file, buffer, 20);
    write(STDOUT_FILENO, buffer, 20);
    printf("\n");

    // (iv) Get the file size by seeking to the end
    n = lseek(file, 0, SEEK_END);
    printf("size of file is %d bytes\n", n);

    // Close the file descriptor
    close(file);

    return 0;
}