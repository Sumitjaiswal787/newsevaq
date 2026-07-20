const { Client } = require('pg');
const client = new Client({ connectionString: 'postgresql://postgres:Sumit%40787870@127.0.0.1:5432/sevaq_db' });
client.connect().then(() => {
  return client.query('SELECT COUNT(*) FROM slot WHERE "isBooked" = false AND "startTime" > NOW()');
}).then(res => {
  console.log('Future unbooked slots:', res.rows[0].count);
  return client.query('SELECT "startTime" FROM slot WHERE "isBooked" = false AND "startTime" > NOW() ORDER BY "startTime" ASC LIMIT 15');
}).then(res => {
  console.log('Sample future unbooked slots:');
  res.rows.forEach(r => console.log(r.startTime));
  client.end();
}).catch(console.error);
