// Write a C program to demonstrate the usage of umask and chmod functions.

#include <stdio.h>
#include <stdlib.h>
#include <sys/stat.h>
int main(){

    struct stat statbuf;
    stat("foo", &statbuf);
    chmod("foo", statbuf.st_mode & ~S_IXGRP);
    /* set absolute mode to "rw-r--r--" */
    chmod("bar", S_IRUSR | S_IWUSR | S_IRGRP | S_IROTH);
    
    return 0;
}