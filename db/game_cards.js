const db = require('./index');

const NEW_GAME_CARD = 'INSERT INTO game_cards(game_id, user_id, card_id) VALUES($1, $2, $3) RETURNING *';
const GET_GAME_CARD = 'SELECT card_id FROM game_cards WHERE game_id=$1 RETURNING *';
const GET_PLAYER_CARD = 'SELECT card_id FROM game_cards WHERE player_id=$1 RETURNING *';

const newgamecard = (gameid, userid, cardid) => {
	return db.one(NEW_GAME_CARD, [gameid, userid, cardid]);
}

const getgamecard = (gameid) => {
	return db.many(GET_GAME_CARD, gameid);
}

const getplayercard = (playerid) => {
	return db.many(GET_PLAYER_CARD, playerid);
}

module.exports = {
	newgamecard,
	getgamecard,
	getplayercard
}