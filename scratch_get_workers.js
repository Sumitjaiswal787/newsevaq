const { Client } = require('pg');
const client = new Client({ connectionString: 'postgresql://postgres:Sumit%40787870@127.0.0.1:5432/sevaq_db' });

async function checkWorkers() {
    await client.connect();
    const res = await client.query('SELECT * FROM "user" WHERE role = \'worker\'');
    console.log(JSON.stringify(res.rows, null, 2));
    await client.end();
}
checkWorkers().catch(console.error);
