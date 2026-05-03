import mysql from "mysql2/promise";

// Reuse a single pool across hot reloads in dev so we don't exhaust connections.
const globalForPool = globalThis;

const pool =
  globalForPool.__mysqlPool ||
  mysql.createPool({
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT || 3306),
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "codebooks",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    namedPlaceholders: true,
    charset: "utf8mb4",
  });

if (process.env.NODE_ENV !== "production") {
  globalForPool.__mysqlPool = pool;
}

export default pool;
