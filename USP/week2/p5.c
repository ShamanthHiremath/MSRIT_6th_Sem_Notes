
#include <stdio.h>
#include <stdlib.h>
#include <fcntl.h>
#include <unistd.h>
#include <errno.h>

int main(int argc, char *argv[]) {
    if (argc != 2) {
        fprintf(stderr, "Usage: %s <filename>\n", argv[0]);
        exit(EXIT_FAILURE);
    }

    // Open file in read-only mode
    int fd = open(argv[1], O_RDONLY);
    if (fd == -1) {
        perror("Error opening file");
        exit(EXIT_FAILURE);
    }

    // Determine file size using lseek()
    off_t file_size = lseek(fd, 0, SEEK_END);
    if (file_size == -1) {
        perror("Error determining file size");
        close(fd);
        exit(EXIT_FAILURE);
    }

    // Read and print characters in reverse order
    char ch;
    for (off_t i = file_size - 1; i >= 0; i--) {
        if (lseek(fd, i, SEEK_SET) == -1) {
            perror("Error seeking in file");
            close(fd);
            exit(EXIT_FAILURE);
        }

        if (read(fd, &ch, 1) != 1) {
            perror("Error reading file");
            close(fd);
            exit(EXIT_FAILURE);
        }

        putchar(ch);
    }

    // Close file descriptor
    close(fd);
    putchar('\n');  // Print newline after output
    return EXIT_SUCCESS;
}
