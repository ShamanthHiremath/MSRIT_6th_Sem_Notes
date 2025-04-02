function validateCreditCard(cardNumber) {
    // Remove dashes from the card number
    let cleanedNumber = cardNumber.replace(/-/g, '');
    
    // Check if the card number is exactly 16 digits
    if (!/^\d{16}$/.test(cleanedNumber)) {
        return { valid: false, number: cardNumber, error: 'wrong_length_or_invalid_characters' };
    }
    
    // Convert to an array of digits
    let digits = cleanedNumber.split('').map(Number);
    
    // Check if all digits are numbers and there are at least two different digits
    let uniqueDigits = new Set(digits);
    if (uniqueDigits.size < 2) {
        return { valid: false, number: cardNumber, error: 'only_one_unique_digit' };
    }
    
    // Check if the last digit is even
    if (digits[15] % 2 !== 0) {
        return { valid: false, number: cardNumber, error: 'last_digit_not_even' };
    }
    
    // Check if the sum of all digits is greater than 16
    let sum = digits.reduce((acc, digit) => acc + digit, 0);
    if (sum <= 16) {
        return { valid: false, number: cardNumber, error: 'sum_less_than_16' };
    }
    
    // If all conditions are met, return valid
    return { valid: true, number: cardNumber };
}

// Test cases
console.log(validateCreditCard("9999-9999-8888-0000")); // Valid
console.log(validateCreditCard("6666-6666-6666-1666")); // Valid
console.log(validateCreditCard("a923-3211-9c01-1112")); // Invalid characters
console.log(validateCreditCard("4444-4444-4444-4444")); // Only one unique digit
console.log(validateCreditCard("1111-1111-1111-1110")); // Sum less than 16
console.log(validateCreditCard("6666-6666-6666-6661")); // Last digit not even
