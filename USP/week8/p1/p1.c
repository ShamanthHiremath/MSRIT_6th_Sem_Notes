#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>

int main(int argc, char *argv[]) {
    if (argc != 2) {
        printf("Usage: %s <filename>\n", argv[0]);
        exit(EXIT_FAILURE);
    }

    char *filename = argv[1];

    if (access(filename, F_OK) == 0) {
        printf("File '%s' exists and can be accessed.\n", filename);
    } else {
        printf("File '%s' does not exist or cannot be accessed.\n", filename);
    }

    return 0;
}
