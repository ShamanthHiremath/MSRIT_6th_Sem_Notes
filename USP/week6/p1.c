// 1.	Write a  C program to display environment variables using global variable environ.

#include <stdio.h>
#include <stdlib.h>

extern char **environ;

int main() 
{
    int i = 0;
    printf("Listing all environment variables:\n\n");
    
    while (environ[i] != NULL) 
    {
        printf("%s\n", environ[i]);
        i++;
    }
    
    printf("\nEnd of environment variables list.\n");
    
    return 0;
}

