// Write a C program to display the file content in reverse order using lseek system call.

// gcc -o exefile p11_reverse_file.c
// ./exefile input.txt output.txt

// or
// gcc p11_reverse_file.c
// ./a.out input.txt output.txt linux
// .\a.exe input.txt output.txt windows

#include <stdlib.h>   // For exit function
#include <fcntl.h>    // For file control options
#include <unistd.h>   // For system calls like open, read, write, lseek

int main(int argc, char *argv[]) {
    
    // Ensure correct number of arguments (program name, input file, output file)
    if (argc != 3)
        exit(-1);  // Exit if incorrect arguments are provided

    // Open source file in read-only mode
    int source = open(argv[1], O_RDONLY);
    
    // Open destination file in write mode, create if not exists, truncate if exists
    int dest = open(argv[2], O_WRONLY | O_CREAT | O_TRUNC, 0644);

    // Move file pointer to the end to determine file size
    int filesize = lseek(source, (off_t)0, SEEK_END);

    char buf;  // Buffer to hold one character at a time

    // Loop through the file in reverse order
    for (int i = filesize - 1; i >= 0; i--) {
        lseek(source, (off_t)i, SEEK_SET);  // Move pointer to position i
        read(source, &buf, 1);  // Read one byte
        write(dest, &buf, 1);   // Write byte to destination file
    }

    // Print "DONE" to standard output
    write(STDOUT_FILENO, "DONE\n", 5);

    // Close file descriptors
    close(source);
    close(dest);

    return 0;
}