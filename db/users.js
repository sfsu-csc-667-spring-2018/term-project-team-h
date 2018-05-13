const bcrypt = require('bcrypt');
const db = require('./index');

const CREATE_INSERT =
	'INSERT INTO users (user_name, user_email, user_password) VALUES (${name}, ${email}, ${password}) RETURNING user_id, user_name, user_email';

const create = (name, email, password) =>
	bcrypt.hash(password, 10).then(password =>
		db.one(CREATE_INSERT,
		 {name, email, password})
		);
const find = name =>
	db.one('SELECT * FROM users WHERE user_name=${name}', {name});

const serialize = (user, done) => {
	console.log('serialize', user);
	done(null, user.user_id);
};

const deserialize = (user_id, done) => {
	console.log('deserialize', user_id);
	db.one('SELECT * FROM users WHERE user_id=${user_id}',{user_id})
	.then(({user_id, user_name}) => done(null, {user_id, user_name}))
	.catch(error => done(error));
};

module.exports = {
	create,
	find,
	serialize,
	deserialize
};