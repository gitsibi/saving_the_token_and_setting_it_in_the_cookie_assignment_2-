// const jwt = require('jsonwebtoken');

// const encrypt = (payload, secret) => {
//   try {
//     const token = jwt.sign(payload, secret, { expiresIn: '1h' });
//     console.log('JWT Token Created Successfully');
//     return token;
//   } catch (error) {
//     console.error('Error in generating token:', error.message);
//     return null;
//   }
// };

// module.exports = encrypt;

const jwt = require('jsonwebtoken');
require('dotenv').config();

const SECRET_KEY = process.env.JWT_SECRET;

const generateToken = (payload) => {
  try {
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '60s' });
    return token;
  } catch (error) {
    console.error('Error generating token:', error);
    throw error;
  }
};

const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    return decoded;
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      console.log('❌ Token has expired');
    } else {
      console.log('❌ Invalid token');
    }
    throw error;
  }
};

const testPayload = { userId: 101, role: 'user' };
const token = generateToken(testPayload);
console.log('\n✅ JWT Token with expiry:\n', token);

setTimeout(() => {
  try {
    const result = verifyToken(token);
    console.log('\n✅ Token is valid. Payload:', result);
  } catch (err) {
    // Handled inside verifyToken
  }
}, 5000); // Change to 70000 (70s) to test token expiry

module.exports = {
  generateToken,
  verifyToken
};
