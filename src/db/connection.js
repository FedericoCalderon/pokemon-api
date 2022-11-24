import mysql from 'mysql';
import { errorMessage } from '../utils/aux.methods.db.js';
import { config } from "dotenv";
config();

const pool = mysql.createPool({
  host: process.env.DB_PROD_HOST,
  user: process.env.DB_PROD_USERNAME,
  password: process.env.DB_PROD_PASSWORD,
  database: process.env.DB_PROD_NAME,
  ssl: { rejectUnauthorized: true }
})

export let query = function (sql, values) {
  // return a promise
  return new Promise((resolve, reject) => {
    pool.getConnection(function (err, connection) {
      if (err) {
        console.log('\n\n!!!!!!!!!!!conection fail!!!!!!!!!\n\n')
        reject(err)
      } else {
        console.log('\n\n!!!!!!!!!!!conection success!!!!!!!!!\n\n')
        connection.query(sql, values, (err, rows) => {

          if (err) {
            errorMessage(err.code, err.message, err.name);
            reject(err);
          } else {
            resolve(rows);
          };
          // end connection
          connection.release();
        });
      };
    });
  });
};
