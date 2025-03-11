#include <stdio.h>
#include <stdlib.h>
#include <fcntl.h>
#include <unistd.h>
#include <errno.h>

int main() {

    const char *filename = "example.txt";

    mode_t mode = S_IRUSR | S_IWUSR | S_IRGRP | S_IROTH;

    int fd = creat(filename, mode);

    if (fd == -1) {
        perror("creat() error");
        exit(EXIT_FAILURE);
    }

    printf("File '%s' created successfully with file descriptor: %d\n", filename, fd);

    if (close(fd) == -1) {
        perror("close() error");
        exit(EXIT_FAILURE);
    }

    return EXIT_SUCCESS;
}