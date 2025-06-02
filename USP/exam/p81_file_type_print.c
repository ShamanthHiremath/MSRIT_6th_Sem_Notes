// Write a C program that takes the file name as an argument and prints the type of the given file.


// gcc p81_file_type_print.c -o filetype
// ./filetype myfile.txt
// ./filetype file1.txt file2.txt /etc/passwd


#include <stdio.h>   // Required for printf
#include <stdlib.h>  // Required for exit
#include <sys/types.h>  
#include <sys/stat.h>  
#include <unistd.h>

int main(int argc, char *argv[]){
    struct stat buf;
    char *ptr;
    for (int i = 1; i < argc; i++){

        printf("%s: ", argv[i]);
        lstat(argv[i], &buf);
        
        if (S_ISREG(buf.st_mode))
            ptr = "regular";
        else if (S_ISDIR(buf.st_mode))
            ptr = "directory";
        else if (S_ISCHR(buf.st_mode))
            ptr = "character special";
        else if (S_ISBLK(buf.st_mode))
            ptr = "block special";
        else if (S_ISFIFO(buf.st_mode))
            ptr = "fifo";
        else if (S_ISLNK(buf.st_mode))
            ptr = "symbolic link";
        else if (S_ISSOCK(buf.st_mode))
            ptr = "socket";
        else
            ptr = "** unknown mode **";
        printf("%s\n", ptr);
    }
    exit(0);
}