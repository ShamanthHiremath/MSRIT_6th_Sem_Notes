// b) Write a C program to
// i. To create a child process.
// ii. The child should execute an interpreter file by passing a few arguments 
// iii. Create an interpreter file that has the path of echoall.c file and pass one argument
// iv. Create echoall.c file which prints the arguments received from both child process and interpreter file.

// # Compile the C programs
// gcc main.c -o main
// gcc echoall.c -o echoall

// # Make the shell script executable
// chmod +x interpreter.sh

// # Run the main program
// ./main


// main.c
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>

int main() {
    pid_t pid = fork();

    if (pid == 0) {
        char *args[] = {"./interpreter.sh", "child_arg", NULL};
        execv("./interpreter.sh", args);
    } else {
        wait(NULL);
    }

    return 0;
}

// // interpreter.sh
// #!/bin/bash
// ./echoall interpreter_arg "$1"


// use this cmd to make it executable
// chmod +x interpreter.sh


// echoall.c

// #include <stdio.h>

// int main(int argc, char *argv[]) {
//     printf("Arguments received:\n");
//     for (int i = 0; i < argc; i++) {
//         printf("argv[%d]: %s\n", i, argv[i]);
//     }
//     return 0;
// }