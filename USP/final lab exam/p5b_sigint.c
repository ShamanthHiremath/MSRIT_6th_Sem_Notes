// Write a C program using sigaction system call which calls a signal handler on SIGINT signal and then reset the default action of the SIGINT signal.

#include <stdio.h>
#include <unistd.h>
#include <signal.h>

void handler(int signum) {
    printf("SIGINT %d received. custom handler executed.\n", signum);
    struct sigaction sa = {0}; // // Reset SIGINT to default 
    sa.sa_handler = SIG_DFL;  // Set to default action
    sigaction(SIGINT, &sa, NULL);
}

int main() {
    struct sigaction sa = {0};
    sa.sa_handler = handler;

    sigaction(SIGINT, &sa, NULL);

    while (1) {
        printf("Running... Press Ctrl+C\n");
        sleep(1);
    }

    return 0;
}