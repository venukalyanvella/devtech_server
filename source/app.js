'use strict';

// ********************* NPM Modules ***********************************
// required npm modules

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const https = require('https');
const mysql = require('mysql');
const { Model } = require('objection');
const serverConfig = require('./config/server-config.js');
const dbConfig = require('./config/db-config.js');
const Knexx = require('./config/knex.js');

Model.knex(Knexx.knex);


const app = express();


// ********************* Middlewares ***********************************
// required middlewares
app.use('/', express.static(path.join(__dirname, 'public')));
// app.use("/uploads", express.static(path.join('uploads')));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(async (request, response, next) => {
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE,PATCH, OPTIONS");
  response.setHeader("Access-Control-Allow-Headers", "Origin, Authorization, x-access-token, Content-Length, X-Requested-With, Content-Type, Accept");
  response.setHeader("Access-Control-Allow-Credentials", "true");
  next();
});

// Set 'views' directory for any views
// being rendered res.render()
app.set('views', 'views');





// ********************* Routes ***********************************
// checking database connection
app.get('/test_db_connection', dbConfig.checkDBConnection);

// required routes configuration
// app.use('/api', adminRoutes);

app.listen(serverConfig.server.port, () => {
    console.log(`Devtechtutorials server is listening on http://${serverConfig.server.host}:${serverConfig.server.port}`);
});

module.exports = app;


