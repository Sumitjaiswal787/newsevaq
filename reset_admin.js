const { Client } = require('pg');
const bcrypt = require('bcrypt');

async function run() {
  // Use connection string from .env file
  const client = new Client({
    connectionString: "postgresql://postgres:Sumit%40787870@127.0.0.1:5432/sevaq_db"
  });

  try {
    await client.connect();
    console.log("Connected to PostgreSQL successfully.");

    // Generate hashed password for 'Admin@123'
    const hashedPassword = await bcrypt.hash('Admin@123', 10);

    // Check if user already exists
    const res = await client.query('SELECT id FROM "user" WHERE email = $1', ['admin@sevaq.com']);
    
    if (res.rows.length > 0) {
      // Update existing admin
      await client.query(
        'UPDATE "user" SET password = $1, role = $2 WHERE email = $3',
        [hashedPassword, 'admin', 'admin@sevaq.com']
      );
      console.log("✅ Admin account password updated successfully to 'Admin@123'!");
    } else {
      // Insert new admin
      const publicId = 'a32906b3-e028-4034-9271-e943202c6130'; // Unique public UUID
      await client.query(
        'INSERT INTO "user" ("publicId", "firstName", "lastName", "email", "password", "phone", "role") VALUES ($1, $2, $3, $4, $5, $6, $7)',
        [publicId, 'Admin', 'User', 'admin@sevaq.com', hashedPassword, '+919876543210', 'admin']
      );
      console.log("✅ Default admin account created successfully!");
    }
  } catch (err) {
    console.error("❌ Error executing query:", err);
  } finally {
    await client.end();
  }
}

run();
