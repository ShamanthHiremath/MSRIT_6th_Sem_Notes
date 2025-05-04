// Write a program to read n characters from a file and append them back to the same file using dup2 function.

#include <stdio.h>
#include <unistd.h>
#include <sys/types.h>
#include <sys/stat.h>
#include <fcntl.h>

int main(){
    char buf[50];
    int fd1 = open("test.txt", O_RDWR, 0));
    int fd2 = dup(fd1);

    printf("%d %d \n", fd1, fd2);

    read(fd1, buf, 10);
    lseek(fd2, 0L, SEEK_END);
    write(fd2, buf, 10);
    printf("%s\n", buf);

    return 0;
}