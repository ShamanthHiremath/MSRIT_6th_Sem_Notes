// C program to simulate copy command by accepting the filenames from the command line. 

#include <stdio.h>
#include <stdlib.h>
#include <fcntl.h>
#include <unistd.h>

int main(int argc, char *argv[]) {
    
    
    if (argc != 3)
    return 1;
    
    int src = open(argv[1], O_RDONLY);
    int dest = open(argv[2], O_WRONLY | O_CREAT | O_TRUNC, 0644);

    int size = lseek(src, 0, SEEK_END);
    lseek(src, 0, SEEK_SET); // Reset file pointer to the beginning
    
    char ch;
    int i=0;
    while (size--) {
        lseek(src, i, SEEK_SET); // Move file pointer to the current position
        read(src, &ch, 1);
        write(dest, &ch, 1);
        i++;

    }

    // OR
    char* buff[size];
    lseek(src, 0, SEEK_SET); // Reset file pointer to the beginning
    read(src, buff, size);
    write(dest, buff, size);

    return 0;
}