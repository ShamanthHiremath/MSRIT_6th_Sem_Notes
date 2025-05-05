// Write a C program to display various details of a file using stat structure (At least 5 fields).

// gcc -o file_details file_details.c
// ./file_details test.txt

#include <unistd.h>   // For system calls
#include <stdio.h>    // For standard I/O functions
#include <sys/stat.h> // For stat structure
#include <sys/types.h> // For data types like mode_t
#include <time.h>     // For formatting timestamps

int main(int argc, char *argv[]) {
    // Ensure correct number of arguments
    if (argc != 2) {
        printf("Usage: %s <filename>\n", argv[0]);
        return 1;
    }

    struct stat fileStat; // Structure to hold file details

    // Get file statistics using stat()
    if (stat(argv[1], &fileStat) == -1) {
        perror("stat");
        return 1;
    }

    // Display file details
    printf("File Name: %s\n", argv[1]);                 // Filename
    printf("File Size: %ld bytes\n", fileStat.st_size); // Size in bytes
    printf("Number of Hard Links: %lu\n", fileStat.st_nlink); // Hard link count
    printf("File Inode: %lu\n", fileStat.st_ino);       // Unique inode number
    printf("File Permissions: %o\n", fileStat.st_mode); // File mode (permissions)
    printf("Last Access Time: %s", ctime(&fileStat.st_atime)); // Last accessed time
    printf("Last Modification Time: %s", ctime(&fileStat.st_mtime)); // Last modified time

    return 0;
}