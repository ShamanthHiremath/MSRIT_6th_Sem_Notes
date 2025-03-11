#include <stdio.h>
#include "apue.h"
#include <dirent.h>
#include <stdlib.h>  // For exit()

int main(int argc, char *argv[]){
    DIR *dp;
    struct dirent *dirp;

    if (argc != 2){
       printf("usage: ls week1");
   }
   if ((dp = opendir(argv[1])) == NULL){
       printf("can't open %s", argv[1]);
   }
   

    while ((dirp = readdir(dp)) != NULL){
        printf("%s\n", dirp->d_name);
    }
    closedir(dp);
    exit(0);
}