#include <stdio.h>
#include <fcntl.h>
#include <unistd.h>

int main() {
    int fd;

    fd = open("example.txt", O_CREAT | O_RDWR, 0644);

    if (fd == -1) {
        perror("Error opening file");
        return 1;
    }

    printf("File opened successfully with file descriptor: %d\n", fd);

    close(fd);

    return 0;
}