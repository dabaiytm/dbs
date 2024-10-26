import bcrypt from 'bcryptjs';

const username = 'wiily'; // Change this to your desired username
const password = '123'; // Change this to your desired password

const hashedPassword = bcrypt.hashSync(password, 8); // Hashing the password
console.log(`INSERT INTO User (Username, PasswordHash) VALUES ('${username}', '${hashedPassword}');`);
