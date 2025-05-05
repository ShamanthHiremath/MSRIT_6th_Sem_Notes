// Write a program to read n characters from a file and append them back to the same file using dup2 function.

// gcc -o file_append file_append.c
// ./file_append

#include <stdio.h>    // Standard I/O functions
#include <unistd.h>   // System calls like read(), write(), lseek(), dup()
#include <sys/types.h>// Data types like mode_t
#include <sys/stat.h> // File status structure
#include <fcntl.h>    // File control options

int main() {
    char buf[50];  // Buffer to hold characters read from the file

    // Open "test.txt" with read and write permissions
    int fd1 = open("test.txt", O_RDWR); // ERROR: Extra closing parenthesis was removed here

    // Duplicate file descriptor fd1 into fd2
    int fd2 = dup(fd1);

    // Print the file descriptors for verification
    printf("%d %d \n", fd1, fd2);

    // Read 10 characters from fd1 into buffer
    read(fd1, buf, 10);

    // Move fd2 file offset to the end of the file to append
    lseek(fd2, 0L, SEEK_END);

    // Write the same 10 characters back to the file
    write(fd2, buf, 10);

    // Print the buffer to verify the copied content
    printf("%s\n", buf);

    return 0;
}