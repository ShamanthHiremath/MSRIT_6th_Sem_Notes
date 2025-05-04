#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <fcntl.h>
#include <sys/wait.h>
#include <errno.h>
static void charatatime(char *);

int main(void)
{
pid_t pid;
if ((pid = fork()) < 0) 
{
printf("fork error");
}

else 

if (pid == 0) 
{
charatatime("output from child\n");
}  
else 
{
    wait(NULL);
charatatime("output from parent\n");
}
exit(0);
}
static void charatatime(char *str)
{
char *ptr;
int c;
setbuf(stdout, NULL);
/* set unbuffered */
for (ptr = str; (c = *ptr++) != 0; )
putc(c, stdout);
}