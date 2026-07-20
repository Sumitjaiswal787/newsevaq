const { Client } = require('pg');
const client = new Client({ connectionString: 'postgresql://postgres:Sumit%40787870@127.0.0.1:5432/sevaq_db' });
client.connect().then(() => {
  client.query(`UPDATE booking SET status = 'confirmed', "isOtpVerified" = false, otp = '1234' WHERE id = '5fd2fec5-fb3b-4605-8a1f-e4aff50d4d45'`)
    .then(res => { console.log('Booking reset to confirmed'); client.end(); })
    .catch(err => { console.error(err); client.end(); });
});
