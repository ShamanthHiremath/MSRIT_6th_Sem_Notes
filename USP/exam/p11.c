// Write a C program to display the file content in reverse order using lseek system call.

#include <stdlib.h>
#include <fcntl.h>
#include <unistd.h>

int main(int argc, char *argv[]){
    
    if (argc != 3)
        exit(-1);

    int source = open(argv[1], O_RDONLY);
    int dest = open(argv[2], O_WRONLY | O_CREAT | O_TRUNC, 0644);

    int filesize = lseek(source, (off_t)0, SEEK_END);

    char buf;

    for (int i = filesize - 1; i >= 0; i--){
        lseek(source, (off_t)i, SEEK_SET);
        read(source, &buf, 1);
        write(dest, &buf, 1);
    }

    write(STDOUT_FILENO, "DONE\n", 5);
    close(source);
    close(dest);

    return 0;
}
