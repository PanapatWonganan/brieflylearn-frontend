import mysql from 'mysql2/promise'

interface DbConfig {
  host: string
  port: number
  user: string
  password: string
  database: string
}

const dbConfig: DbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3306'),
  user: process.env.DB_USER || 'fitness_user',
  password: process.env.DB_PASSWORD || 'fitness_pass_2024',
  database: process.env.DB_NAME || 'fitness_lms',
}

let connection: mysql.Connection | null = null

export async function getDbConnection(): Promise<mysql.Connection> {
  if (!connection) {
    try {
      connection = await mysql.createConnection({
        ...dbConfig,
        timezone: '+07:00', // Bangkok timezone
        dateStrings: true,
      })
      console.log('✅ Connected to MySQL database')
    } catch (error) {
      console.error('❌ Failed to connect to database:', error)
      throw error
    }
  }
  return connection
}

export async function closeDbConnection(): Promise<void> {
  if (connection) {
    await connection.end()
    connection = null
    console.log('🔌 Database connection closed')
  }
}

export async function executeQuery<T = any>(
  query: string,
  params: any[] = []
): Promise<T[]> {
  const db = await getDbConnection()
  try {
    const [rows] = await db.execute(query, params)
    return rows as T[]
  } catch (error) {
    console.error('❌ Query execution failed:', error)
    console.error('Query:', query)
    console.error('Params:', params)
    throw error
  }
}

export async function executeQuerySingle<T = any>(
  query: string,
  params: any[] = []
): Promise<T | null> {
  const results = await executeQuery<T>(query, params)
  return results.length > 0 ? results[0] : null
}

export default {
  getConnection: getDbConnection,
  close: closeDbConnection,
  query: executeQuery,
  querySingle: executeQuerySingle,
}