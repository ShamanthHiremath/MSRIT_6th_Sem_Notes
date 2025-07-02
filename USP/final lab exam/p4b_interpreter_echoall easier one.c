// b) Write a C program to
// i. To create a child process.
// ii. The child should execute an interpreter file by passing a few arguments 
// iii. Create an interpreter file that has the path of echoall.c file and pass one argument
// iv. Create echoall.c file which prints the arguments received from both child process and interpreter file.

// gedit inter.c
// gedit echoall.c
// pwd (run on new terminal of same folder)(copy path)
// gedit textinterpreter (paste path + /echoall)
// chmod 777 textinterpreter
// gcc -o inter inter.c
// gcc -o echoall echoall.c
// ./inter

///inter.c
#include <stdio.h>
#include <unistd.h>
int main() {
    pid_t pid = fork();

    if(pid == 0){
        execl("textinterpreter", "test", "myarg1", "myarg2", "myarg3", (char *)NULL);
        return 0;
    }
    else{
        wait(NULL);
    }
}

// echoall.c 
// #include<stdio.h>
// #include<stdlib.h>
// int main(int argc,char *argv[]){
//     int i;
//     for(i=0; i<argc; i++){
//         printf("argv[%d]= %s\n",i,argv[i]);
//     }
//     return 0;
// }


// textintepreter (command: pwd , use that path in this file)
// #! /home/cselab3/test/p3/echoall

