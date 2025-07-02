// Write a program to differentiate between dup and dup2 functions

// 
// gcc p11_1_dup_dup2.c -o dup_demo
// ./dup_demo

#include <stdio.h>
#include <unistd.h>
#include <fcntl.h>
#include <string.h>

int main() {
    // dup() creates a copy of the file descriptor fd1, using the lowest numbered unused file descriptor
    int fd1 = open("example.txt", O_WRONLY);
    int fd2 = dup(fd1);
    // dup2() uses the user specified file descriptor fd3 = 10
    int fd3=dup2(fd1, 10);

    write(fd1, "Writing via fd1 \n", 16);
    write(fd2, "Writing via fd2 \n", 16);
    write(fd3, "Writing via fd3 (dup2)\n", 50);
    return 0;
}
