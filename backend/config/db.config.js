

module.exports = {
  HOST: process.env.DB_HOST,
  USER: process.env.SQL_USER,
  PASSWORD: process.env.SQL_PASSWORD,
  DB: process.env.SQL_DATABASE_NAME,
  dialect: process.env.DB_DIALECT,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};