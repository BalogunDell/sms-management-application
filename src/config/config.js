require('dotenv').config();

module.exports = {
  development: {
    username: "postgres",
    password: process.env.PASSWORD,
    database: process.env.DEV_DATABASE_NAME,
    host: "127.0.0.1",
    dialect: "postgres"
  },
  test: {
    username: "postgres",
    password: process.env.PASSWORD,
    database: process.env.TEST_DATABASE_NAME,
    host: "127.0.0.1",
    dialect: "postgres"
  },
  production: {
    username: "root",
    password: null,
    database: "database_production",
    host: "127.0.0.1",
    dialect: "postgres"
  }
}
