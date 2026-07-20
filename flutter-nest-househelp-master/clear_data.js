const { DataSource } = require('typeorm');

async function clearData() {
  const { Client } = require('pg');
  const client = new Client({ connectionString: 'postgresql://postgres:Sumit%40787870@127.0.0.1:5432/sevaq_db' });
  
  try {
    await client.connect();
    console.log('Connected to DB');

    // Delete booking-related data
    await client.query('DELETE FROM payment');
    console.log('Deleted payments');

    await client.query('DELETE FROM service_requests');
    console.log('Deleted service_requests');

    await client.query('DELETE FROM booking');
    console.log('Deleted bookings');

    // Delete leave data
    await client.query('DELETE FROM worker_leaves');
    console.log('Deleted worker_leaves');

    // Update slots to unbooked
    await client.query('UPDATE slot SET "isBooked" = false');
    console.log('Reset slots isBooked to false');

    console.log('Successfully cleared all booking and leave data.');
  } catch (err) {
    console.error('Error clearing data:', err);
  } finally {
    await client.end();
  }
}

clearData();
