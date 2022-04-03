const url = require('url')
const { Pool } = require("pg");
const { query } = require('express');
const { Router } = require("express");


//conexión a base de datos PostgreSQL.

const config = {
    user: "postgres",
    host: "localhost",
    password: "0718",
    database: "yolidesing",
    port: 5432,
    max: 20,
    idleTimeoutMillis: 5000,
    connectionTimeoutMillis: 2000,
};

const pool = new Pool(config);

