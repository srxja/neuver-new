// pages/api/products.js
import mysql from 'mysql2/promise';

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

      // Extract all filter parameters from request query
      const { search, gender, color, size, minPrice, maxPrice } = req.query;

      let query = `
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
      `;
      const queryParams = [];
      const conditions = [];

      // Add conditions based on provided filters
      if (search) {
        conditions.push(`P.product_name LIKE ?`);
        queryParams.push(`%${search}%`);
      }
      if (gender) {
        conditions.push(`G.gender_type = ?`);
        queryParams.push(gender);
      }
      if (color) {
        conditions.push(`CO.color_name = ?`);
        queryParams.push(color);
      }
      if (size) {
        conditions.push(`S.size_label = ?`);
        queryParams.push(size);
      }
      if (minPrice) {
        conditions.push(`P.price >= ?`);
        queryParams.push(parseFloat(minPrice));
      }
      if (maxPrice) {
        conditions.push(`P.price <= ?`);
        queryParams.push(parseFloat(maxPrice));
      }

      // Combine all conditions with AND
      if (conditions.length > 0) {
        query += ` WHERE ` + conditions.join(` AND `);
      }

      query += ` ORDER BY P.product_name ASC`;

      const [rows] = await connection.execute(query, queryParams);

      res.status(200).json(rows);
    } catch (error) {
      console.error('Database query failed:', error);
      res.status(500).json({ message: 'Failed to fetch products', error: error.message });
    } finally {
      if (connection) connection.release();
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
