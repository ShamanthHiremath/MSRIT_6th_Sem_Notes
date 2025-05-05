// Write a C program to implement ls  –li command which lists the files in a specified directory. Your program should Print 5 attributes of files.

// gcc -o ls_li ls_li.c
// ./ls_li

#include <stdio.h>    // Standard I/O functions
#include <unistd.h>   // System calls like access()
#include <fcntl.h>    // File control options
#include <dirent.h>   // Directory handling functions
#include <time.h>     // Time functions for formatting timestamps
#include <sys/stat.h> // File status structure

int main(int argc, char *argv[]) {
    struct dirent *dir; // Structure to hold directory entry details
    struct stat mystat; // Structure to hold file attributes
    DIR *dp;

    // Open current directory
    dp = opendir(".");
    if (dp == NULL) {
        perror("Error opening directory");
        return 1;
    }

    // Print header for file details
    printf("--Inode--Mode--UID--GID--Access Time--Filename\n");

    // Read files in the directory
    while ((dir = readdir(dp)) != NULL) {
        // Get file attributes using stat()
        if (stat(dir->d_name, &mystat) == 0) {
            // Print file details
            printf("\n%ld %o %d %d %s %s\n", 
                   mystat.st_ino,     // Inode number
                   mystat.st_mode,    // File mode (permissions)
                   mystat.st_uid,     // User ID of owner
                   mystat.st_gid,     // Group ID of owner
                   ctime(&mystat.st_atime), // Last access time
                   dir->d_name        // Filename
            );
        } else {
            perror("Error retrieving file details");
        }
    }

    closedir(dp); // Close directory stream
    return 0;
}