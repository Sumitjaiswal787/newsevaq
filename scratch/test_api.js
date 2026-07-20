const http = require('http');

const options = {
  hostname: 'localhost',
  port: 3000,
  path: '/bookings',
  method: 'GET',
  headers: {
    // We need a valid token to fetch bookings
    // But I can just check the raw DB via another script that actually works.
  }
};
