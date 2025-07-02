// Consider the last 100 bytes as a region. Write a C program to check whether the region is locked or not. If the region is locked, print pid of the process which has locked. If the region is not locked, lock the region with an exclusive lock, read the last 50 bytes and unlock the region.

// gcc p6b_region_lock.c -
// ./a.out <filename>

#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <fcntl.h>

int main(int argc, char *argv[]) {

    if (argc != 2)
        return 1;


    int fd = open(argv[1], O_RDONLY);
    int filesize = lseek(fd, 0, SEEK_END);

    struct flock fl;

    // type = F_WRLCK , whence = SEEK_END, start= -100, len=100, pid = 0
    fl.l_type = F_WRLCK;
    fl.l_whence = SEEK_END;
    fl.l_start = -100;
    fl.l_len = 100;
    fl.l_pid = 0;

    if (fcntl(fd, F_GETLK, &fl) == -1)
        return 1;

    if (fl.l_type != F_UNLCK) {
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

    close(fd);
    return 0;
}