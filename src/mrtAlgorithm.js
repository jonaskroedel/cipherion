const crypto = require('crypto');

function modPow(base, exponent, modulus) {
    let result = 1n;
    base = base % modulus;
    while (exponent > 0n) {
        if (exponent % 2n === 1n) {
            result = (result * base) % modulus;
        }
        exponent = exponent >> 1n; // Divide by 2
        base = (base * base) % modulus;
    }
    return result;
}

function millerRabinTest(n, k = 5) {
    if (n === 2n || n === 3n) return true;5
    if (n % 2n === 0n || n < 2n) return false;

    let r = 0n;
    let d = n - 1n;
    while (d % 2n === 0n) {
        d /= 2n;
        r += 1n;
    }

    for (let i = 0; i < k; i++) {
        const a = BigInt(2) + BigInt(crypto.randomInt(2, 2**31 - 1));
        let x = modPow(a, d, n);

        if (x === 1n || x === n - 1n) continue;

        for (let j = 0n; j < r - 1n; j++) {
            x = modPow(x, 2n, n);
            if (x === n - 1n) continue;
        }

        return false;
    }

    return true;
}

function generateRandom2048BitNumber() {
    const buffer = crypto.randomBytes(256); // 2048 bits = 256 bytes
    buffer[0] |= 128; // Ensure the high bit is set for 2048 bits
    return BigInt('0x' + buffer.toString('hex'));
}

function findPrime() {
    let counter = 0;
    while (true) {
        const candidate = generateRandom2048BitNumber();
        counter++;
        process.stdout.write(`Checking number ${counter}\r`);
        if (millerRabinTest(candidate)) {
            console.log(`\nPrime found after checking ${counter} numbers: ${candidate}`);
            break;
        }
    }
}

findPrime();
