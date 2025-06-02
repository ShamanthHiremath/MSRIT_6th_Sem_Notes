// Write a program to demonstrate the zombie state of a process and provide the solution for the same. 

// gcc -o zombie_demo zombie_demo.c
// ./zombie_demo

// In a different terminal, Observe the Zombie Process 
// ps aux | grep zombie_demo

#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <sys/wait.h>

int main(void) {
    pid_t pid = fork();

    if (pid == 0) { // First child process
        pid_t pid1 = fork();

        if (pid1 == 0) { // Second child process
            sleep(5);
            printf("Child pid is: %d\n", getpid());
            printf("Second child, parent pid = %ld\n", (long)getppid());
            exit(0);
        } else { 
            printf("Child pid: %d\n", getpid());
            wait(NULL); // Wait for the second child to prevent zombie state
            exit(0);
        }
    }

    wait(NULL); // Parent waits for the first child
    printf("All children terminated, no zombies.\n");

    return 0;
}