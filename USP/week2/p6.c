#include <stdio.h>
#include <stdlib.h>
#include <fcntl.h>
#include <unistd.h>
#include <errno.h>

#define BUFFER_SIZE 1024  // Max read size

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

    // Open file for reading and writing
    int fd = open(filename, O_RDWR);
    if (fd == -1) {
        perror("Error opening file");
        exit(EXIT_FAILURE);
    }

    // Read 'n' characters from file
    char buffer[BUFFER_SIZE];
    ssize_t bytesRead = read(fd, buffer, n);
    if (bytesRead == -1) {
        perror("Error reading file");
        close(fd);
        exit(EXIT_FAILURE);
    }

    buffer[bytesRead] = '\0'; // Null-terminate for safety

    // Move offset to end of file for appending
    if (lseek(fd, 0, SEEK_END) == -1) {
        perror("Error seeking to end of file");
        close(fd);
        exit(EXIT_FAILURE);
    }

    // Redirect STDOUT to the file using dup2()
    if (dup2(fd, STDOUT_FILENO) == -1) {
        perror("Error using dup2");
        close(fd);
        exit(EXIT_FAILURE);
    }

    // Print buffer (will append to file because STDOUT is redirected)
    printf("%s", buffer);
    fflush(stdout); // Ensure output is written

    // Restore STDOUT (optional, but good practice)
    int stdOutFd = dup(STDOUT_FILENO); // Backup stdout
    dup2(stdOutFd, STDOUT_FILENO);
    close(stdOutFd);

    // Close file descriptor
    close(fd);

    printf("\nSuccessfully appended %ld characters to '%s'\n", bytesRead, filename);
    return EXIT_SUCCESS;
}