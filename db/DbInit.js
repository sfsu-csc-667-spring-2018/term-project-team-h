const pgp = require('pg-promise')();

pgp.pg.defaults.ssl = false;

var cn = {
    host: 'localhost',
    port: 5432,
    database: 'postgres',
    // user: 'postgres',
    // password: 'postgres'
};

const db = pgp(cn);

db.query(pgp.QueryFile('../db/DbSchema.sql', {minify: true}))
    .then(response => {
        console.log("Database Connection Established.");
    })
    .catch(response => {
        console.log(response);
        console.log("There was an Error while connecting to DB! See the Error Below", response);
    });

module.exports = db;
