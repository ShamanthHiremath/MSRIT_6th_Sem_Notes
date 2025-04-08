// 2.	Write a C program to illustrate the effect of setjmp and longjmp functions on register and volatile variables.

#include <stdio.h>
#include <stdlib.h>

int main()
{

    printf("test\n");
    const char *s = getenv("PATH");
    const char *p = getenv("PWD");
    const char *l = getenv("LOGNAME");
    printf("PATH :%s\n", (s != NULL) ? s : "getenv returned NULL");
    printf("PWD :%s\n", (p != NULL) ? p : "getenv returned NULL");
    printf("LOGNAME :%s\n", (l != NULL) ? l : "getenv returned NULL");

    printf("end test\n");

    return 0;
}
