// 5. C program to create a new process and demonstrate the working of vfork function

#include<stdio.h>
#include<string.h>
#include<stdlib.h>
#include<sys/types.h>
#include<unistd.h>
#include<sys/stat.h>

int glob = 6; /* external variable in initialized data */

char buf[]="a write to stdout\n";


int main(void) 
{
int var; /* automatic variable on the stack */ 
pid_t pid; 
var = 88;

if(write(STDOUT_FILENO,buf,sizeof(buf)-1)!=sizeof(buf)-1)
printf("write error");

printf("before fork\n"); /* we don't flush stdio */ 
if ((pid = fork()) < 0)
{
printf("fork error");
}
else
if (pid == 0)
{ 
/* child */ 
glob++; /* modify parent's variables */ 
var++;
}
else
{
sleep(2);
}
printf("pid = %d, glob = %d, var = %d\n", getpid(), glob, var); 
exit(0);
 } 
