// Write a C program
// i. To read the first 20 characters from a file
// ii. seek to 10th byte from the beginning and display 20 characters from there
// iii. seek 10 bytes ahead from the current file offset and display 20 characters
// iv. Display the file size

#include <stdio.h>
#include <unistd.h>
#include <fcntl.h>
#include <sys/types.h>

int main(){
    int file = 0, n;
    char buffer[25];
    
    file = open("test.txt", O_RDONLY);
    read(file, buffer, 20);
    write(STDOUT_FILENO, buffer, 20);
    printf("\n");

    lseek(file, 10, SEEK_SET);
    read(file, buffer, 20);
    write(STDOUT_FILENO, buffer, 20);
    printf("\n");

    lseek(file, 10, SEEK_CUR);
    read(file, buffer, 20);
    write(STDOUT_FILENO, buffer, 20);
    printf("\n");

    n = lseek(file, 0, SEEK_END);
    printf("size of file is %d bytes\n", n);
    
    close(file);
    return 0;
}
