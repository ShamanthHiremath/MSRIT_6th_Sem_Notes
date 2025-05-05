// Write a C program to demonstrate the usage of umask and chmod functions.

// gcc -o file_permissions file_permissions.c
// ./file_permissions
// ls -l foo bar

#include <stdio.h>    // Standard I/O functions
#include <stdlib.h>   // Standard library functions (exit, memory management, etc.)
#include <unistd.h>   // System calls like creat(), umask()
#include <sys/stat.h> // File permissions
#include <fcntl.h>    // File control definitions

// Define permissions: Read & Write for User, Group, and Others
#define RWRWRW (S_IRUSR | S_IWUSR | S_IRGRP | S_IWGRP | S_IROTH | S_IWOTH)

int main() {
    // Set umask to 0, ensuring all specified permissions are applied
    umask(0);

    // Create file "foo" with full read/write permissions for all users
    creat("foo", RWRWRW);

    // Change umask to restrict group and others from write permissions
    umask(S_IRGRP | S_IWGRP | S_IROTH | S_IWOTH);

    // Create file "bar" with the same permissions as "foo", but affected by new umask
    creat("bar", RWRWRW); // ERROR FIX: Missing semicolon added at end of line

    return 0;
}