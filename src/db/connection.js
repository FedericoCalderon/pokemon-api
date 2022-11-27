import mysql from 'mysql';
import { errorMessage } from '../utils/aux.methods.db.js';
import { config } from "dotenv";
config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: { rejectUnauthorized: process.env.NODE_ENV == 'production' }
})

export let query = function (sql, values) {
  // return a promise
  return new Promise((resolve, reject) => {
    pool.getConnection(function (err, connection) {
      if (err) {
        console.log("ENTRA A ERR")
        reject(err)
      } else {
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
