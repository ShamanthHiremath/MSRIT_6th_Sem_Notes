// Write a C program such that it initializes itself as a Daemon Process.

// gcc p10_1_daemon_process.c -o daemon
// ./daemon


// # View system logs
// sudo tail -f /var/log/syslog


// ps aux | grep daemon (find id of ./a.out  with tty as "?") 
// sudo kill <PID> {use "ps aux" command and get pid of "./a.out" whose tty is "?"}

#include <stdio.h>
#include <stdlib.h>
#include <sys/stat.h>
#include <sys/types.h>
#include <syslog.h>
#include <unistd.h>
#include <fcntl.h>

void create_daemon() {
    if (fork() > 0) {
        exit(0); 
    }
    setsid();
    umask(0);
    chdir("/");
}

int main() {
    create_daemon();

    openlog("daemon_ex", LOG_PID, LOG_DAEMON);

    syslog(LOG_NOTICE, "Daemon is running...\n");

    closelog();

    return EXIT_SUCCESS;
}