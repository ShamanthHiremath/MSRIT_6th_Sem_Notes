// Write a C program to simulate system function.

// gcc p1.c
// ./a.out

// The output will show the execution of the command "ls -li" in the child process.

#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <sys/wait.h>

int my_sys(char *cm) {

    execl("/bin/sh", "sh", "-c", cm, (char *)NULL);
    return 0;
}

int main() {
    printf("executing ls-li\n");
    my_sys("ls -li");
    return 0;
}

