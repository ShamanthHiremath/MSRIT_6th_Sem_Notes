// Write a program to demonstrate the zombie state of a process and provide the solution for the same. 

#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <fcntl.h>
#include <sys/wait.h>

int main(void){
    pid_t pid, pid1, pid2;
    pid = fork();
    
    if (pid == 0){
        pid1 = fork();

        if (pid1 == 0){
            sleep(5);
            printf("Child pid is: %d\n", getpid());
            printf("second child, parent pid = %ld\n", (long)getppid());
            exit(0);
        }
        else{
            printf("Child pid: %d\n", getpid());
            exit(0);
        }
    }

    pid2 = waitpid(pid, NULL, 0);
    printf("terminated child's pid: %d\n", pid2);
    exit(0);
}
