// Write a C program to remove empty files from the given directory.

// gcc -o remove_empty_files remove_empty_files.c
// ./remove_empty_files

#include <stdio.h>    // Standard I/O functions
#include <fcntl.h>    // File control options
#include <unistd.h>   // System calls like open(), unlink()
#include <dirent.h>   // Directory handling functions

int main() {
    DIR *dp; // Pointer to directory stream
    struct dirent *dir; // Structure to hold directory entry information
    
    // Open the current directory (".") for reading
    dp = opendir("."); 
    if (dp == NULL) {
        perror("Error opening directory");
        return 1;
    }

    // Iterate over each entry in the directory
    while ((dir = readdir(dp)) != NULL) {
        // Open the file with read/write access
        int fd = open(dir->d_name, O_RDWR, 0777);
        if (fd < 0) { // Handle error in opening file
            continue;
        }

        // Move file pointer to the end and get the file size
        int n = lseek(fd, 0, SEEK_END);
        close(fd); // Close file after checking

        // If file is empty (size = 0), delete it
        if (!n) {
            unlink(dir->d_name);
            printf("Deleted empty file: %s\n", dir->d_name);
        }
    }

    closedir(dp); // Close the directory stream
    return 0;
}