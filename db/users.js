const bcrypt = require('bcrypt');
const db = require('./index');

const CREATE_INSERT =
    'INSERT INTO users (user_name, user_email, user_password, user_money) VALUES ($1, $2, $3, $4) RETURNING user_id, user_name, user_email, user_money';

const create = (name, email, password, money) => {


    console.log('inside create');

    return new Promise(function (resolve, reject) {
        bcrypt.hash(password, 10).then(hash => {
            const tmpArr = [name, email, hash, money]
            db.one(CREATE_INSERT,
                tmpArr).then(function (resp) {
                resolve(resp);
            }).catch(function (err) {
                reject(err);
            })
        });
    })


}

const find = name =>
    db.one('SELECT * FROM users WHERE user_name=${name}', {name});

const serialize = (user, done) => {
    console.log('serialize', user);
    done(null, user.user_id);
};

const deserialize = (user_id, done) => {
    console.log('deserialize', user_id);
    db.one('SELECT * FROM users WHERE user_id=${user_id}', {user_id})
        .then(({user_id, user_name}) => done(null, {user_id, user_name}))
        .catch(error => done(error));
};

module.exports = {
    create,
    find,
    serialize,
    deserialize
};