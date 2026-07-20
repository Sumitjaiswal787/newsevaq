const { Client } = require('pg');

async function clearSubscriptions() {
  const client = new Client({ connectionString: 'postgresql://postgres:Sumit%40787870@127.0.0.1:5432/sevaq_db' });
  
  try {
    await client.connect();
    console.log('Connected to DB');

    await client.query('DELETE FROM subscriptions');
    console.log('Deleted subscriptions');

  } catch (err) {
    console.error('Error clearing data:', err);
  } finally {
    await client.end();
  }
}

clearSubscriptions();
