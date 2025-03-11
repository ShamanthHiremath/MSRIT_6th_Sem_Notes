#include <stdio.h>
#include <fcntl.h>
#include <unistd.h>
#include <sys/stat.h>

#define READ_SIZE 20

int main(int argc, char *argv[]) {
    if (argc != 2) {
        fprintf(stderr, "Usage: %s <filename>\n", argv[0]);
        return 1;
    }

    char *filename = argv[1];  // File to be opened from command line argument
    int fd = open(filename, O_RDONLY);  // Open file in read-only mode

    // Error handling if the file cannot be opened
    if (fd == -1) {
        perror("Error opening file");
        return 1;
    }

    char buffer[READ_SIZE + 1] = {0};

    // a) Read the first 20 characters
    printf("a) First 20 characters:\n");
    read(fd, buffer, READ_SIZE);
    printf("%s\n", buffer);

    // b) Seek to the 10th byte from the beginning and read 20 characters
    printf("\nb) 20 characters from 10th byte:\n");
    lseek(fd, 10, SEEK_SET);
    read(fd, buffer, READ_SIZE);
    printf("%s\n", buffer);

    // c) Seek 10 bytes ahead from the current position and read 20 characters
    printf("\nc) 20 characters after skipping 10 bytes from current position:\n");
    lseek(fd, 10, SEEK_CUR);
    read(fd, buffer, READ_SIZE);
    printf("%s\n", buffer);

    // d) Get and display the file size
    struct stat file_stat;
    if (stat(filename, &file_stat) == -1) {
        perror("Error getting file size");
        close(fd);
        return 1;
    }
    printf("\nd) File size: %ld bytes\n", file_stat.st_size);

    // Close the file descriptor
    close(fd);
    return 0;
}

// ./a.out file1.txt
// a) First 20 characters:
// jhdwidvhjdcajsD AHGV

// b) 20 characters from 10th byte:
// cajsD AHGVFV CIQ BGH

// c) 20 characters after skipping 10 bytes from current position:
// EHW GRVIUYBGRQEOIUW 

// d) File size: 61 bytes