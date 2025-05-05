// Write a C program to demonstrate the usage of umask and chmod functions.

// gcc -o modify_permissions modify_permissions.c
// ./modify_permissions
// verify perms
// ls -l foo bar

#include <stdio.h>    // Standard I/O functions
#include <stdlib.h>   // Standard library functions (exit, etc.)
#include <sys/stat.h> // File permission functions

int main() {
    struct stat statbuf; // Structure to store file information

    // Get file permissions for "foo"
    stat("foo", &statbuf);

    // Remove execute permissions for the group (G) on "foo"
    chmod("foo", statbuf.st_mode & ~S_IXGRP);

    /* 
       Set absolute mode for "bar" to "rw-r--r--"
       - Owner: Read & Write (S_IRUSR | S_IWUSR)
       - Group: Read (S_IRGRP)
       - Others: Read (S_IROTH)
    */
    chmod("bar", S_IRUSR | S_IWUSR | S_IRGRP | S_IROTH);

    return 0;
}