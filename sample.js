const encrypt = require('./script.js');
const payload = {
  userId: '1',
  name: 'Sriman',
  Phone:'xxxx'
};
const secret = 'secretkey';
const token = encrypt(payload, secret);
console.log('🔐 JWT Token:', token);