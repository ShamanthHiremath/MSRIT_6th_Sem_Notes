#include "apue.h"
#define bn 4096

int main(void) {
    int n;
    char buf[bn];
    while((n = read(STDIN_FILENO, buf, bn)) > 0)
        if(write(STDOUT_FILENO, buf, n) != n)
            printf("write error");
    if(n<0)
        printf("read error");
    exit(0);
}