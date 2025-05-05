// Demonstrate the working of wait and waitpid system calls with a program

// gcc -o wait_demo wait_demo.c
// ./wait_demo

#include <stdio.h>    // Standard I/O functions
#include <stdlib.h>   // Exit function
#include <unistd.h>   // System calls like fork(), sleep()
#include <sys/wait.h> // Wait functions for process synchronization
#include <sys/types.h>// Data types like pid_t

int main() {
    int st; // Variable to store child exit status
    pid_t pid1 = fork(); // Create first child process
    pid_t pid2 = fork(); // Create second child process

    if (pid1 == 0) {  // First child process
        printf("First child process PID: %d\n", getpid());
        sleep(2);  // Simulating some work
        exit(0);   // Child exits
    }
    
    if (pid2 == 0) {  // Second child process
        printf("Second child process PID: %d\n", getpid());
        sleep(4);  // Simulating longer work
        exit(0);   // Child exits
    }

    // Parent process waits for **any** child process to terminate
    wait(&st);
    printf("First wait completed\n");

    sleep(1); // Simulate delay in parent before using waitpid

    // Parent waits specifically for second child to terminate
    waitpid(pid2, &st, 0);
    printf("Second wait completed\n");

    return 0;
}
