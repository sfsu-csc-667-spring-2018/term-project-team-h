require('dotenv').config();
const pgp = require('pg-promise')();

const connection = pgp(process.env.DATABASE_URL);
pgp.pg.defaults.ssl = false;


// var cn = {
// host: 'localhost',
// port: 5432,
// database: 'postgres',
// // // //     // user: 'postgres',
// // password: 'postgres'
// };

// console.log(connection);
// const db = pgp(connection);
//
// db.query(pgp.QueryFile('../db/DbSchema.sql', {minify: true}))
//     .then(response => {
//         console.log("Database Connection Established.");
//   })
//     .catch(response => {
//         console.log(response);
// console.log("There was an Error while connecting to DB! See the Error Below", response);
// });

 // module.exports = db;
//console.log("DATABASE_URL", DATABASE_URL);
module.exports = connection;