const mysql = require('mysql');
const bcrypt = require('bcrypt');
const moment = require('moment');
const serverConfig = require('./server-config.js');


const connection = mysql.createConnection({
  host: serverConfig.database.host,
  port: serverConfig.database.port,
  user: serverConfig.database.username,
  password: serverConfig.database.password,
  database: serverConfig.database.db,
  multipleStatements: true,
  charset: 'utf8'
});

//  Checking mysql database connection

const checkDBConnection = async (request, response, next) => {
  await connection.connect(function (err, data) {
      if (err) {
          const result = {
              data: err
          }
          if (result.data.errno === 'ECONNREFUSED') {
              console.log("Databse connection refused, check your database connection", err);
              return response.status(200).json({
                  success: false,
                  statusCode: 500,
                  message: 'Databse connection refused, check your database connection',
                  data: err
              });
          } else if (result.data.code === 'ER_ACCESS_DENIED_ERROR') {
              console.log("Database access denied for user, check your database credentials", err);
              return response.status(200).json({
                  success: false,
                  statusCode: 500,
                  message: 'Database access denied for user, check your database credentials',
                  data: err
              });
          }
      } else if (data) {
          console.log("Database connection established", data);
          return response.status(200).json({
              success: true,
              statusCode: 200,
              message: 'Database connection established',
              data: data
          });
      }else {
        console.log("Database Not exist", data);
          return response.status(200).json({
              success: true,
              statusCode: 200,
              message: 'Database Not exist',
              data: data
          });
      }
  });
}

module.exports = {
  connection,
  checkDBConnection
};
