const db = require('./index');

const NEW_PLAYER = 'INSERT INTO game_users(game_id, user_id) VALUES ($1, $2) RETURNING *';
const REMOVE_PLAYER = 'DELETE FROM game_users WHERE user_id=$1';
const SET_SEAT_NUMBER = 'UPDATE game_users SET seat_number=$1 WHERE user_id=$2 RETURNING *';
const GET_SEAT_NUMBER = 'SELECT seat_number FROM game_users WHERE user_id=$1 RETURNING *';
const UPDATE_USER_BET = 'UPDATE game_users SET user_bet=$1 WHERE user_id=$2 RETURNING *';
const GET_USER_BET = 'SELECT user_bet FROM game_users WHERE user_id=$1 RETURNING *';


const newplayer = (gameid, userid) => {
	return db.one(NEW_PLAYER, [gameid, userid]);
}

const removeplayer = (userid) => {
	return db.one(REMOVE_PLAYER, userid);
}

const setseatnumber = (userid) => {
	return db.one(SET_SEAT_NUMBER, userid);
}

const getseatnumber = (userid) => {
	return db.one(GET_SEAT_NUMBER, userid);
}

const updatebet = (userid) => {
	return db.one(UPDATE_USER_BET, userid);
}

const getuserbet = (userid) => {
	return db.one(GET_USER_BET, userid);
}

module.exports = {
	newplayer,
	removeplayer,
	setseatnumber,
	getseatnumber,
	updatebet,
	getuserbet
}