// Write a program to read n characters from a file and append them back to the same file using dup2 function.

// gcc -o file_append file_append.c
// ./file_append

#include <stdio.h>    // Standard I/O functions
#include <unistd.h>   // System calls like read(), write(), lseek(), dup()
#include <sys/stat.h> // File status structure
#include <fcntl.h>    // File control options

int main() {
    int fd = open("test.txt", O_RDWR | O_APPEND); 
    char buf[10];  
    read(fd, buf, 5);  		
    buf[5] = '\0'; 
     		
    lseek(fd, 0, SEEK_END); 
    dup2(fd, STDOUT_FILENO);
    printf("%s", buf);

    return 0;
}