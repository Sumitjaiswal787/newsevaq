const jwt = require('jsonwebtoken');
const http = require('http');

const token = jwt.sign({ sub: "635092a6-e1f1-4b6f-b727-261b2fc703c6", role: "WORKER" }, 'sevaq_super_secret_jwt_key_2024');

const options = {
  hostname: 'localhost',
  port: 3000,
  path: '/api/workers/me/bookings',
  method: 'GET',
  headers: {
    'Authorization': `Bearer ${token}`
  }
};

const req = http.request(options, res => {
  let data = '';
  res.on('data', chunk => { data += chunk; });
  res.on('end', () => {
    console.log('Status:', res.statusCode);
    const parsed = JSON.parse(data);
    if (parsed.length > 0) {
      console.log('First booking user:', JSON.stringify(parsed[0].user, null, 2));
      console.log('First booking service:', JSON.stringify(parsed[0].service, null, 2));
    } else {
      console.log('No bookings returned!');
      console.log(data);
    }
  });
});
req.on('error', console.error);
req.end();
