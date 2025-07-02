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

        printf("Child (PID: %d) exiting...\n", getpid());
    }
    else { 
        printf("Child pid: %d\n", getpid());
        sleep(30); // Allow the second child to run and become a zombie
        wait(NULL); // Wait for the second child to prevent zombie state
        print("No zombie processes.\n");
    }

    printf("All children terminated, no zombies.\n");

    return 0;
}