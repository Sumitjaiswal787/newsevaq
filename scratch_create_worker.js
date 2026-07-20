const http = require('http');

const postData = JSON.stringify({
  phone: '8888777766',
  email: 'new_worker@househelp.com',
  password: 'worker123',
  firstName: 'New',
  lastName: 'Worker'
});

const options = {
  hostname: 'localhost',
  port: 3000,
  path: '/api/auth/workers/register',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(postData)
  }
};

const req = http.request(options, (res) => {
  let data = '';
  
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    console.log(`Status: ${res.statusCode}`);
    console.log('Response:', data);
  });
});

req.on('error', (error) => {
  console.error('Error:', error.message);
});

req.write(postData);
req.end();
