// pages/api/products.js
import mysql from 'mysql2/promise'; // Use the promise-based API for async/await

// Create a connection pool to efficiently manage database connections
const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export default async function handler(req, res) {
  if (req.method === 'GET') {
    let connection;
    try {
      connection = await pool.getConnection();

      // Construct a SQL query to fetch product data with related details
      // Adjust this query based on what product information you want to display
      const [rows] = await connection.execute(`
        SELECT
            P.product_id,
            P.product_name,
            P.price,
            P.stock,
            C.category_name,
            B.brand_name,
            G.gender_type,
            S.size_label,
            CO.color_name
        FROM
            Product P
        JOIN
            Category C ON P.category_id = C.category_id
        JOIN
            Brand B ON P.brand_id = B.brand_id
        JOIN
            Gender G ON P.gender_id = G.gender_id
        JOIN
            Size S ON P.size_id = S.size_id
        JOIN
            Color CO ON P.color_id = CO.color_id
        ORDER BY
            P.product_name ASC
      `);

      res.status(200).json(rows);
    } catch (error) {
      console.error('Database query failed:', error);
      res.status(500).json({ message: 'Failed to fetch products', error: error.message });
    } finally {
      if (connection) connection.release(); // Release the connection back to the pool
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
