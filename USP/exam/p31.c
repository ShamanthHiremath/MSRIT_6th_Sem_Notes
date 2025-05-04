// Write a C program to remove empty files from the given directory.

#include <stdio.h>
#include <fcntl.h>
#include <unistd.h>
#include <dirent.h>

int main(){
    DIR *dp;
    struct dirent *dir;
    dp = opendir("."); 

    while ((dir = readdir(dp)) != NULL){
        int fd = open(dir->d_name, O_RDWR, 0777);
        int n = lseek(fd, 0, SEEK_END);
        if (!n){
            unlink(dir->d_name);
        }
    }
    
    return 0;
}