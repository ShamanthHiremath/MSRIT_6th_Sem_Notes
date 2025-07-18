//     b) Write a program to perform the following operations
//     i)  To create a child process
// ii) The child process should execute a separate program (using exec function) that calculates the addition of two numbers by passing two integer values.
// iii) The parent process should wait for a child to complete

// main.c

// gcc main.c -o main
// gcc p2.c -o p23
// ./main 5 10


#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <sys/wait.h>
#include <errno.h>

int main(int argc, char *argv[]) {
    if (argc != 3) {
        printf("Usage: %s num1 num2\n", argv[0]);
        exit(0);
    }

    pid_t pid = fork();

    if (pid < 0) {
        printf("Fork failed. Error code\n");
        exit(0);
    } 
    else if (pid == 0) {
        printf("Child process... \n");
        execl("./p23", "p23", argv[1], argv[2], (char *)NULL);
        
        exit(0);
    } 
    else {
        printf("Parent process... \n");
        wait(NULL);
        printf("Child exited.....\n");
    }

    return 0;
}

// p2.c

#include <stdio.h>
#include <stdlib.h>

int main(int argc, char *argv[]) {
    if (argc != 3) {
        printf("Usage: %s num1 num2\n", argv[0]);
        exit(0);
    }

    int num1 = atoi(argv[1]);
    int num2 = atoi(argv[2]);
    int sum = num1 + num2;

    printf("Sum: %d\n", sum);

    return 0;
}