#include <stdio.h>
#include <fcntl.h>
#include <unistd.h>
#include <sys/stat.h>

#define FILE_PATH "testfile.txt"
#define READ_SIZE 20

int main() {
    int fd = open(FILE_PATH, O_RDONLY);
    if (fd == -1) { perror("Error opening file"); return 1; }

    char buffer[READ_SIZE + 1] = {0};
    
    // a) Read first 20 characters
    printf("a) First 20 characters:\n");
    read(fd, buffer, READ_SIZE);
    printf("%s\n", buffer);

    // b) Seek to 10th byte from beginning and read 20 characters
    printf("\nb) 20 characters from 10th byte:\n");
    lseek(fd, 10, SEEK_SET);
    read(fd, buffer, READ_SIZE);
    printf("%s\n", buffer);

    // c) Seek 10 bytes ahead and read 20 characters
    printf("\nc) 20 characters after skipping 10 bytes from current position:\n");
    lseek(fd, 10, SEEK_CUR);
    read(fd, buffer, READ_SIZE);
    printf("%s\n", buffer);

    // d) Get and display file size
    struct stat file_stat;
    stat(FILE_PATH, &file_stat);
    printf("\nd) File size: %ld bytes\n", file_stat.st_size);

    close(fd);
    return 0;
}