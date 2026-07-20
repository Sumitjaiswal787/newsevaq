const { Client } = require('pg');

async function checkOtp() {
  const client = new Client({
    connectionString: 'postgresql://postgres:Sumit%40787870@127.0.0.1:5432/sevaq_db'
  });
  
  await client.connect();
  const res = await client.query('SELECT id, otp, "isOtpVerified", status, type FROM booking ORDER BY "createdAt" DESC LIMIT 5');
  console.log(res.rows);
  await client.end();
}

checkOtp().catch(console.error);
