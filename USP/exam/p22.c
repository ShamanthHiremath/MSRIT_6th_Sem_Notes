// Write a C program to demonstrate the creation of soft links and  hard links.

#include <stdio.h>
#include <fcntl.h>
#include <stdlib.h>
#include <unistd.h>
#include <sys/types.h>
#include <sys/stat.h>

int main(int argc, char *argv[]){
    if (argc == 3){
        printf("Hard linking %s and %s\n", argv[1], argv[2]);
        link(argv[1], argv[2]);
        printf("Hard link created successfully.\n");
    }
    else if (argc == 4){
        printf("Soft linking %s and %s\n", argv[1], argv[2]);
        symlink(argv[1], argv[2]);
        printf("Soft link created successfully.\n");
    }

    return 0;
}
