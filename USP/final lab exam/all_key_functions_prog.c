// 1.  a) Write a C program to display the file content in reverse order using lseek 
// system call. 

int src = open(argv[1], O_RDONLY);
int dest = open(argv[2], O_WRONLY | O_CREAT | O_TRUNC, 0644);

n = lseek(src, 0, SEEK_END); 

// loop with i
lseek(src, (off_t) i, SEEK_SET);
read(src, ch, 1);
write(dest, ch, 1);

// #########################################################################################################################


// b) Write a C program to create a child process and show how parent 
// and child processes will share the text file and justify that both 
// parent and child share the same file offset.
char buff[10];
int fd = open("test.txt", O_RDWR);
if(fork()==0){
    read(fd, buff, 5);
    buff[5] = '\0';
    printf("%s", buff);
}
else{
    wait(NULL);
    read(fd, buff, 5);
    buff[5] = '\0';
    printf("%s", buff);
}

// #########################################################################################################################

// 2.  a) Write a C program to display various details of a file using stat 
// structure (At least 5 fields). 

struct stat fstat;
stat(argv[1], &fstat);

argv[1], fstat.st_mode, st_size, st_ino, st_nlink, ctime(&st_atime), ctime(&st_mtime)
%s,         %o,          %ld,      %lu,     %lu ,         %s,                %s

// #########################################################################################################################


// b) Write a C program to simulate system function.
void custom_sys(char* command){
execl("/bin/sh", "sh", "-c", command, (char *)NULL);
}

custom_sys("ls -li");

// #########################################################################################################################


// 3.  a) Write a C program to remove empty files from the given directory. 
struct dirent *dir;
DIR* dp = opendir(".");

while((dir = readdir(dp)) != NULL){
    int fd = open(dir, O_RDWR, 0777);
    n = lseek(fd, 0, SEEK_END);
    if(n == 0){
        unlink(dir->d_name);
    }
}

// #########################################################################################################################


// b) Write a C program to implement ls  –li command which lists the 
// files in a specified directory. Your program should Print 5 attributes 
// of files.
struct dirent *dir;
DIR* dp = opendir(".");

struct stat mystat;
while((dir = readdir(dp)) != NULL){
    if(stat(dir->d_name, &mystat) == 0){
        printf("%ld %o %d %d %s %s\n", 
               mystat.st_ino,     // Inode number
               mystat.st_mode,    // File mode (permissions)
               mystat.st_uid,     // User ID of owner
               mystat.st_gid,     // Group ID of owner
               ctime(&mystat.st_atime), // Last access time
               dir->d_name        // Filename
        );
    }
}

// #########################################################################################################################


// 4.  a) Write a C program to demonstrate the creation of soft links and  
// hard links. 

if(argv[1][0] == '-' && argv[1][1] ='h'){
    if(link(argv[2], argv[3]) == 0)
        printf("Hard link created successfully.\n");
}
else if(argv[1][0] == '-' && argv[1][1] == 's'){
    if(symlink(argv[2], argv[3]) == 0)
        printf("Soft link created successfully.\n");
} 


// #########################################################################################################################


// b) Write a C program to 
// i. To create a child process. 
// ii. The child should execute an interpreter file by passing a few 
// arguments  
// iii. Create an interpreter file that has the path of echoall.c file and 
// pass one argument 
// iv. Create echoall.c file which prints the arguments received from 
// both child process and interpreter file.

// first run pwd in workdir
// place that in in interpreter.sh

chmod +x interpreter.sh

interpreter.sh
#!/bin/bash
exec "/workspaces/MSRIT_6th_Sem_Notes/USP/final lab exam/echoall" "$@"


// main.c
if(fork() == 0){
    execl("textinterpreter", "test", "myarg1", "myarg2", "myarg3", (char *)NULL);
}
else{
    wait(NULL);
}

// echoall.c 
for(int i=0; i<argc; i++){
    printf("%s", argv[i]);
}

// #########################################################################################################################

// 5.  a) Write a program to copy access and modification time of a file to 
// another file using utime function. 

struct stat fstat1, fstat2;

fstat1(argv[1], &fstat1); 
fstat2(argv[2], &fstat2);

// ***
struct utimbuf tt;
tt.modtime = fstat2.st_mtime; 
tt.actime = fstat2.st_atime;
utime(argv[1], &tt);

stat(argv[1], &fstat1);
ctime(&fstat1.st_atime);
ctime(&fstat1.st_atime);

// #########################################################################################################################

// b) Write a C program using sigaction system call which calls a signal 
// handler on SIGINT signal and then reset the default action of the 
// SIGINT signal.

void handler(int signum){
    printf("%d", signum);
    struct sigaction sa={0};
    sa.sa_handler = SIG_DFL;
    sigaction(SIG_INT, &sa, NULL);
}


// main
struct sigaction sa = {0};
sa.sa_handler = handler;

sigaction(SIG_INT, &sa, NULL);

while(1){
    printf("Running... Press Ctrl+C\n");
    sleep(1);
}


// #########################################################################################################################

// 6.  a) Write a program to read n characters from a file and append them 
// back to the same file using dup2 function. 

int fd = open(argv[1], O_RDWR | O_APPEND);
char buf[10];
read(fd, buf, 5);  		
buf[5] = '\0'; 

lseek(fd, 0, SEEK_END); 
dup2(fd, STDOUT_FILENO);
printf("%s", buf);


// #########################################################################################################################


// b) Consider the last 100 bytes as a region. Write a C program to check 
// whether the region is locked or not. If the region is locked, print pid 
// of the process which has locked. If the region is not locked, lock 
// the region with an exclusive lock, read the last 50 bytes and unlock 
// the region. 

// flock fl; fl.l_ type, whence, start, len, pid  fcntl(fd, F_SETLK, &fl)

int fd = open(argv[1], O_RDONLY);
int filesize = lseek(fd, 0, SEEK_END);

struct flock fl;

fl.l_type = F_WRLCK;
fl.l_whence = SEEK_END;
fl.l_start = -100;
fl.l_len = 100;
fl.l_pid = 0;

// try getting lock
if(fcntl(fd, F_GETLK, &fl) == -1)
    return 1;

if(fl.l_type != F_UNLCK){
    printf("Region is locked by process with PID: %d\n", fl.l_pid);
}
else {
    // set wrl lock
    fl.l_type = F_WRLCK;
    fcntl(fd, F_SETLK, &fl);

    char buffer[51];

    lseek(fd, -50, SEEK_END);
    read(fd, buffer, 50);
    buffer[50] = '\0';
    printf("Last 50 bytes: %s\n", buffer);

    // set unlock the lock
    fl.l_type = F_UNLCK;
    fcntl(fd, F_SETLK, &fl);
}


// #########################################################################################################################

// 7.  a) Write a C program to illustrate the effect of setjmp and longjmp 
// functions on register and volatile variables. 

// jmp_buf jmpbuffer;

// if(setjmp(jmpbuffer)){
//     // print vals
//     exit(0);
// }

// longjmp(jmpbuffer, 1);
// exit(0);

int globval = 10;

jmp_buf jmpbuffer;

int main(){
    register int regval = 0;
    volatile int volval = 1;
    static int statval = 2;

    printf("Before setjmp:\n");
    printf("globval = %d, statval = %d, regval = %d, volval = %d\n", globval, statval, regval, volval);

    if(setjmp(jmpbuffer)){
        printf("After longjmp:\n");
        printf("globval = %d, statval = %d, regval = %d, volval = %d\n", globval, statval, regval, volval);
    
        exit(0);
    }
    globval = 20; regval = 10; volval = 20; statval = 20;

    longjmp(jmpbuffer, 1);

    exit(0);
}

// #########################################################################################################################


// b) C program to simulate copy command by accepting the filenames 
// from the command line. Report all errors. 

int src = open(argv[1], O_RDONLY);
int dest = open(argv[2], O_WRONLY | O_CREAT | O_TRUNC, 0644);

int size = lseek(src, 0, SEEK_END);
char* buf[size+1];
lseek(src, 0, SEEK_SET); 
read(src, buf, size);
buf[size+1] = '\0'
write(dest, buf, size);

// #########################################################################################################################
// a) Write a C program that takes the file name as an argument and prints the type of the given file. 

struct stat fstat;
lstat(argv[i], &fstat);
if(S_ISREG(fstat.st_mode) ptr = "reg")
S_ISDIR  ptr = "dir"
S_ISCHR  ptr = "chr spl"
S_ISBLK  ptr = "block spl"
S_ISFIFO  ptr = "fifo"
S_ISLNK  ptr = "sym link"
S_ISSOCK  ptr = "socket"
else ptr = "** unknown mode **"


// #########################################################################################################################

// b) Write a C program to perform the following operations 
// i. To create a child process 
// ii. The child process should execute a program (using exec( )) to 
// show the use of the access function 
// iii. The parent process should wait for the child process to exit 
// iv. Also print the necessary process IDs

// main.c

if(fork() == 0){
    execl("./p1", "p1", "example.txt", (char *)NULL);
    getpid();
    getppid();
}
else{
    wait(NULL);
}

// p1.c
if(access(argv[1], F_OK) == 0){
    printf("File %s exists.\n", argv[1]);
} else {
    printf("File does not exist.\n");
}

// #########################################################################################################################
// 9.  a) Write a C program to demonstrate the usage of umask and chmod functions. 
#define RWRWRW (S_IWUSR | S_IRUSR | S_IWGRP | S_IRGRP | S_IWOTH | S_IROTH)

umask(0);
creat("new_file.txt", 0644);
umask(RWRWRW)
chmod("new_file.txt", 0755);


// #########################################################################################################################


// b) Write a C program 
// i. To read the first 20 characters from a file 
// ii. seek to 10th byte from the beginning and display 20 characters 
// from there 
// iii. seek 10 bytes ahead from the current file offset and display 20 
// characters 
// iv. Display the file size


int fd = open(argv[1], O_RDONLY);
char buf[21];
// first 20
read(fd, buf, 20);
// 10 - 20
lseek(fd, 10, SEEK_SET);
read(fd, buf, 20);
// next 20 from current
lseek(fd, 10, SEEK_CUR);
// filesize
n = lseek(fd, 0, SEEK_END);



// #########################################################################################################################

// 10.  a) Write a C program such that it initializes itself as a Daemon Process. 

ps aux | grep daemon 

void cr_daemon(){
    if(fork() > 0){
        exit(0);
    }
    else{
        sleep(30);
        setsid();
        umask(0);
        chdir("/");
    }
}

int main(){
    cr_daemon();
    openlog("daemon_ex", LOG_PID, LOG_DAEMON);
    syslog(LOG_NOTICE, "daemon running...");
    closelog();
}

// #########################################################################################################################

// b)  Demonstrate the working of wait and waitpid system calls with a program

int st;
pid_t pid1 = fork();
pid_t pid2 = fork();

if (pid1 == 0){
    printf("first pid:%d\n", getpid());
    sleep(2);
    exit(0);
}
if (pid2 == 0){
    printf("second pid:%d\n", getpid());
    sleep(2);
    exit(0);
}

wait(NULL);
printf("first wait done\n");
sleep(2);
waitpid(pid2, &st, 0);
printf("second wait done");

// #########################################################################################################################
// 11.  a) Write a program to differentiate between dup and dup2 functions

int fd1 = open(argv[1], O_RDWR);
int fd2 = dup(fd1);
int fd3 = dup2(fd1, 10);

write(fd1, "Writing via fd1 \n", 16);
write(fd2, "Writing via fd2 \n", 16);
write(fd3, "Writing via fd3 (dup2)\n", 50);

// #########################################################################################################################

 
// b) Write a program to perform the following operations 
// i)  To create a child process 
// ii) The child process should execute a separate program (using exec 
// function) that calculates the addition of two numbers by passing two 
// integer values. 
// iii) The parent process should wait for a child to complete 

if(fork() == 0){
    execl("./summ", "summ", argv[1], argv[2], (char *)NULL);
    exit(0);
}
else{
    exit(0);
}

// summ.c
int n1 = atoi(argv[1]);
int n2 = atoi(argv[2]);
printf("sum: %d", n1+n2);


// #########################################################################################################################

// 12.  a) Write a program to demonstrate the zombie state of a process and 
// provide the solution for the same.   

// ps aux | grep zombie_demo

if(fork() == 0){
    printf("child exiting...");
}
else{
    print("check zombies using ps aux | grep filename");
    sleep(30);
    wait(NULL);
    print("no zombie");
}

// #########################################################################################################################

// b) Write a C program to perform the following operations 
// i) To create a child and parent process with the use of an echoall 
// file. 
// ii) The Child should execute a process that prints the user defined 
// values of environment variables 
// iii) The Parent should execute a process that prints default values 
// for the environment variables. 

//child
// execle("./echoall", "echoall", "myarg1", "MY ARG2", NULL, env);

// parent
// execlp("./echoall", "echoall", "only 1 arg", NULL);

if(fork() == 0){
    char* envp = {"USER=unknown", "PATH=/tmp", NULL};
    excele("./echoall", "echoall", "myarg1", "MY ARG2", NULL, envp);
}
else{
    execlp("./echoall", "echoall", "only 1 arg", NULL);
}

// echoall.c

for (int i = 0; i < argc; i++)
    printf("argv[%d]: %s\n", i, argv[i]);
for (int i = 0; envp[i]; i++)
    printf("%s\n", envp[i]);
return 0;

// #########################################################################################################################


