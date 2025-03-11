#include <stdio.h>
#include <stdlib.h>

int main(int argc, char *argv[]) {
    if (argc != 4) {
        fprintf(stderr, "Usage: %s <operand1> <operator> <operand2>\n", argv[0]);
        return 1;
    }

    double operand1 = atof(argv[1]);
    double operand2 = atof(argv[3]);
    char operator = argv[2][0];  // Operator should be a single character

    double result;

    switch (operator) {
        case '+':
            result = operand1 + operand2;
            break;
        case '-':
            result = operand1 - operand2;
            break;
        case '*':
            result = operand1 * operand2;
            break;
        case '/':
            if (operand2 == 0) {
                fprintf(stderr, "Error: Division by zero!\n");
                return 1;
            }
            result = operand1 / operand2;
            break;
        default:
            fprintf(stderr, "Error: Unsupported operator '%c'. Supported operators are +, -, *, /\n", operator);
            return 1;
    }


    printf("Result: %.2f %c %.2f = %.2f\n", operand1, operator, operand2, result);
    
    return 0;
}