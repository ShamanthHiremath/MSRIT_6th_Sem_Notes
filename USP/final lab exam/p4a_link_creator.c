// Write a C program to demonstrate the creation of soft links and  hard links.

// gcc -o link_creator link_creator.c
// create a hard link
// ./link_creator -h test.txt hard_link.txt
// ./link_creator -s test.txt soft_link.txt

#include <stdio.h>    // For standard I/O functions
#include <stdlib.h>   // For exit function
#include <unistd.h>   // For system calls like link() and symlink()
#include <sys/types.h> // For data types like mode_t
#include <sys/stat.h> // For file properties

int main(int argc, char *argv[]) {
    if (argc != 4) {
        printf("Usage:\n");
        printf("  %s -h <source> <hard_link>\n", argv[0]);
        printf("  %s -s <source> <soft_link>\n", argv[0]);
        return 1; // Exit with error
    }

    // Get link type (-h for hard link, -s for soft link)
    if (argv[1][0] == '-' && argv[1][1] == 'h') {
        printf("Creating Hard Link: %s → %s\n", argv[2], argv[3]);
        if (link(argv[2], argv[3]) == 0)
            printf("Hard link created successfully.\n");
        else
            perror("Error creating hard link");
    } 
    else if (argv[1][0] == '-' && argv[1][1] == 's') {
        printf("Creating Soft Link: %s → %s\n", argv[2], argv[3]);
        if (symlink(argv[2], argv[3]) == 0)
            printf("Soft link created successfully.\n");
        else
            perror("Error creating soft link");
    } 
    else {
        printf("Invalid option. Use -h for hard link or -s for soft link.\n");
        return 1;
    }

    return 0;
}