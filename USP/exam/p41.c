// Write a program to copy access and modification time of a file to another file using utime function.

#include <stdio.h>
#include <sys/stat.h>
#include <sys/types.h>
#include <unistd.h>
#include <utime.h>
#include <time.h>

int main(int argc, char *argv[]){
    struct stat statbuf_1;
    struct stat statbuf_2;
    struct utimbuf times;

    stat(argv[1], &statbuf_1);
    stat(argv[2], &statbuf_2);

    printf("Before Copying ...\n");
    printf("Access Time %s\nModification Time %s\n", ctime(&statbuf_1.st_atime), ctime(&statbuf_1.st_mtime));

    times.modtime = statbuf_2.st_mtime;
    times.actime = statbuf_2.st_atime;
    utime(argv[1], &times);

    stat(argv[1], &statbuf_1);

    printf("After Copying ...\n");
    printf("Access Time %s\nModification Time %s\n", ctime(&statbuf_1.st_atime), ctime(&statbuf_1.st_mtime));

    return 0;
}
