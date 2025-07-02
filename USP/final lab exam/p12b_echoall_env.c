// b) Write a C program to perform the following operations
// i) To create a child process
// ii) The Child should execute a process that prints the user defined values of environment variables
// iii) The Parent should execute a process that prints default values for the environment variables.

//  gcc p12_2_echoall_env.c -o echo_env
// ./echo_env


#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>

int main() {
    pid_t pid = fork();

    if (pid == 0) {

        char *envp[] = {"USER=custom_user", "HOME=/custom/home", "PATH=/custom/bin", NULL };

        char *args[] = {"/usr/bin/env", NULL};
        execle("/usr/bin/env", "env", NULL, envp);
    }
    else {
        wait(NULL);
        // executes only the default environment variables
        execl("/usr/bin/env", "env", NULL);
    }

    return 0;
}