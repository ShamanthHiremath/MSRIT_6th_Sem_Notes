// Write a program to differentiate between dup and dup2 functions

// gcc -o dup_example dup_example.c
// ./dup_example

#include <stdio.h>    // Standard I/O functions
#include <unistd.h>   // System calls like dup(), dup2()
#include <fcntl.h>    // File control options
#include <string.h>   // String operations

int main() {
    // Demonstrating dup()
    int fd1 = open("dup_test.txt", O_WRONLY | O_CREAT | O_TRUNC, 0644);
    int fd2 = dup(fd1); // Duplicates fd1, assigns a new lowest available descriptor

    printf("dup(): Original fd: %d, New fd: %d\n", fd1, fd2);

    // Writing to both original and duplicated file descriptors
    write(fd1, "Line from fd1\n", 14);
    write(fd2, "Line from fd2\n", 14);

    // Closing both file descriptors
    close(fd1);
    close(fd2);
    
    // Demonstrating dup2()
    int fd3 = open("dup2_test.txt", O_WRONLY | O_CREAT | O_TRUNC, 0644);
    int fd4 = 10;  // Specified file descriptor
    dup2(fd3, fd4); // Duplicates fd3 to fd4; if fd4 is open, it is closed first

    printf("dup2(): Original fd: %d, Specified fd: %d\n", fd3, fd4);

    // Writing to both original and specified duplicated file descriptors
    write(fd3, "Line from fd3\n", 14);
    write(fd4, "Line from fd4\n", 14);

    // Closing both file descriptors
    close(fd3);
    close(fd4);
    
    return 0;
}