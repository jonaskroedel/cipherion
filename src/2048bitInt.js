const crypto = require('crypto');

function generateRandom2048BitNumber() {
    // 2048 bits = 256 bytes
    const buffer = crypto.randomBytes(256);
    // Ensure the number is in the 2^2047 to 2^2048-1 range by setting the highest bit to 1.
    buffer[0] |= 128; // Sets the most significant bit to 1
    return BigInt('0x' + buffer.toString('hex'));
}


console.log(generateRandom2048BitNumber());