const db = require('./index');

const FIND_BY_ID = 'SELECT * FROM cards WHERE card_id = $1';
const FIND_BY_SUIT = 'SELECT * FROM cards WHERE card_suit = $1';
const FIND_BY_NUMBER = 'SELECT * FROM cards WHERE card_number = $1';
const GET_ALL_CARDS = 'SELECT * FROM cards';

const findbyid = (card_id) => {
	return db.one(FIND_BY_ID, card_id);
};

const findbysuit = (card_suit) => {
	return db.one(FIND_BY_SUIT, card_suit);
};

const findbynumber = (card_number) => {
	return db.one(FIND_BY_NUMBER, card_number);
};

const getallcards = () =>{
	return db.many(GET_ALL_CARDS);
};

module.exports = {
	findbyid,
	findbysuit,
	findbynumber,
	getallcards
};