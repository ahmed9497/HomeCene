// utils/helper.js

/**
 * Generates a strong password with a mix of letters, numbers, and special characters.
 * @param {number} length - The desired length of the generated password (default is 12).
 * @returns {string} - The generated strong password.
 */
export function generateStrongPassword(length = 12) {
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const digits = '0123456789';
    const specialChars = '!@#$%^&*()-_=+[]{}|;:,.<>?';
  
    const allCharacters = lowercase + uppercase + digits + specialChars;
  
    // Ensure the password contains at least one character from each category
    const password = [
      lowercase[Math.floor(Math.random() * lowercase.length)],
      uppercase[Math.floor(Math.random() * uppercase.length)],
      digits[Math.floor(Math.random() * digits.length)],
      specialChars[Math.floor(Math.random() * specialChars.length)],
    ];
  
    // Add random characters to meet the desired length
    for (let i = password.length; i < length; i++) {
      password.push(allCharacters[Math.floor(Math.random() * allCharacters.length)]);
    }
  
    // Shuffle the password to make it random
    return password.sort(() => Math.random() - 0.5).join('');
  }
  export  function sanitizeProduct(product:any) {
    return {
      ...product,
      createdAt: product.createdAt?.seconds
        ? new Date(product.createdAt.seconds * 1000).toISOString()
        : null,
      // _id: product._id?.toString?.() ?? product._id,
    };
  }