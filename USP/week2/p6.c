#include <stdio.h>
#include <stdlib.h>
#include <fcntl.h>
#include <unistd.h>
#include <errno.h>

#define BUFFER_SIZE 1024  

int main(int argc, char *argv[]) {
    if (argc != 3) {
        fprintf(stderr, "Usage: %s <filename> <num_chars>\n", argv[0]);
        exit(EXIT_FAILURE);
    }

    const char *filename = argv[1];
    int n = atoi(argv[2]);

    if (n <= 0 || n > BUFFER_SIZE) {
        fprintf(stderr, "Error: num_chars must be between 1 and %d\n", BUFFER_SIZE);
        exit(EXIT_FAILURE);
    }

    int fd = open(filename, O_RDWR);
    if (fd == -1) {
        perror("Error opening file");
        exit(EXIT_FAILURE);
    }

    char buffer[BUFFER_SIZE];
    ssize_t bytesRead = read(fd, buffer, n);
    if (bytesRead == -1) {
        perror("Error reading file");
        close(fd);
        exit(EXIT_FAILURE);
    }

    buffer[bytesRead] = '\0';

    if (lseek(fd, 0, SEEK_END) == -1) {
        perror("Error seeking to end of file");
        close(fd);
        exit(EXIT_FAILURE);
    }

    int stdout_backup = dup(STDOUT_FILENO);
    if (stdout_backup == -1) {
        perror("Error saving original stdout");
        close(fd);
        exit(EXIT_FAILURE);
    }

    if (dup2(fd, STDOUT_FILENO) == -1) {
        perror("Error using dup2");
        close(fd);
        exit(EXIT_FAILURE);
    }

    printf("%s", buffer);
    fflush(stdout);

    dup2(stdout_backup, STDOUT_FILENO);
    close(stdout_backup);
    close(fd);

    printf("Successfully appended %ld characters to '%s'\n", bytesRead, filename);

    return EXIT_SUCCESS;
}

// TO RUN 
// ./a.out file1.txt 6
// Successfully appended 6 characters to 'file1.txt'

